'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    static associate(models) {
      Request.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category',
      });

      Request.hasMany(models.Image, {
        foreignKey: 'imageable_id',
        constraints: false,
        scope: {
          imageable_type: 'request',
        },
      });
    }
  }

  Request.init(
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      category_type: {
        type: DataTypes.ENUM(
          'house',
          'apartment/flat',
          'farm',
          'vacant land/plot',
          'townhouse',
          'industrial property',
          'comercial property'
        ),
        allowNull: false,
      },
      property_type: {
        type: DataTypes.ENUM('rent', 'sell', 'buy'),
        allowNull: false,
        defaultValue: 'sell',
        field: 'property_type',
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      date_of_moving_in: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Request',
      tableName: 'requests',
    }
  );

  return Request;
};
