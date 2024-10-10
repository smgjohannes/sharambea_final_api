'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     */
    await queryInterface.addColumn('Requests', 'proof_of_fund', {
      type: Sequelize.STRING,
      allowNull: true, // Set to false if you want this field to be required
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     */
    await queryInterface.removeColumn('Requests', 'proof_of_fund');
  },
};
