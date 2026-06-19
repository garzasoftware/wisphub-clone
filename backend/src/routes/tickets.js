const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

const ESTADOS = ['abierto', 'en_progreso', 'resuelto', 'cerrado'];
const PRIORIDADES = ['baja', 'media', 'alta', 'urgente'];

// In-memory tickets store (reemplazar con DB en prod)
let tickets = [];
let nextId = 1;

const generarTickets = () => {
    const temas = ['Sin internet', 'Lentitud', 'Router caido', 'Facturacion', 'Solicitud instalacion'];
    for (let i = 1; i <= 25; i++) {
          tickets.push({
                  id: nextId++,
                  numero_ticket: `TKT-${String(i).padStart(4,'0')}`,
                  cliente: `Cliente ${i}`,
                  usuario: `user${i}`,
                  asunto: temas[i % 5],
                  descripcion: `Descripcion del ticket ${i}`,
                  estado: ESTADOS[i % 4],
                  prioridad: PRIORIDADES[i % 4],
                  tecnico_asignado: i % 3 === 0 ? 'Tecnico 1' : i % 3 === 1 ? 'Tecnico 2' : null,
                  abierto: new Date(Date.now() - i * 3600000).toISOString(),
                  cerrado: ESTADOS[i % 4] === 'cerrado' ? new Date().toISOString() : null,
                  comentarios: []
          });
    }
};
generarTickets();

// GET /tickets
router.get('/', authMiddleware, (req, res) => {
    const { estado, fecha_inicio, fecha_fin, limit = 20, offset = 0 } = req.query;
    let result = [...tickets];
    if (estado) result = result.filter(t => t.estado === estado);
    res.json({ count: result.length, rows: result.slice(+offset, +offset + +limit) });
});

// GET /tickets/estadisticas
router.get('/estadisticas', authMiddleware, (req, res) => {
    const stats = ESTADOS.reduce((acc, e) => {
          acc[e] = tickets.filter(t => t.estado === e).length;
          return acc;
    }, {});
    const porPrioridad = PRIORIDADES.reduce((acc, p) => {
          acc[p] = tickets.filter(t => t.prioridad === p).length;
          return acc;
    }, {});
    res.json({ totales: stats, por_prioridad: porPrioridad, total: tickets.length });
});

// GET /tickets/:id
router.get('/:id', authMiddleware, (req, res) => {
    const ticket = tickets.find(t => t.id === +req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket no encontrado' });
    res.json(ticket);
});

// POST /tickets
router.post('/', authMiddleware, (req, res) => {
    const { cliente, usuario, asunto, descripcion, prioridad = 'media' } = req.body;
    if (!asunto) return res.status(400).json({ error: 'Asunto requerido' });
    const ticket = {
          id: nextId++,
          numero_ticket: `TKT-${String(nextId).padStart(4,'0')}`,
          cliente, usuario, asunto, descripcion,
          estado: 'abierto',
          prioridad,
          tecnico_asignado: null,
          abierto: new Date().toISOString(),
          cerrado: null,
          comentarios: []
    };
    tickets.unshift(ticket);
    res.status(201).json(ticket);
});

// PUT /tickets/:id
router.put('/:id', authMiddleware, (req, res) => {
    const idx = tickets.findIndex(t => t.id === +req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Ticket no encontrado' });
    tickets[idx] = { ...tickets[idx], ...req.body, id: tickets[idx].id };
    if (req.body.estado === 'cerrado' || req.body.estado === 'resuelto') {
          tickets[idx].cerrado = new Date().toISOString();
    }
    res.json(tickets[idx]);
});

// POST /tickets/:id/comentarios
router.post('/:id/comentarios', authMiddleware, (req, res) => {
    const ticket = tickets.find(t => t.id === +req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket no encontrado' });
    const comentario = {
          id: Date.now(),
          texto: req.body.texto,
          autor: req.user.username,
          fecha: new Date().toISOString()
    };
    ticket.comentarios.push(comentario);
    res.status(201).json(comentario);
});

module.exports = router;
