const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { authMiddleware } = require('../middleware/auth');
const logger = require('../utils/logger');

const router = express.Router();

// Mock users - en produccion usar base de datos
const users = [
  { id: 1, username: 'admin', passwordHash: bcrypt.hashSync('admin123', 10), role: 'admin', nombre: 'Administrador', email: 'admin@wisphub.com' },
  { id: 2, username: 'tecnico', passwordHash: bcrypt.hashSync('tecnico123', 10), role: 'tecnico', nombre: 'Tecnico', email: 'tecnico@wisphub.com' }
  ];

// POST /auth/login
router.post('/login', [
    body('username').notEmpty().withMessage('Usuario requerido'),
    body('password').notEmpty().withMessage('Contrasena requerida')
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

              const { username, password } = req.body;
    const user = users.find(u => u.username === username);

              if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
                    return res.status(401).json({ error: 'Credenciales invalidas' });
              }

              const token = jwt.sign(
                { id: user.id, username: user.username, role: user.role },
                    process.env.JWT_SECRET || 'secret',
                { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
                  );

              logger.info(`Login exitoso: ${username}`);
    res.json({
          token,
          user: { id: user.id, username: user.username, role: user.role, nombre: user.nombre, email: user.email }
    });
});

// GET /auth/me
router.get('/me', authMiddleware, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ id: user.id, username: user.username, role: user.role, nombre: user.nombre, email: user.email });
});

// POST /auth/logout
router.post('/logout', authMiddleware, (req, res) => {
    logger.info(`Logout: ${req.user.username}`);
    res.json({ message: 'Sesion cerrada exitosamente' });
});

// POST /auth/refresh
router.post('/refresh', authMiddleware, (req, res) => {
    const token = jwt.sign(
      { id: req.user.id, username: req.user.username, role: req.user.role },
          process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
        );
    res.json({ token });
});

module.exports = router;
