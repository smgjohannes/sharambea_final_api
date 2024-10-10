'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Request, {
        foreignKey: 'category_id',
        as: 'requests',
      });
      Category.hasMany(models.Property, {
        foreignKey: 'category_id',
        as: 'properties',
      });
    }
  }

  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isIn: [['sell', 'buy', 'rent']],
        },
      },
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'categories',
    }
  );

  return Category;
};
