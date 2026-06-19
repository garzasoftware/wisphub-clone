const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

// Datos de ejemplo - Stock dispositivos de red (WiFi)
let dispositivos = [];
const marcas = ['Ubiquiti', 'MikroTik', 'TP-Link', 'Cambium', 'Mimosa'];
const modelos = ['AirMax AC', 'RB951G', 'CPE710', 'ePMP 1000', 'B5-Lite'];
const estados_disp = ['disponible', 'ocupado', 'asignado', 'reparacion', 'dado_de_baja'];
let nextDispId = 1;

for (let i = 1; i <= 20; i++) {
    dispositivos.push({
          id: nextDispId++,
          nombre: `${marcas[i%5]} ${modelos[i%5]}`,
          marca: marcas[i%5],
          modelo: modelos[i%5],
          serie: `SN${String(i).padStart(8,'0')}`,
          mac: `00:1A:2B:${String(i).padStart(2,'0')}:CC:DD`,
          estado: estados_disp[i%5],
          ip_asignada: estados_disp[i%5] === 'ocupado' ? `192.168.${i}.1` : null,
          cliente_asignado: estados_disp[i%5] === 'asignado' ? `Cliente ${i}` : null,
          sucursal: 'Principal',
          ubicacion: `Bodega ${i % 3 + 1}`,
          precio_compra: (Math.random() * 500 + 50).toFixed(2),
          fecha_compra: new Date(Date.now() - i * 30 * 86400000).toISOString().split('T')[0],
          proveedor: `Proveedor ${i % 3 + 1}`,
          garantia_meses: 12,
          notas: ''
    });
}

let otrosArticulos = [
  { id: 1, nombre: 'Cable UTP Cat6', cantidad: 500, unidad: 'metros', precio: 0.5, proveedor: 'Proveedor 1' }
  ];

// GET /almacen/dashboard
router.get('/dashboard', authMiddleware, (req, res) => {
    const stats = estados_disp.reduce((acc, e) => {
          acc[e] = dispositivos.filter(d => d.estado === e).length;
          return acc;
    }, {});
    res.json({
          stocks: 2,
          total_dispositivos_wifi: dispositivos.length,
          otros_articulos: otrosArticulos.length,
          otros_servicios: 0,
          por_estado: stats
    });
});

// GET /almacen/dispositivos
router.get('/dispositivos', authMiddleware, (req, res) => {
    const { estado, marca, limit = 20, offset = 0 } = req.query;
    let result = [...dispositivos];
    if (estado) result = result.filter(d => d.estado === estado);
    if (marca) result = result.filter(d => d.marca.toLowerCase().includes(marca.toLowerCase()));
    res.json({ count: result.length, rows: result.slice(+offset, +offset + +limit) });
});

// GET /almacen/dispositivos/:id
router.get('/dispositivos/:id', authMiddleware, (req, res) => {
    const d = dispositivos.find(d => d.id === +req.params.id);
    if (!d) return res.status(404).json({ error: 'Dispositivo no encontrado' });
    res.json(d);
});

// POST /almacen/dispositivos
router.post('/dispositivos', authMiddleware, (req, res) => {
    const d = { id: nextDispId++, ...req.body, estado: req.body.estado || 'disponible' };
    dispositivos.push(d);
    res.status(201).json(d);
});

// PUT /almacen/dispositivos/:id
router.put('/dispositivos/:id', authMiddleware, (req, res) => {
    const idx = dispositivos.findIndex(d => d.id === +req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Dispositivo no encontrado' });
    dispositivos[idx] = { ...dispositivos[idx], ...req.body, id: dispositivos[idx].id };
    res.json(dispositivos[idx]);
});

// GET /almacen/otros-articulos
router.get('/otros-articulos', authMiddleware, (req, res) => {
    res.json({ count: otrosArticulos.length, rows: otrosArticulos });
});

// GET /almacen/proveedores
router.get('/proveedores', authMiddleware, (req, res) => {
    const proveedores = [
      { id: 1, nombre: 'Proveedor 1', contacto: 'Juan Perez', telefono: '555-0001', email: 'proveedor1@example.com', activo: true },
      { id: 2, nombre: 'Proveedor 2', contacto: 'Maria Lopez', telefono: '555-0002', email: 'proveedor2@example.com', activo: true },
      { id: 3, nombre: 'Proveedor 3', contacto: 'Carlos Ruiz', telefono: '555-0003', email: 'proveedor3@example.com', activo: false }
        ];
    res.json({ count: proveedores.length, rows: proveedores });
});

module.exports = router;
