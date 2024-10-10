const db = require('../models');
const { generateJwtSecret } = require('../utils/jwtSecret');
const getConfig = require('../utils/getConfig');
const logger = require('../utils/logger');

const Users = require('./users');
const Members = require('./member');
const Image = require('./image');

const Token = require('./token');
const Payments = require('./payment');
const Request = require('./request');
const Property = require('./property');
const Interestedbuyer = require('./interestedbuyer');
const Notification = require('./notification');

/**
 * @description Start a new App instance.
 * @param {object} params - Params when starting App.
 * @example
 * const App = _App();
 */
function App(params = {}) {
  params.jwtSecret = params.jwtSecret || generateJwtSecret();
  const config = getConfig();
  const token = new Token(params.jwtSecret);
  const image = new Image();
  const users = new Users(token, image);
  const members = new Members(image);
  const payments = new Payments();
  const requests = new Request(image);
  const properties = new Property(image);
  const interestedbuyers = new Interestedbuyer(image);
  const notifications = new Notification();

  const _app = {
    config,

    image,
    users,
    members,
    token,
    payments,
    requests,
    properties,
    interestedbuyers,
    notifications,

    start: async () => {
      // set wal mode
      await db.sequelize
        .authenticate()
        .then(() => {
          logger.debug('DB connected success!');
        })
        .catch((error) => {
          logger.error('DB connection err:', error);
        });

      // Execute DB migrations
      await db.umzug.up();
    },
  };

  // freeze _app object to ensure it's not modified
  return Object.freeze(_app);
}

module.exports = App;
