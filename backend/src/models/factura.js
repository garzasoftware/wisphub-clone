const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Factura = sequelize.define('Factura', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  folio: { type: DataTypes.STRING, allowNull: false, unique: true },
  cliente_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'clientes', key: 'id' } },
  concepto: { type: DataTypes.STRING, allowNull: false },
  monto: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  impuesto: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  estado: { type: DataTypes.ENUM('pendiente', 'pagada', 'vencida', 'cancelada'), defaultValue: 'pendiente' },
  fecha_emision: { type: DataTypes.DATEONLY, allowNull: false },
  fecha_vencimiento: { type: DataTypes.DATEONLY, allowNull: false },
  fecha_pago: { type: DataTypes.DATEONLY, allowNull: true },
  metodo_pago: { type: DataTypes.STRING, allowNull: true },
  promesa_pago: { type: DataTypes.DATEONLY, allowNull: true },
  notas: { type: DataTypes.TEXT, allowNull: true }
}, {
  tableName: 'facturas',
  timestamps: true,
  indexes: [
    { fields: ['cliente_id'] },
    { fields: ['estado'] },
    { fields: ['fecha_vencimiento'] }
  ]
});

module.exports = Factura;

