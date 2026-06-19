const { Sequelize } = require('sequelize');
const logger = require('../utils/logger');

const sequelize = new Sequelize(
    process.env.DB_NAME || 'wisphub',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASS || 'postgres',
  {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        dialect: 'postgres',
        logging: process.env.NODE_ENV === 'development' ? (msg) => logger.debug(msg) : false,
        pool: {
                max: 10,
                min: 0,
                acquire: 30000,
                idle: 10000
        },
              define: {
                      timestamps: true,
                      underscored: true
              }
  }
  );

const connectDB = async () => {
    try {
          await sequelize.authenticate();
          logger.info('PostgreSQL conectado exitosamente');
          if (process.env.NODE_ENV === 'development') {
                  await sequelize.sync({ alter: true });
                  logger.info('Modelos sincronizados');
          }
    } catch (error) {
          logger.error('Error conectando a PostgreSQL:', error);
          process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
