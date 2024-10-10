const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const sequelizeTransforms = require('sequelize-transforms');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const logger = require('../utils/logger');

const ImageModel = require('./image');
const UserModel = require('./user');
const TokenModel = require('./token');
const BiddingModel = require('./bidding');
const InterestedBuyersModel = require('./interested_buyers');
const PropertyCountModel = require('./property_count');
const PropertyModel = require('./property');
const ViewedBuyersModel = require('./viewed_buyers');
const RequestModel = require('./request');
const CategoryModel = require('./category');

const db = {};

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

sequelizeTransforms(sequelize);

// Migrations
const umzug = new Umzug({
  migrations: {
    glob: '../migrations/*.js',
    resolve: ({ name, path, context }) => {
      const migration = require(path);
      return {
        // adjust the parameters Umzug will
        // pass to migration methods when called
        name,
        up: async () => migration.up(context, Sequelize),
        down: async () => migration.down(context, Sequelize),
      };
    },
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: logger,
});

const models = {
  user: UserModel(sequelize, Sequelize.DataTypes),
  token: TokenModel(sequelize, Sequelize.DataTypes),
  image: ImageModel(sequelize, Sequelize.DataTypes),
  bidding: BiddingModel(sequelize, Sequelize.DataTypes),
  interested_buyers: InterestedBuyersModel(sequelize, Sequelize.DataTypes),
  property_count: PropertyCountModel(sequelize, Sequelize.DataTypes),
  property: PropertyModel(sequelize, Sequelize.DataTypes),
  viewed_buyers: ViewedBuyersModel(sequelize, Sequelize.DataTypes),
  request: RequestModel(sequelize, Sequelize.DataTypes),
  category: CategoryModel(sequelize, Sequelize.DataTypes),
};

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.models = models;
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.umzug = umzug;

module.exports = db;
