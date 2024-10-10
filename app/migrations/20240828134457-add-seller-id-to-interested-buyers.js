module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('interested_buyers', 'seller_id', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('interested_buyers', 'seller_id');
  },
};
