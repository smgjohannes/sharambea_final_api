'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('properties', 'category', {
      type: Sequelize.ENUM(
        'house',
        'apartment/flat',
        'farm',
        'vacant land/plot',
        'townhouse',
        'industrial property',
        'commercial property'
      ),
      allowNull: false, // Optional: if you want to enforce the field being required
    });
  },

  down: async (queryInterface, Sequelize) => {
    // To remove the ENUM, you need to drop the column and the ENUM type in PostgreSQL
    await queryInterface.removeColumn('properties', 'category');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_properties_category";'
    );
  },
};
