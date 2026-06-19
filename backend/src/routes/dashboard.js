const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { Factura, Pago, Gasto, Cliente, Servicio, Zona } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

router.get('/finanzas', authenticate, async (req, res) => {
    try {
          const hoy = moment().startOf('day').toDate();
          const inicioMes = moment().startOf('month').toDate();
          const finMes = moment().endOf('month').toDate();
          const sumar = (items) => items.reduce((s, i) => s + parseFloat(i.total || 0), 0);

      const [pagosHoy, pagosPend, pagosMes, gastosHoy, gastosMes] = await Promise.all([
              Pago.findAll({ where: { createdAt: { [Op.gte]: hoy } } }),
              Factura.findAll({ where: { estado: 'pendiente' } }),
              Pago.findAll({ where: { createdAt: { [Op.between]: [inicioMes, finMes] } } }),
              Gasto.findAll({ where: { createdAt: { [Op.gte]: hoy } } }),
              Gasto.findAll({ where: { createdAt: { [Op.between]: [inicioMes, finMes] } } }),
            ]);

      const mes = sumar(pagosMes);
          const gastTot = sumar(gastosMes);

      res.json({
              pagosInternet: { hoy: sumar(pagosHoy), pagosHoy: pagosHoy.length, pendiente: sumar(pagosPend), pagosPendientes: pagosPend.length, mes, pagosMes: pagosMes.length },
              otrosIngresos: { hoy: 0, pendiente: 0, mes: 0 },
              gastos: { hoy: sumar(gastosHoy), mes: gastTot },
              saldoFinal: mes - gastTot,
              pagosPorForma: [],
              ingresosZonas: []
      });
    } catch (error) {
          res.status(500).json({ error: error.message });
    }
});

router.get('/', authenticate, async (req, res) => {
    try {
          const [total, suspendidos, cancelados] = await Promise.all([
                  Cliente.count({ where: { estado: 'activo' } }),
                  Cliente.count({ where: { estado: 'suspendido' } }),
                  Cliente.count({ where: { estado: 'cancelado' } }),
                ]);
          res.json({ clientes: { total, suspendidos, cancelados } });
    } catch (error) {
          res.status(500).json({ error: error.message });
    }
});

module.exports = router;
