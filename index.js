require('dotenv').config();

const logger = require('./app/utils/logger');
const db = require('./app/models');
const { start } = require('./app/express');
const app = require('./app/services');

global.__basedir = __dirname;
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 4343;

/** HANDLE UNCAUGHT EXCEPTION */
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! Shutting down...');
  logger.error(err.name, err.message);
  process.exit(1);
});

process.on('unhandledRejection', (error, promise) => {
  logger.error('unhandledRejection catched:', promise);
  logger.error(error);
});

process.on('uncaughtException', (error, promise) => {
  logger.error('uncaughtException cached:', promise);
  logger.error(error);
});

const shutdown = async (signal) => {
  logger.info(`${signal} received.`);
  // We give App 10 seconds to properly shutdown, otherwise we do it
  setTimeout(() => {
    logger.info('Timeout to shutdown expired, forcing shut down.');
    process.exit();
  }, 10 * 1000);
  logger.info('Closing database connection.');
  try {
    await db.sequelize.close();
  } catch (e) {
    logger.info('Database is probably already closed');
    logger.warn(e);
  }
  process.exit();
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

(async () => {
  // create Sharambea object
  const _app = app({
    jwtSecret: process.env.JWT_SECRET,
  });

  // start app
  await _app.start();

  // start server
  start(_app, port, {});
})();
