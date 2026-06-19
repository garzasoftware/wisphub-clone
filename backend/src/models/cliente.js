'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cliente extends Model {
          static associate(models) {
                  Cliente.hasMany(models.Servicio, { foreignKey: 'clienteId', as: 'servicios' });
                  Cliente.hasMany(models.Factura, { foreignKey: 'clienteId', as: 'facturas' });
                  Cliente.hasMany(models.Ticket, { foreignKey: 'clienteId', as: 'tickets' });
                  Cliente.hasMany(models.Instalacion, { foreignKey: 'clienteId', as: 'instalaciones' });
          }
    }

    Cliente.init({
          id: {
                  type: DataTypes.INTEGER,
                  primaryKey: true,
                  autoIncrement: true
          },
          nombre: {
                  type: DataTypes.STRING(100),
                  allowNull: false,
                  validate: { notEmpty: true }
          },
          apellido: {
                  type: DataTypes.STRING(100),
                  allowNull: false
          },
          email: {
                  type: DataTypes.STRING(150),
                  allowNull: true,
                  validate: { isEmail: true }
          },
          telefono: {
                  type: DataTypes.STRING(20),
                  allowNull: false
          },
          telefonoAdicional: {
                  type: DataTypes.STRING(20),
                  allowNull: true
          },
          direccion: {
                  type: DataTypes.TEXT,
                  allowNull: false
          },
          colonia: {
                  type: DataTypes.STRING(100),
                  allowNull: true
          },
          ciudad: {
                  type: DataTypes.STRING(100),
                  allowNull: true
          },
          codigoPostal: {
                  type: DataTypes.STRING(10),
                  allowNull: true
          },
          coordenadas: {
                  type: DataTypes.STRING(50),
                  allowNull: true
          },
          estado: {
                  type: DataTypes.ENUM('activo', 'suspendido', 'cancelado', 'pre-instalacion'),
                  defaultValue: 'activo'
          },
          fotoDNIFrente: {
                  type: DataTypes.STRING(255),
                  allowNull: true
          },
          fotoDNIDorso: {
                  type: DataTypes.STRING(255),
                  allowNull: true
          },
          comprobanteDomicilio: {
                  type: DataTypes.STRING(255),
                  allowNull: true
          },
          cuponeDescuento: {
                  type: DataTypes.STRING(255),
                  allowNull: true
          },
          comentarios: {
                  type: DataTypes.TEXT,
                  allowNull: true
          },
          fechaContratacion: {
                  type: DataTypes.DATEONLY,
                  allowNull: true
          },
          asesorId: {
                  type: DataTypes.INTEGER,
                  allowNull: true,
                  references: { model: 'staff', key: 'id' }
          },
          createdAt: {
                  type: DataTypes.DATE,
                  defaultValue: DataTypes.NOW
          },
          updatedAt: {
                  type: DataTypes.DATE,
                  defaultValue: DataTypes.NOW
          }
    }, {
          sequelize,
          modelName: 'Cliente',
          tableName: 'clientes',
          timestamps: true,
          underscored: true
    });

    return Cliente;
};
