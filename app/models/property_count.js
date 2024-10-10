const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PropertyCount extends Model {
    static associate(models) {
      // Define associations here if necessary
    }
  }

  PropertyCount.init(
    {
      new_properties: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      active_properties: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      inactive_properties: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'property_counts',
      modelName: 'PropertyCount',
    }
  );

  return PropertyCount;
};
