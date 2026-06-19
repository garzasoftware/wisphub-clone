const express = require('express');
const bcrypt = require('bcryptjs');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

let staff = [
  { id:1, nombre:'GySIS Telecom', email:'admin@gysistelecom.com', rol:'admin', activo:true, telefono:'555-0001', zona:null, password: bcrypt.hashSync('admin123',10) },
  { id:2, nombre:'Uriel Benitez', email:'uriel@gysistelecom.com', rol:'tecnico', activo:true, telefono:'555-0002', zona:'Zona Norte', password: bcrypt.hashSync('tecnico123',10) },
  { id:3, nombre:'Gisela Huerta', email:'gisela@gysistelecom.com', rol:'admin', activo:true, telefono:'555-0003', zona:null, password: bcrypt.hashSync('admin123',10) },
  { id:4, nombre:'Jesus Alamilla', email:'jesus@gysistelecom.com', rol:'admin', activo:true, telefono:'555-0004', zona:null, password: bcrypt.hashSync('admin123',10) },
  { id:5, nombre:'Yanet Torres', email:'yanet@gysistelecom.com', rol:'admin', activo:true, telefono:'555-0005', zona:null, password: bcrypt.hashSync('admin123',10) },
  { id:6, nombre:'Raul Gomez', email:'raul@gysistelecom.com', rol:'tecnico', activo:true, telefono:'555-0006', zona:'Zona Sur', password: bcrypt.hashSync('tecnico123',10) },
  { id:7, nombre:'Soporte GySIS', email:'soporte@gysistelecom.com', rol:'soporte', activo:true, telefono:'555-0007', zona:null, password: bcrypt.hashSync('soporte123',10) },
  { id:8, nombre:'Lizeth Rodriguez', email:'lizeth@gysistelecom.com', rol:'admin', activo:true, telefono:'555-0008', zona:null, password: bcrypt.hashSync('admin123',10) },
  { id:9, nombre:'JOSE ZAMORA', email:'jose@gysistelecom.com', rol:'tecnico', activo:true, telefono:'555-0009', zona:'Zona Este', password: bcrypt.hashSync('tecnico123',10) },
];
let nextId = 10;

const sanitize = (s) => ({ id: s.id, nombre: s.nombre, email: s.email, rol: s.rol, activo: s.activo, telefono: s.telefono, zona: s.zona });

router.get('/', authMiddleware, (req, res) => {
  const { rol, activo } = req.query;
  let result = staff.map(sanitize);
  if (rol) result = result.filter(s => s.rol === rol);
  if (activo !== undefined) result = result.filter(s => s.activo === (activo === 'true'));
  res.json({ count: result.length, rows: result });
});

router.get('/:id', authMiddleware, (req, res) => {
  const s = staff.find(s => s.id === +req.params.id);
  if (!s) return res.status(404).json({ error: 'Staff no encontrado' });
  res.json(sanitize(s));
});

router.post('/', authMiddleware, (req, res) => {
  const { password, ...rest } = req.body;
  const s = { id: nextId++, ...rest, activo: true, password: password ? bcrypt.hashSync(password, 10) : '' };
  staff.push(s);
  res.status(201).json(sanitize(s));
});

router.put('/:id', authMiddleware, (req, res) => {
  const idx = staff.findIndex(s => s.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Staff no encontrado' });
  const { password, ...rest } = req.body;
  staff[idx] = { ...staff[idx], ...rest, id: staff[idx].id };
  if (password) staff[idx].password = bcrypt.hashSync(password, 10);
  res.json(sanitize(staff[idx]));
});

module.exports = router;
