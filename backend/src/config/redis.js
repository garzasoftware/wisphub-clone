const Redis = require('ioredis');
const logger = require('../utils/logger');

let redisClient = null;

const connectRedis = async () => {
    try {
          redisClient = new Redis({
                  host: process.env.REDIS_HOST || 'localhost',
                  port: parseInt(process.env.REDIS_PORT || '6379'),
                  password: process.env.REDIS_PASSWORD || undefined,
                  retryStrategy: (times) => Math.min(times * 50, 2000),
                  maxRetriesPerRequest: 3
                });

          redisClient.on('connect', () => logger.info('Redis conectado'));
          redisClient.on('error', (err) => logger.error('Redis error:', err));

          await redisClient.ping();
          logger.info('Redis listo');
        } catch (error) {
          logger.warn('Redis no disponible, continuando sin cache:', error.message);
          redisClient = null;
        }
  };

const getRedis = () => redisClient;

const cache = {
    async get(key) {
          if (!redisClient) return null;
          try {
                  const val = await redisClient.get(key);
                  return val ? JSON.parse(val) : null;
                } catch { return null; }
        },
    async set(key, value, ttlSeconds = 300) {
          if (!redisClient) return;
          try {
                  await redisClient.setex(key, ttlSeconds, JSON.stringify(value));
                } catch {}
        },
    async del(key) {
          if (!redisClient) return;
          try { await redisClient.del(key); } catch {}
        },
    async delPattern(pattern) {
          if (!redisClient) return;
          try {
                  const keys = await redisClient.keys(pattern);
                  if (keys.length > 0) await redisClient.del(...keys);
                } catch {}
        }
  };

module.exports = { connectRedis, getRedis, cache };
