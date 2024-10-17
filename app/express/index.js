const path = require('path');
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const http = require('http');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const logger = require('./middleware/logger');
const errorMiddleware = require('./middleware/errorMiddleware');
const notFoundMiddleware = require('./middleware/notFoundMiddleware');
const appLogger = require('../utils/logger');

const API = require('./routes');
const { NotFoundError } = require('../utils/coreErrors');

/**
 * Start _App server.
 * @param {object} _App - Base app.
 * @param {number} port - Server port to listen to.
 * @param {object} options - Options to start the server.
 * @returns
 * @example
 */
function start(_App, port) {
  const app = express();
  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, '../views'));

  app.use(cors());
  app.options('*', cors());

  app.use('/public', express.static(path.join(__dirname, '../../public')));
  app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));
  app.use(helmet());
  app.use(logger(app));
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));
  app.use(cookieParser());
  app.use(xss());
  app.use(hpp());
  app.use(compression());

  app.enable('trust proxy');
  
  app.set('trust proxy', '127.0.0.1');
  app.use(errorMiddleware);
  app.use(function (req, res, next) {
    res.setHeader('Content-Security-Policy', "img-src 'self' https://admin.sharambeaprop.com", "img-src 'self' https://sharambeaprop.com", "img-src 'self' https://files.sharambeaprop.com",);
    return next();
  });
  // loading app
  app.use('/api/v1', API(_App));
  app.use('/api', notFoundMiddleware);
  app.all('*', (req, res, next) => {
    next(new NotFoundError(`Can't find ${req.originalUrl} on this server!`));
  });

  // initialize a simple http server
  const server = http.createServer(app);

  server.listen(port, () => {
    appLogger.info(`App Server listening on port ${port}`);
  });

  return { app, server };
}

module.exports = {
  start,
};

