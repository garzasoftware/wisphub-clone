const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

let zonas = [
  { id:1, nombre:'Zona Norte', descripcion:'Sector norte', activo:true, clientes:45, routers:2 },
  { id:2, nombre:'Zona Sur', descripcion:'Sector sur', activo:true, clientes:38, routers:1 },
  { id:3, nombre:'Zona Centro', descripcion:'Centro', activo:true, clientes:67, routers:3 },
  { id:4, nombre:'Zona Este', descripcion:'Sector este', activo:true, clientes:29, routers:1 },
  { id:5, nombre:'Zona Oeste', descripcion:'Sector oeste', activo:false, clientes:12, routers:1 },
];
let nextId = 6;

router.get('/', authMiddleware, (req, res) => {
  const { activo } = req.query;
  let result = [...zonas];
  if (activo !== undefined) result = result.filter(z => z.activo === (activo === 'true'));
  res.json({ count: result.length, rows: result });
});

router.get('/:id', authMiddleware, (req, res) => {
  const z = zonas.find(z => z.id === +req.params.id);
  if (!z) return res.status(404).json({ error: 'Zona no encontrada' });
  res.json(z);
});

router.post('/', authMiddleware, (req, res) => {
  const z = { id: nextId++, ...req.body, activo: true, clientes: 0, routers: 0 };
  zonas.push(z);
  res.status(201).json(z);
});

router.put('/:id', authMiddleware, (req, res) => {
  const idx = zonas.findIndex(z => z.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Zona no encontrada' });
  zonas[idx] = { ...zonas[idx], ...req.body, id: zonas[idx].id };
  res.json(zonas[idx]);
});

module.exports = router;
