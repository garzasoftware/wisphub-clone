const jwt = require('jsonwebtoken');
const { Staff } = require('../models');
const logger = require('../utils/logger');

/**
 * Middleware de autenticacion JWT y API Key
 */
const authenticate = async (req, res, next) => {
    try {
          let token = null;

      // Soporte para JWT (sesion web)
      const authHeader = req.headers.authorization;
          if (authHeader && authHeader.startsWith('Bearer ')) {
                  token = authHeader.substring(7);
          }

      // Soporte para API Key (integracion con routers/sistemas externos)
      if (authHeader && authHeader.startsWith('Api-Key ')) {
              const apiKey = authHeader.substring(8);
              const staff = await Staff.findOne({ where: { apiKey } });
              if (!staff) {
                        return res.status(401).json({ error: 'API Key invalida' });
              }
              req.user = staff;
              return next();
      }

      if (!token) {
              return res.status(401).json({ error: 'Token de autenticacion requerido' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const staff = await Staff.findByPk(decoded.id);

      if (!staff) {
              return res.status(401).json({ error: 'Usuario no encontrado' });
      }

      // Actualizar ultimo acceso
      await staff.update({ ultimoAcceso: new Date() });

      req.user = staff;
          next();
    } catch (error) {
          if (error.name === 'JsonWebTokenError') {
                  return res.status(401).json({ error: 'Token invalido' });
          }
          if (error.name === 'TokenExpiredError') {
                  return res.status(401).json({ error: 'Token expirado' });
          }
          logger.error('Error en autenticacion:', error);
          res.status(500).json({ error: 'Error de autenticacion' });
    }
};

/**
 * Middleware de autorizacion por roles
 */
const authorize = (roles = []) => {
    return (req, res, next) => {
          if (!req.user) {
                  return res.status(401).json({ error: 'No autenticado' });
          }

          if (roles.length && !roles.includes(req.user.nivel.toLowerCase())) {
                  return res.status(403).json({
                            error: 'No tiene permisos para realizar esta accion',
                            requiredRoles: roles,
                            userRole: req.user.nivel
                  });
          }

          next();
    };
};

module.exports = { authenticate, authorize };
