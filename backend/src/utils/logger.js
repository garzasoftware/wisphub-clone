const winston = require('winston');

const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
          errors({ stack: true }),
          timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          logFormat
        ),
    transports: [
          new winston.transports.Console({
                  format: combine(
                            colorize(),
                            errors({ stack: true }),
                            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                            logFormat
                          )
          }),
          new winston.transports.File({
                  filename: 'logs/error.log',
                  level: 'error',
                  maxsize: 10 * 1024 * 1024,
                  maxFiles: 5
          }),
          new winston.transports.File({
                  filename: 'logs/combined.log',
                  maxsize: 10 * 1024 * 1024,
                  maxFiles: 5
          })
        ],
    exceptionHandlers: [
          new winston.transports.File({ filename: 'logs/exceptions.log' })
        ]
});

module.exports = logger;
