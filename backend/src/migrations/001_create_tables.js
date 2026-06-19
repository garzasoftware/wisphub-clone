'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Tabla de Zonas
    await queryInterface.createTable('zonas', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      nombre: { type: Sequelize.STRING(100), allowNull: false },
      descripcion: { type: Sequelize.TEXT },
      activo: { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });

    // Tabla de Routers
    await queryInterface.createTable('routers', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      nombre: { type: Sequelize.STRING(100), allowNull: false },
      ip: { type: Sequelize.STRING(45), allowNull: false, unique: true },
      usuario: { type: Sequelize.STRING(100) },
      password: { type: Sequelize.STRING(255) },
      api_habilitada: { type: Sequelize.BOOLEAN, defaultValue: false },
      marca: { type: Sequelize.STRING(50) },
      modelo: { type: Sequelize.STRING(100) },
      zona_id: { type: Sequelize.INTEGER, references: { model: 'zonas', key: 'id' } },
      activo: { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });

    // Tabla de Planes de Internet
    await queryInterface.createTable('planes_internet', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      nombre: { type: Sequelize.STRING(100), allowNull: false },
      tipo: { type: Sequelize.ENUM('queue', 'pcq', 'hotspot', 'pppoe'), defaultValue: 'queue' },
      precio: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      velocidad_descarga: { type: Sequelize.INTEGER },
      velocidad_subida: { type: Sequelize.INTEGER },
      burst_descarga: { type: Sequelize.INTEGER },
      burst_subida: { type: Sequelize.INTEGER },
      activo: { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });

    // Tabla de Clientes
    await queryInterface.createTable('clientes', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      nombre: { type: Sequelize.STRING(200), allowNull: false },
      apellido: { type: Sequelize.STRING(200) },
      email: { type: Sequelize.STRING(255) },
      telefono: { type: Sequelize.STRING(50) },
      direccion: { type: Sequelize.TEXT },
      estado: { type: Sequelize.ENUM('activo', 'suspendido', 'cancelado'), defaultValue: 'activo' },
      ip: { type: Sequelize.STRING(45) },
      mac: { type: Sequelize.STRING(17) },
      plan_internet_id: { type: Sequelize.INTEGER, references: { model: 'planes_internet', key: 'id' } },
      router_id: { type: Sequelize.INTEGER, references: { model: 'routers', key: 'id' } },
      zona_id: { type: Sequelize.INTEGER, references: { model: 'zonas', key: 'id' } },
      fecha_instalacion: { type: Sequelize.DATE },
      dia_corte: { type: Sequelize.INTEGER, defaultValue: 1 },
      latitud: { type: Sequelize.DECIMAL(10, 8) },
      longitud: { type: Sequelize.DECIMAL(11, 8) },
      notas: { type: Sequelize.TEXT },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });

    // Tabla de Facturas
    await queryInterface.createTable('facturas', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      numero_factura: { type: Sequelize.STRING(20), unique: true },
      cliente_id: { type: Sequelize.INTEGER, references: { model: 'clientes', key: 'id' } },
      cajero: { type: Sequelize.STRING(100) },
      estado: { type: Sequelize.ENUM('pendiente', 'pagado', 'cancelado'), defaultValue: 'pendiente' },
      total: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      forma_pago: { type: Sequelize.STRING(50) },
      referencia: { type: Sequelize.STRING(100) },
      fecha_emision: { type: Sequelize.DATE },
      fecha_pago: { type: Sequelize.DATE },
      fecha_vencimiento: { type: Sequelize.DATE },
      zona_id: { type: Sequelize.INTEGER, references: { model: 'zonas', key: 'id' } },
      notas: { type: Sequelize.TEXT },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });

    // Tabla de Tickets de Soporte
    await queryInterface.createTable('tickets', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      numero_ticket: { type: Sequelize.STRING(20), unique: true },
      cliente_id: { type: Sequelize.INTEGER, references: { model: 'clientes', key: 'id' } },
      asunto: { type: Sequelize.STRING(255), allowNull: false },
      descripcion: { type: Sequelize.TEXT },
      estado: { type: Sequelize.ENUM('abierto', 'en_progreso', 'resuelto', 'cerrado'), defaultValue: 'abierto' },
      prioridad: { type: Sequelize.ENUM('baja', 'media', 'alta', 'urgente'), defaultValue: 'media' },
      tecnico_asignado: { type: Sequelize.STRING(100) },
      fecha_apertura: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      fecha_cierre: { type: Sequelize.DATE },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });

    // Indices
    await queryInterface.addIndex('clientes', ['estado']);
    await queryInterface.addIndex('clientes', ['zona_id']);
    await queryInterface.addIndex('clientes', ['router_id']);
    await queryInterface.addIndex('facturas', ['estado']);
    await queryInterface.addIndex('facturas', ['cliente_id']);
    await queryInterface.addIndex('tickets', ['estado']);
    await queryInterface.addIndex('tickets', ['cliente_id']);

    console.log('Migracion 001 completada: tablas creadas exitosamente');
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('tickets');
    await queryInterface.dropTable('facturas');
    await queryInterface.dropTable('clientes');
    await queryInterface.dropTable('planes_internet');
    await queryInterface.dropTable('routers');
    await queryInterface.dropTable('zonas');
  }
};
