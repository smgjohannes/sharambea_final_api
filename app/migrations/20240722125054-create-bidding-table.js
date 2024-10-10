'use strict';

// migrations/20210722000001-create-bidding.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('biddings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
      },
      property_id: {
        type: Sequelize.UUID,
        references: {
          model: 'properties',
          key: 'id',
        },
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      amount: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      approved: {
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('biddings');
  },
};
