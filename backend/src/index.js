require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { createServer } = require('http');
const { Server } = require('socket.io');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const { sequelize } = require('./models');
const { connectRedis } = require('./config/redis');
const logger = require('./utils/logger');

// Rutas
const authRoutes = require('./routes/auth');
const clientesRoutes = require('./routes/clientes');
const facturasRoutes = require('./routes/facturas');
const pagosRoutes = require('./routes/pagos');
const ticketsRoutes = require('./routes/tickets');
const routersRoutes = require('./routes/routers');
const planesRoutes = require('./routes/planes');
const zonasRoutes = require('./routes/zonas');
const almacenRoutes = require('./routes/almacen');
const staffRoutes = require('./routes/staff');
const ajustesRoutes = require('./routes/ajustes');
const dashboardRoutes = require('./routes/dashboard');
const notificacionesRoutes = require('./routes/notificaciones');
const instalacionesRoutes = require('./routes/instalaciones');
const serviciosAdicionalesRoutes = require('./routes/serviciosAdicionales');
const gastosRoutes = require('./routes/gastos');
const reportesRoutes = require('./routes/reportes');
const hotspotRoutes = require('./routes/hotspot');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
          origin: process.env.FRONTEND_URL || 'http://localhost:3000',
          methods: ['GET', 'POST']
    }
});

// Middleware de seguridad
app.use(helmet());
app.use(compression());
app.use(morgan('combined', { stream: { write: msg => logger.info(msg.trim()) } }));

// CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Archivos estáticos
app.use('/uploads', express.static('uploads'));

// Documentación API
try {
    const swaggerDocument = YAML.load('./src/docs/swagger.yaml');
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (e) {
    logger.warn('Swagger docs not found');
}

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/facturas', facturasRoutes);
app.use('/api/pagos', pagosRoutes);
app.use('/api/tickets', ticketsRoutes);
app.use('/api/routers', routersRoutes);
app.use('/api/planes', planesRoutes);
app.use('/api/zonas', zonasRoutes);
app.use('/api/almacen', almacenRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/ajustes', ajustesRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/notificaciones', notificacionesRoutes);
app.use('/api/instalaciones', instalacionesRoutes);
app.use('/api/servicios-adicionales', serviciosAdicionalesRoutes);
app.use('/api/gastos', gastosRoutes);
app.use('/api/reportes', reportesRoutes);
app.use('/api/hotspot', hotspotRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(err.status || 500).json({
          error: err.message || 'Error interno del servidor',
          ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Socket.io para notificaciones en tiempo real
io.on('connection', (socket) => {
    logger.info(`Cliente conectado: ${socket.id}`);

        socket.on('join_room', (userId) => {
              socket.join(`user_${userId}`);
        });

        socket.on('disconnect', () => {
              logger.info(`Cliente desconectado: ${socket.id}`);
        });
});

// Hacer io accesible en las rutas
app.set('io', io);

// Iniciar servidor
const PORT = process.env.PORT || 3001;

async function startServer() {
    try {
          // Conectar a base de datos
      await sequelize.authenticate();
          logger.info('Conexion a PostgreSQL establecida');

      // Conectar a Redis
      await connectRedis();
          logger.info('Conexion a Redis establecida');

      // Sincronizar modelos (desarrollo)
      if (process.env.NODE_ENV === 'development') {
              await sequelize.sync({ alter: true });
              logger.info('Modelos sincronizados');
      }

      httpServer.listen(PORT, () => {
              logger.info(`Servidor corriendo en puerto ${PORT}`);
              logger.info(`Docs disponibles en http://localhost:${PORT}/api/docs`);
      });
    } catch (error) {
          logger.error('Error al iniciar servidor:', error);
          process.exit(1);
    }
}

startServer();
