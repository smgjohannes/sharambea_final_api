const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ViewedBuyers extends Model {
    static associate(models) {
      ViewedBuyers.belongsTo(models.User, {
        foreignKey: 'user_dd',
      });
      ViewedBuyers.belongsTo(models.Property, {
        foreignKey: 'property_id',
      });
    }
  }

  ViewedBuyers.init(
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      property_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'viewed_buyers',
      modelName: 'ViewedBuyers',
    }
  );

  return ViewedBuyers;
};
