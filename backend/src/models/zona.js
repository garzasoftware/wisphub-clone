const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Zona = sequelize.define('Zona', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.STRING, allowNull: true },
  latitud: { type: DataTypes.DECIMAL(10, 7), allowNull: true },
  longitud: { type: DataTypes.DECIMAL(10, 7), allowNull: true },
  color: { type: DataTypes.STRING, defaultValue: '#3b82f6' },
  activa: { type: DataTypes.BOOLEAN, defaultValue: true },
  total_clientes: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
  tableName: 'zonas',
  timestamps: true,
  indexes: [
    { fields: ['activa'] }
  ]
});

module.exports = Zona;

