'use strict';
const { Sequelize } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig
  );

// Importar modelos
const Cliente = require('./cliente')(sequelize, Sequelize.DataTypes);
const Servicio = require('./servicio')(sequelize, Sequelize.DataTypes);
const Factura = require('./factura')(sequelize, Sequelize.DataTypes);
const Pago = require('./pago')(sequelize, Sequelize.DataTypes);
const Ticket = require('./ticket')(sequelize, Sequelize.DataTypes);
const Router = require('./router')(sequelize, Sequelize.DataTypes);
const PlanInternet = require('./planInternet')(sequelize, Sequelize.DataTypes);
const Zona = require('./zona')(sequelize, Sequelize.DataTypes);
const Staff = require('./staff')(sequelize, Sequelize.DataTypes);
const Almacen = require('./almacen')(sequelize, Sequelize.DataTypes);
const DispositivoRed = require('./dispositivoRed')(sequelize, Sequelize.DataTypes);
const Instalacion = require('./instalacion')(sequelize, Sequelize.DataTypes);
const Gasto = require('./gasto')(sequelize, Sequelize.DataTypes);
const FormaPago = require('./formaPago')(sequelize, Sequelize.DataTypes);
const Proveedor = require('./proveedor')(sequelize, Sequelize.DataTypes);
const Notificacion = require('./notificacion')(sequelize, Sequelize.DataTypes);

const db = {
    sequelize,
    Sequelize,
    Cliente,
    Servicio,
    Factura,
    Pago,
    Ticket,
    Router,
    PlanInternet,
    Zona,
    Staff,
    Almacen,
    DispositivoRed,
    Instalacion,
    Gasto,
    FormaPago,
    Proveedor,
    Notificacion
};

// Asociaciones
// Cliente tiene muchos Servicios
Cliente.hasMany(Servicio, { foreignKey: 'clienteId', as: 'servicios' });
Servicio.belongsTo(Cliente, { foreignKey: 'clienteId', as: 'cliente' });

// Cliente tiene muchas Facturas
Cliente.hasMany(Factura, { foreignKey: 'clienteId', as: 'facturas' });
Factura.belongsTo(Cliente, { foreignKey: 'clienteId', as: 'cliente' });

// Cliente tiene muchos Tickets
Cliente.hasMany(Ticket, { foreignKey: 'clienteId', as: 'tickets' });
Ticket.belongsTo(Cliente, { foreignKey: 'clienteId', as: 'cliente' });

// Ticket asignado a Staff
Staff.hasMany(Ticket, { foreignKey: 'staffId', as: 'tickets' });
Ticket.belongsTo(Staff, { foreignKey: 'staffId', as: 'tecnico' });

// Servicio pertenece a Router
Router.hasMany(Servicio, { foreignKey: 'routerId', as: 'servicios' });
Servicio.belongsTo(Router, { foreignKey: 'routerId', as: 'router' });

// Servicio pertenece a PlanInternet
PlanInternet.hasMany(Servicio, { foreignKey: 'planId', as: 'servicios' });
Servicio.belongsTo(PlanInternet, { foreignKey: 'planId', as: 'plan' });

// Servicio pertenece a Zona
Zona.hasMany(Servicio, { foreignKey: 'zonaId', as: 'servicios' });
Servicio.belongsTo(Zona, { foreignKey: 'zonaId', as: 'zona' });

// Factura tiene muchos Pagos
Factura.hasMany(Pago, { foreignKey: 'facturaId', as: 'pagos' });
Pago.belongsTo(Factura, { foreignKey: 'facturaId', as: 'factura' });

// Almacen tiene muchos DispositivosRed
Almacen.hasMany(DispositivoRed, { foreignKey: 'almacenId', as: 'dispositivos' });
DispositivoRed.belongsTo(Almacen, { foreignKey: 'almacenId', as: 'almacen' });

// DispositivoRed asignado a Servicio
DispositivoRed.belongsTo(Servicio, { foreignKey: 'servicioId', as: 'servicio' });
Servicio.hasOne(DispositivoRed, { foreignKey: 'servicioId', as: 'dispositivo' });

module.exports = db;
