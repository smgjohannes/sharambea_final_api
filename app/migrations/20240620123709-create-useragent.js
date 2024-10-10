module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.addColumn(
          'tokens',
          'useragent',
          {
            type: Sequelize.TEXT,
            allowNull: false,
            after: 'revoked',
          },
          { transaction: t }
        ),
      ])
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) =>
      Promise.all([
        queryInterface.removeColumn('tokens', 'useragent', {
          transaction: t,
        }),
      ])
    );
  },
};
