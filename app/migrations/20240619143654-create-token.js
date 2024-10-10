'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tokens', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      token_type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      token_hash: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      scope: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      valid_until: {
        type: Sequelize.DATE,
      },
      last_seen: {
        type: Sequelize.DATE,
      },
      revoked: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Check for existing index before adding a new one
    const indexes = await queryInterface.showIndex('tokens');
    const userIndexExists = indexes.some(
      (index) => index.name === 'tokens_user_id'
    );
    if (!userIndexExists) {
      await queryInterface.addIndex('tokens', ['user_id'], {
        name: 'tokens_user_id',
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tokens');
  },
};
