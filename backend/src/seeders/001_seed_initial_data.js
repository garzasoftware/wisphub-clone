'use strict';

module.exports = {
  up: async (queryInterface) => {
    // Zonas
    await queryInterface.bulkInsert('zonas', [
      { nombre: 'Zona Norte', descripcion: 'Sector norte de la ciudad', activo: true, created_at: new Date(), updated_at: new Date() },
      { nombre: 'Zona Sur', descripcion: 'Sector sur de la ciudad', activo: true, created_at: new Date(), updated_at: new Date() },
      { nombre: 'Zona Centro', descripcion: 'Centro de la ciudad', activo: true, created_at: new Date(), updated_at: new Date() },
      { nombre: 'Zona Este', descripcion: 'Sector este', activo: true, created_at: new Date(), updated_at: new Date() },
      { nombre: 'Zona Oeste', descripcion: 'Sector oeste', activo: true, created_at: new Date(), updated_at: new Date() },
    ]);

    // Planes de Internet
    await queryInterface.bulkInsert('planes_internet', [
      { nombre: 'Plan 5 Mbps', tipo: 'queue', precio: 299.00, velocidad_descarga: 5, velocidad_subida: 2, activo: true, created_at: new Date(), updated_at: new Date() },
      { nombre: 'Plan 10 Mbps', tipo: 'queue', precio: 399.00, velocidad_descarga: 10, velocidad_subida: 5, activo: true, created_at: new Date(), updated_at: new Date() },
      { nombre: 'Plan 20 Mbps', tipo: 'queue', precio: 499.00, velocidad_descarga: 20, velocidad_subida: 10, activo: true, created_at: new Date(), updated_at: new Date() },
      { nombre: 'Plan 30 Mbps', tipo: 'queue', precio: 599.00, velocidad_descarga: 30, velocidad_subida: 15, activo: true, created_at: new Date(), updated_at: new Date() },
      { nombre: 'Plan 50 Mbps', tipo: 'queue', precio: 799.00, velocidad_descarga: 50, velocidad_subida: 25, activo: true, created_at: new Date(), updated_at: new Date() },
      { nombre: 'Plan 100 Mbps', tipo: 'queue', precio: 999.00, velocidad_descarga: 100, velocidad_subida: 50, activo: true, created_at: new Date(), updated_at: new Date() },
      { nombre: 'PCQ Basico', tipo: 'pcq', precio: 199.00, velocidad_descarga: 3, velocidad_subida: 1, activo: true, created_at: new Date(), updated_at: new Date() },
      { nombre: 'HotSpot 1 dia', tipo: 'hotspot', precio: 50.00, velocidad_descarga: 10, velocidad_subida: 5, activo: true, created_at: new Date(), updated_at: new Date() },
    ]);

    // Routers
    await queryInterface.bulkInsert('routers', [
      { nombre: 'SECTOR 8', ip: '192.168.8.1', usuario: 'admin', api_habilitada: true, marca: 'MikroTik', modelo: 'RB951G', zona_id: 1, activo: true, created_at: new Date(), updated_at: new Date() },
      { nombre: 'Cero lena', ip: '192.168.2.1', usuario: 'admin', api_habilitada: true, marca: 'MikroTik', modelo: 'hAP ac2', zona_id: 2, activo: true, created_at: new Date(), updated_at: new Date() },
      { nombre: 'SECTOR CENTRO', ip: '192.168.3.1', usuario: 'admin', api_habilitada: true, marca: 'MikroTik', modelo: 'RB1100AHx4', zona_id: 3, activo: true, created_at: new Date(), updated_at: new Date() },
    ]);

    console.log('Seeder 001 completado: datos iniciales insertados');
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('routers', null, {});
    await queryInterface.bulkDelete('planes_internet', null, {});
    await queryInterface.bulkDelete('zonas', null, {});
  }
};
