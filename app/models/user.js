const { Model } = require('sequelize');
const { USER_ROLE_LIST } = require('../utils/constants');
const passwordUtils = require('../utils/password');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Token, {
        foreignKey: 'user_id',
        sourceKey: 'id',
        as: 'tokens',
      });
      User.hasMany(models.Image, {
        foreignKey: 'imageable_id',
        constraints: false,
        scope: {
          imageable_type: 'user',
        },
      });
      User.hasMany(models.Property, {
        foreignKey: 'seller_id',
        as: 'properties',
      });
      User.hasMany(models.Property, {
        foreignKey: 'buyer_id',
        as: 'purchases',
      });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM(USER_ROLE_LIST),
        allowNull: false,
        defaultValue: 'user',
      },

      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
      underscored: true,
    }
  );

  User.prototype.toJSON = function toJSON() {
    const docs = { ...this.get() };
    delete docs.password;
    return docs;
  };

  User.prototype.compareHash = async function compareHash(password) {
    return passwordUtils.compare(password, this.get('password'));
  };

  return User;
};
