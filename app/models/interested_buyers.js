const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class InterestedBuyers extends Model {
    static associate(models) {
      InterestedBuyers.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
      InterestedBuyers.belongsTo(models.Property, {
        foreignKey: 'property_id',
      });
    }
  }

  InterestedBuyers.init(
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      viewing_date_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      property_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      seller_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'interested_buyers',
      modelName: 'InterestedBuyers',
    }
  );

  return InterestedBuyers;
};
