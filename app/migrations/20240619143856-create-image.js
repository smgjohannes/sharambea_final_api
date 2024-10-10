'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('images', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING,
      },
      path: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.STRING,
      },
      imageable_id: {
        type: Sequelize.STRING,
      },
      imageable_type: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      directory: {
        type: Sequelize.TEXT,
        allowNull: true,
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('images');
  },
};
