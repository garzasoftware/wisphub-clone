const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Plan = sequelize.define('Plan', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  tipo: { type: DataTypes.ENUM('queue', 'pcq', 'hotspot', 'pppoe'), defaultValue: 'pppoe' },
  velocidad_subida: { type: DataTypes.INTEGER, allowNull: false, comment: 'Mbps' },
  velocidad_bajada: { type: DataTypes.INTEGER, allowNull: false, comment: 'Mbps' },
  precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  burst_limit: { type: DataTypes.STRING, allowNull: true },
  burst_threshold: { type: DataTypes.STRING, allowNull: true },
  prioridad: { type: DataTypes.INTEGER, defaultValue: 8 },
  activo: { type: DataTypes.BOOLEAN, defaultValue: true },
  total_clientes: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
  tableName: 'planes',
  timestamps: true,
  indexes: [
    { fields: ['tipo'] },
    { fields: ['activo'] }
  ]
});

module.exports = Plan;

