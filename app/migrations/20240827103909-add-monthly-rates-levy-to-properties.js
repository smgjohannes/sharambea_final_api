'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('properties', 'monthly_rates', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('properties', 'monthly_levy', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('properties', 'monthly_rates');
    await queryInterface.removeColumn('properties', 'monthly_levy');
  },
};
