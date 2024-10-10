'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('requests', 'category_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // or false, depending on your requirements
      references: {
        model: 'categories',
        key: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('requests', 'category_id');
  },
};
