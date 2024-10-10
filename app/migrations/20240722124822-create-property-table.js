'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('properties', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      property_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      seller_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      category_id: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      buyer_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      house_number: {
        type: Sequelize.STRING,
      },
      street_name: {
        type: Sequelize.STRING,
      },
      suburb: {
        type: Sequelize.STRING,
      },
      town: {
        type: Sequelize.STRING,
      },
      region: {
        type: Sequelize.STRING,
      },
      document: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      property_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      bedrooms: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      bathrooms: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      kitchens: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      toilets: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      dining_rooms: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      sitting_rooms: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      land_size: {
        type: Sequelize.STRING,
      },
      outside_building: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      flatlet: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      price: {
        type: Sequelize.STRING,
      },
      kitchenette: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      parking: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      living_area: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      outside_parking: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      garden: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      images: {
        type: Sequelize.JSON,
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('properties');
  },
};
