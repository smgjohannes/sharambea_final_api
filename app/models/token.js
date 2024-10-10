const { Model } = require('sequelize');
const { TOKEN_TYPE_LIST } = require('../utils/constants');

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      // Token belongs to a user
      Token.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'id',
        as: 'user',
      });
    }
  }
  Token.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      token_type: {
        allowNull: false,
        type: DataTypes.ENUM(TOKEN_TYPE_LIST),
      },
      scope: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      token_hash: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      valid_until: {
        type: DataTypes.DATE,
      },
      last_seen: {
        type: DataTypes.DATE,
      },
      revoked: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      useragent: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Token',
      tableName: 'tokens',
    }
  );
  return Token;
};
