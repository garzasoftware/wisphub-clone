const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

let gastos = [];
let nextId = 1;

const categorias = ['Nomina', 'Equipos', 'Internet Troncal', 'Mantenimiento', 'Oficina', 'Publicidad', 'Transporte', 'Otros'];

for (let i = 1; i <= 15; i++) {
  gastos.push({
    id: nextId++,
    folio: 'GAS-' + String(i).padStart(5, '0'),
    fecha: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
    descripcion: categorias[i % categorias.length] + ' - Mes ' + i,
    categoria: categorias[i % categorias.length],
    retencion: i % 3 === 0 ? (Math.random() * 500).toFixed(2) : '0.00',
    total_retencion: i % 3 === 0 ? (Math.random() * 500).toFixed(2) : '0.00',
    total: (Math.random() * 5000 + 500).toFixed(2),
    forma_pago: i % 2 === 0 ? 'Transferencia' : 'Efectivo',
    zona: 'Zona ' + (i % 5 + 1),
    creado_por: 'Admin',
    comprobante: null
  });
}

router.get('/', authMiddleware, (req, res) => {
  const { fecha_inicio, fecha_fin, categoria, zona, limit = 20, offset = 0 } = req.query;
  let result = [...gastos];
  if (fecha_inicio) result = result.filter(g => g.fecha >= fecha_inicio);
  if (fecha_fin) result = result.filter(g => g.fecha <= fecha_fin);
  if (categoria) result = result.filter(g => g.categoria === categoria);
  if (zona) result = result.filter(g => g.zona === zona);
  res.json({ count: result.length, rows: result.slice(+offset, +offset + +limit), categorias });
});

router.get('/:id', authMiddleware, (req, res) => {
  const g = gastos.find(g => g.id === +req.params.id);
  if (!g) return res.status(404).json({ error: 'Gasto no encontrado' });
  res.json(g);
});

router.post('/', authMiddleware, (req, res) => {
  const gasto = {
    id: nextId++,
    folio: 'GAS-' + String(nextId).padStart(5, '0'),
    ...req.body,
    creado_por: req.user.username,
    comprobante: null
  };
  gastos.unshift(gasto);
  res.status(201).json(gasto);
});

router.put('/:id', authMiddleware, (req, res) => {
  const idx = gastos.findIndex(g => g.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Gasto no encontrado' });
  gastos[idx] = { ...gastos[idx], ...req.body, id: gastos[idx].id };
  res.json(gastos[idx]);
});

module.exports = router;
