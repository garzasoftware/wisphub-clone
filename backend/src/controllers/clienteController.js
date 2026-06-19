const { Cliente, Servicio, PlanInternet, Router, Zona, Staff, Factura, Ticket } = require('../models');
const { Op } = require('sequelize');
const multer = require('multer');
const path = require('path');
const logger = require('../utils/logger');

// Configuracion de multer para subida de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
          cb(null, 'uploads/clientes/');
    },
    filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
          const allowedTypes = /jpeg|jpg|png|pdf/;
          const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
          const mimetype = allowedTypes.test(file.mimetype);
          if (extname && mimetype) {
                  cb(null, true);
          } else {
                  cb(new Error('Solo se permiten archivos jpg, png y pdf'));
          }
    }
}).fields([
  { name: 'front_dni_proof', maxCount: 1 },
  { name: 'back_dni_proof', maxCount: 1 },
  { name: 'proof_of_address', maxCount: 1 },
  { name: 'discount_coupon', maxCount: 1 }
  ]);

/**
 * GET /api/clientes
 * Listado de clientes con paginacion y filtros
 */
const getClientes = async (req, res) => {
    try {
          const {
                  page = 1,
                  limit = 10,
                  search,
                  estado,
                  zonaId,
                  routerId,
                  planId,
                  staffId,
                  fechaInicio,
                  fechaFin
          } = req.query;

      const offset = (page - 1) * limit;
          const where = {};

      // Filtros
      if (search) {
              where[Op.or] = [
                { nombre: { [Op.iLike]: `%${search}%` } },
                { apellido: { [Op.iLike]: `%${search}%` } },
                { email: { [Op.iLike]: `%${search}%` } },
                { telefono: { [Op.iLike]: `%${search}%` } },
                { direccion: { [Op.iLike]: `%${search}%` } },
                      ];
      }

      if (estado) {
              where.estado = estado;
      }

      if (fechaInicio && fechaFin) {
              where.fechaContratacion = {
                        [Op.between]: [fechaInicio, fechaFin]
              };
      }

      const { count, rows } = await Cliente.findAndCountAll({
              where,
              include: [
                {
                            model: Servicio,
                            as: 'servicios',
                            where: zonaId ? { zonaId } : {},
                            required: zonaId ? true : false,
                            include: [
                              { model: PlanInternet, as: 'plan', attributes: ['id', 'nombre', 'precio', 'descarga', 'subida'] },
                              { model: Router, as: 'router', attributes: ['id', 'nombre', 'ip'] },
                              { model: Zona, as: 'zona', attributes: ['id', 'nombre'] },
                                        ]
                }
                      ],
              limit: parseInt(limit),
              offset: parseInt(offset),
              order: [['createdAt', 'DESC']]
      });

      res.json({
              count,
              next: count > offset + parseInt(limit) ? `?page=${parseInt(page) + 1}&limit=${limit}` : null,
              previous: page > 1 ? `?page=${parseInt(page) - 1}&limit=${limit}` : null,
              results: rows
      });
    } catch (error) {
          logger.error('Error al obtener clientes:', error);
          res.status(500).json({ error: 'Error al obtener clientes', details: error.message });
    }
};

/**
 * GET /api/clientes/:id
 * Obtener informacion detallada de un cliente
 */
const getCliente = async (req, res) => {
    try {
          const { id } = req.params;

      const cliente = await Cliente.findByPk(id, {
              include: [
                {
                            model: Servicio,
                            as: 'servicios',
                            include: [
                              { model: PlanInternet, as: 'plan' },
                              { model: Router, as: 'router' },
                              { model: Zona, as: 'zona' },
                                        ]
                },
                { model: Factura, as: 'facturas', limit: 10, order: [['createdAt', 'DESC']] },
                { model: Ticket, as: 'tickets', limit: 5, order: [['createdAt', 'DESC']] },
                      ]
      });

      if (!cliente) {
              return res.status(404).json({ error: 'Cliente no encontrado' });
      }

      res.json(cliente);
    } catch (error) {
          logger.error('Error al obtener cliente:', error);
          res.status(500).json({ error: 'Error al obtener cliente', details: error.message });
    }
};

/**
 * POST /api/clientes
 * Crear nuevo cliente (pre-instalacion)
 */
const createCliente = async (req, res) => {
    upload(req, res, async (err) => {
          if (err) {
                  return res.status(400).json({ error: err.message });
          }

               try {
                       const {
                                 firstname,
                                 lastname,
                                 address,
                                 phone_number,
                                 email,
                                 location,
                                 city,
                                 postal_code,
                                 aditional_phone_number,
                                 commentaries,
                                 coordenadas,
                                 // Datos del servicio
                                 plan,
                                 router,
                                 ip,
                                 fecha_inicio,
                                 precio
                       } = req.body;

            // Archivos subidos
            const archivos = {
                      fotoDNIFrente: req.files?.front_dni_proof?.[0]?.filename,
                      fotoDNIDorso: req.files?.back_dni_proof?.[0]?.filename,
                      comprobanteDomicilio: req.files?.proof_of_address?.[0]?.filename,
                      cuponeDescuento: req.files?.discount_coupon?.[0]?.filename,
            };

            const cliente = await Cliente.create({
                      nombre: firstname,
                      apellido: lastname,
                      direccion: address,
                      telefono: phone_number,
                      email,
                      colonia: location,
                      ciudad: city,
                      codigoPostal: postal_code,
                      telefonoAdicional: aditional_phone_number,
                      comentarios: commentaries,
                      coordenadas,
                      estado: 'pre-instalacion',
                      fechaContratacion: new Date(),
                      ...archivos
            });

            // Si se proporciona plan, crear servicio
            if (plan && router) {
                      await Servicio.create({
                                  clienteId: cliente.id,
                                  planId: plan,
                                  routerId: router,
                                  ip,
                                  precio: precio || 0,
                                  fechaInicio: fecha_inicio || new Date(),
                                  estado: 'pre-instalacion'
                      });
            }

            logger.info(`Cliente creado: ${cliente.id} - ${cliente.nombre} ${cliente.apellido}`);

            res.status(201).json({
                      Mensaje: 'Pre-instalacion registrada exitosamente',
                      username: `${cliente.nombre}${cliente.apellido}`.toLowerCase().replace(/\s/g, ''),
                      id_servicio: cliente.id
            });
               } catch (error) {
                       logger.error('Error al crear cliente:', error);
                       res.status(500).json({ error: 'Error al crear cliente', details: error.message });
               }
    });
};

/**
 * PUT /api/clientes/:id/servicio
 * Editar servicio del cliente
 */
const updateServicioCliente = async (req, res) => {
    try {
          const { id } = req.params;
          const {
                  plan,
                  router,
                  ip,
                  precio,
                  estado,
                  fechaInicio,
                  fechaFin,
                  zonaId,
                  velocidadDescarga,
                  velocidadSubida
          } = req.body;

      const servicio = await Servicio.findOne({ where: { clienteId: id } });

      if (!servicio) {
              return res.status(404).json({ error: 'Servicio no encontrado' });
      }

      await servicio.update({
              planId: plan || servicio.planId,
              routerId: router || servicio.routerId,
              ip: ip || servicio.ip,
              precio: precio || servicio.precio,
              estado: estado || servicio.estado,
              fechaInicio: fechaInicio || servicio.fechaInicio,
              fechaFin: fechaFin || servicio.fechaFin,
              zonaId: zonaId || servicio.zonaId,
      });

      logger.info(`Servicio actualizado para cliente: ${id}`);

      res.json({
              message: 'Servicio actualizado exitosamente',
              servicio
      });
    } catch (error) {
          logger.error('Error al actualizar servicio:', error);
          res.status(500).json({ error: 'Error al actualizar servicio', details: error.message });
    }
};

/**
 * DELETE /api/clientes/:id/servicio
 * Eliminar servicio del cliente
 */
const deleteServicioCliente = async (req, res) => {
    try {
          const { id } = req.params;

      const servicio = await Servicio.findOne({ where: { clienteId: id } });

      if (!servicio) {
              return res.status(404).json({ error: 'Servicio no encontrado' });
      }

      await servicio.update({ estado: 'cancelado', fechaFin: new Date() });

      logger.info(`Servicio cancelado para cliente: ${id}`);

      res.json({ message: 'Servicio cancelado exitosamente' });
    } catch (error) {
          logger.error('Error al eliminar servicio:', error);
          res.status(500).json({ error: 'Error al eliminar servicio', details: error.message });
    }
};

/**
 * GET /api/clientes/estadisticas
 * Estadisticas de clientes por mes
 */
const getEstadisticas = async (req, res) => {
    try {
          const { year = new Date().getFullYear(), zona } = req.query;

      const estadisticas = await Servicio.findAll({
              where: {
                        ...(zona ? { zonaId: zona } : {}),
              },
              include: [{ model: Cliente, as: 'cliente' }],
              group: ['estado', 'mes'],
      });

      res.json(estadisticas);
    } catch (error) {
          logger.error('Error al obtener estadisticas:', error);
          res.status(500).json({ error: 'Error al obtener estadisticas' });
    }
};

/**
 * GET /api/clientes/buscar
 * Busqueda avanzada de clientes
 */
const buscarClientes = async (req, res) => {
    try {
          const {
                  tipo = 'contiene',
                  texto,
                  columnas,
                  estado,
                  routerId,
                  planId,
                  zonaId,
                  staffId,
                  asesorId,
                  formaPago,
                  servicioAdicional,
                  fechaContratacion,
                  page = 1,
                  limit = 10
          } = req.query;

      const offset = (page - 1) * limit;
          const where = {};
          const servicioWhere = {};

      if (texto) {
              const searchOp = tipo === 'contiene' ? Op.iLike : Op.eq;
              const searchValue = tipo === 'contiene' ? `%${texto}%` : texto;

            where[Op.or] = [
              { nombre: { [searchOp]: searchValue } },
              { apellido: { [searchOp]: searchValue } },
              { email: { [searchOp]: searchValue } },
              { telefono: { [searchOp]: searchValue } },
              { direccion: { [searchOp]: searchValue } },
                    ];
      }

      if (estado) where.estado = estado;
          if (routerId) servicioWhere.routerId = routerId;
          if (planId) servicioWhere.planId = planId;
          if (zonaId) servicioWhere.zonaId = zonaId;

      const { count, rows } = await Cliente.findAndCountAll({
              where,
              include: [
                {
                            model: Servicio,
                            as: 'servicios',
                            where: Object.keys(servicioWhere).length > 0 ? servicioWhere : {},
                            required: Object.keys(servicioWhere).length > 0,
                            include: [
                              { model: PlanInternet, as: 'plan', attributes: ['nombre', 'precio'] },
                              { model: Router, as: 'router', attributes: ['nombre', 'ip'] },
                              { model: Zona, as: 'zona', attributes: ['nombre'] },
                                        ]
                }
                      ],
              limit: parseInt(limit),
              offset: parseInt(offset),
              order: [['nombre', 'ASC']]
      });

      res.json({
              count,
              results: rows,
              page: parseInt(page),
              totalPages: Math.ceil(count / limit)
      });
    } catch (error) {
          logger.error('Error en busqueda de clientes:', error);
          res.status(500).json({ error: 'Error en busqueda', details: error.message });
    }
};

module.exports = {
    getClientes,
    getCliente,
    createCliente,
    updateServicioCliente,
    deleteServicioCliente,
    getEstadisticas,
    buscarClientes
};
