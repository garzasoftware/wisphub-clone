const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');
const { validateRequest } = require('../middleware/validateRequest');
const { authenticate, authorize } = require('../middleware/auth');
const {
    getClientes,
    getCliente,
    createCliente,
    updateServicioCliente,
    deleteServicioCliente,
    getEstadisticas,
    buscarClientes
} = require('../controllers/clienteController');

/**
 * @swagger
 * /api/clientes/:
 *   get:
 *     summary: Listado de clientes
 *     tags: [Clientes]
 *     security:
 *       - ApiKey: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: estado
 *         schema: { type: string, enum: [activo, suspendido, cancelado] }
 *     responses:
 *       200:
 *         description: Lista de clientes
 */
router.get('/',
             authenticate,
             [
                   query('page').optional().isInt({ min: 1 }),
                   query('limit').optional().isInt({ min: 1, max: 100 }),
                 ],
             validateRequest,
             getClientes
           );

/**
 * @swagger
 * /api/clientes/buscar:
 *   get:
 *     summary: Busqueda avanzada de clientes
 *     tags: [Clientes]
 */
router.get('/buscar',
             authenticate,
             buscarClientes
           );

/**
 * @swagger
 * /api/clientes/estadisticas:
 *   get:
 *     summary: Estadisticas de clientes
 *     tags: [Clientes]
 */
router.get('/estadisticas',
             authenticate,
             getEstadisticas
           );

/**
 * @swagger
 * /api/clientes/{id}:
 *   get:
 *     summary: Consultar informacion del cliente
 *     tags: [Clientes]
 */
router.get('/:id',
             authenticate,
             [param('id').isInt()],
             validateRequest,
             getCliente
           );

/**
 * @swagger
 * /api/solicitar-instalacion/:
 *   post:
 *     summary: Solicitar Preinstalacion
 *     tags: [Clientes]
 */
router.post('/',
              authenticate,
              [
                    body('firstname').notEmpty().withMessage('Nombre es requerido'),
                    body('lastname').notEmpty().withMessage('Apellido es requerido'),
                    body('address').notEmpty().withMessage('Direccion es requerida'),
                    body('phone_number').notEmpty().withMessage('Telefono es requerido'),
                  ],
              validateRequest,
              createCliente
            );

/**
 * @swagger
 * /api/clientes/{id}/servicio:
 *   put:
 *     summary: Editar servicio del cliente
 *     tags: [Clientes]
 */
router.put('/:id/servicio',
             authenticate,
             authorize(['admin', 'supervisor']),
             [param('id').isInt()],
             validateRequest,
             updateServicioCliente
           );

/**
 * @swagger
 * /api/clientes/{id}/servicio:
 *   delete:
 *     summary: Eliminar servicio del cliente
 *     tags: [Clientes]
 */
router.delete('/:id/servicio',
                authenticate,
                authorize(['admin']),
                [param('id').isInt()],
                validateRequest,
                deleteServicioCliente
              );

module.exports = router;
