const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Staff = sequelize.define('Staff', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  telefono: { type: DataTypes.STRING, allowNull: true },
  rol: { type: DataTypes.ENUM('administrador', 'tecnico', 'cajero', 'vendedor', 'soporte'), defaultValue: 'tecnico' },
  activo: { type: DataTypes.BOOLEAN, defaultValue: true },
  ultimo_acceso: { type: DataTypes.DATE, allowNull: true }
}, {
  tableName: 'staff',
  timestamps: true,
  indexes: [
    { fields: ['rol'] },
    { fields: ['activo'] }
  ]
});

module.exports = Staff;

