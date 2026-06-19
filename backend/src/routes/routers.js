const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

let routers = [
    { id: 1, nombre: 'SECTOR 8', ip: '192.168.8.1', usuario: 'admin', api: true, marca: 'MikroTik', modelo: 'RB951G', zona: 'Zona Norte', activo: true },
    { id: 2, nombre: 'Cero lena', ip: '192.168.2.1', usuario: 'admin', api: true, marca: 'MikroTik', modelo: 'hAP ac2', zona: 'Zona Sur', activo: true },
    { id: 3, nombre: 'SECTOR CENTRO', ip: '192.168.3.1', usuario: 'admin', api: true, marca: 'MikroTik', modelo: 'RB1100AHx4', zona: 'Zona Centro', activo: true },
    { id: 4, nombre: 'NODO ESTE', ip: '192.168.4.1', usuario: 'admin', api: false, marca: 'Ubiquiti', modelo: 'EdgeRouter X', zona: 'Zona Este', activo: true },
    { id: 5, nombre: 'NODO OESTE', ip: '192.168.5.1', usuario: 'admin', api: true, marca: 'MikroTik', modelo: 'RB750Gr3', zona: 'Zona Oeste', activo: false }
  ];
let nextId = 6;

// GET /routers
router.get('/', authMiddleware, (req, res) => {
    const { zona, activo } = req.query;
    let result = [...routers];
    if (zona) result = result.filter(r => r.zona === zona);
    if (activo !== undefined) result = result.filter(r => r.activo === (activo === 'true'));
    res.json({ count: result.length, rows: result });
  });

// GET /routers/:id
router.get('/:id', authMiddleware, (req, res) => {
    const r = routers.find(r => r.id === +req.params.id);
    if (!r) return res.status(404).json({ error: 'Router no encontrado' });
    res.json(r);
  });

// POST /routers
router.post('/', authMiddleware, (req, res) => {
    const { nombre, ip, usuario, api = false, marca, modelo, zona } = req.body;
    if (!nombre || !ip) return res.status(400).json({ error: 'Nombre e IP requeridos' });
    const r = { id: nextId++, nombre, ip, usuario, api, marca, modelo, zona, activo: true };
    routers.push(r);
    res.status(201).json(r);
  });

// PUT /routers/:id
router.put('/:id', authMiddleware, (req, res) => {
    const idx = routers.findIndex(r => r.id === +req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Router no encontrado' });
    routers[idx] = { ...routers[idx], ...req.body, id: routers[idx].id };
    res.json(routers[idx]);
  });

// DELETE /routers/:id
router.delete('/:id', authMiddleware, (req, res) => {
    const idx = routers.findIndex(r => r.id === +req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Router no encontrado' });
    routers.splice(idx, 1);
    res.json({ message: 'Router eliminado' });
  });

// POST /routers/:id/test-conexion
router.post('/:id/test-conexion', authMiddleware, (req, res) => {
    const r = routers.find(r => r.id === +req.params.id);
    if (!r) return res.status(404).json({ error: 'Router no encontrado' });
    // Simular prueba de conexion
    const exitoso = Math.random() > 0.2;
    res.json({ router_id: r.id, nombre: r.nombre, ip: r.ip, conectado: exitoso, latencia_ms: exitoso ? Math.floor(Math.random() * 20 + 1) : null });
  });

module.exports = router;
