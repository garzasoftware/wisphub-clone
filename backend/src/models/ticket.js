const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Ticket = sequelize.define('Ticket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  folio: { type: DataTypes.STRING, allowNull: false, unique: true },
  cliente_id: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'clientes', key: 'id' } },
  asunto: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.TEXT, allowNull: false },
  categoria: { type: DataTypes.ENUM('soporte_tecnico', 'facturacion', 'instalacion', 'reconexion', 'otro'), defaultValue: 'soporte_tecnico' },
  prioridad: { type: DataTypes.ENUM('baja', 'media', 'alta', 'urgente'), defaultValue: 'media' },
  estado: { type: DataTypes.ENUM('abierto', 'en_proceso', 'pendiente', 'resuelto', 'cerrado'), defaultValue: 'abierto' },
  asignado_a: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'staff', key: 'id' } },
  fecha_apertura: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  fecha_cierre: { type: DataTypes.DATE, allowNull: true }
}, {
  tableName: 'tickets',
  timestamps: true,
  indexes: [
    { fields: ['cliente_id'] },
    { fields: ['estado'] },
    { fields: ['prioridad'] },
    { fields: ['asignado_a'] }
  ]
});

module.exports = Ticket;

