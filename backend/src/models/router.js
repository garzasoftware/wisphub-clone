const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Router = sequelize.define('Router', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  ip: { type: DataTypes.STRING, allowNull: false },
  marca: { type: DataTypes.STRING, defaultValue: 'Mikrotik' },
  modelo: { type: DataTypes.STRING, allowNull: true },
  usuario_api: { type: DataTypes.STRING, allowNull: false },
  password_api: { type: DataTypes.STRING, allowNull: false },
  puerto_api: { type: DataTypes.INTEGER, defaultValue: 8728 },
  zona_id: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'zonas', key: 'id' } },
  estado: { type: DataTypes.ENUM('activo', 'inactivo', 'mantenimiento'), defaultValue: 'activo' },
  total_clientes: { type: DataTypes.INTEGER, defaultValue: 0 },
  ultima_conexion: { type: DataTypes.DATE, allowNull: true }
}, {
  tableName: 'routers',
  timestamps: true,
  indexes: [
    { fields: ['zona_id'] },
    { fields: ['estado'] }
  ]
});

module.exports = Router;

