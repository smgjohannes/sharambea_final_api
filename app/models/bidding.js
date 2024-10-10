const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bidding extends Model {
    static associate(models) {
      Bidding.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
      Bidding.belongsTo(models.Property, {
        foreignKey: 'property_id',
      });
    }
  }

  Bidding.init(
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
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      amount: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      approved: {
        type: DataTypes.STRING,
      },
      property_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'biddings',
      modelName: 'Bidding',
    }
  );

  return Bidding;
};
