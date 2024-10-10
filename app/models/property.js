'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    static associate(models) {
      Property.belongsTo(models.User, {
        foreignKey: 'seller_id',
        as: 'seller',
      });
      Property.belongsTo(models.User, {
        foreignKey: 'buyer_id',
        as: 'buyer',
      });

      Property.hasMany(models.Image, {
        foreignKey: 'imageable_id',
        constraints: false,
        scope: {
          imageable_type: 'property',
        },
      });
    }
  }

  Property.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      property_name: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'property_name',
      },
      category: {
        type: DataTypes.ENUM(
          'house',
          'apartment/flat',
          'farm',
          'vacant land/plot',
          'townhouse',
          'industrial property',
          'commercial property'
        ),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'name',
      },
      seller_id: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        field: 'seller_id',
      },
      buyer_id: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        field: 'buyer_id',
      },
      house_number: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'house_number',
      },
      street_name: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'street_name',
      },
      suburb: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      town: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      region: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      document: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      property_type: {
        type: DataTypes.ENUM('rent', 'sell', 'buy'),
        allowNull: false,
        defaultValue: 'sell',
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      bedrooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      kitchens: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      toilets: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      dining_rooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'dining_rooms',
      },
      bathrooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      sitting_rooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'sitting_rooms',
      },

      land_size: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      flatlet: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'flatlet',
      },

      price: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      monthly_rates: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      monthly_levy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      images: {
        type: DataTypes.JSON,
        allowNull: true,
      },

      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'created_at',
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'updated_at',
      },

      outside_building: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      kitchenette: {
        // Add kitchenette field
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      parking: {
        // Add parking field
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Property',
      tableName: 'properties',
      timestamps: true,
    }
  );

  return Property;
};
