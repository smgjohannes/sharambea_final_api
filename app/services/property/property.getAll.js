const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../../models');

const DEFAULT_OPTIONS = {
  fields: [
    'id',
    'property_name',
    'name',
    'seller_id',
    'buyer_id',
    'house_number',
    'street_name',
    'document',
    'suburb',
    'town',
    'region',
    'property_type',
    'description',
    'bedrooms',
    'bathrooms',
    'kitchens',
    'toilets',
    'dining_rooms',
    'sitting_rooms',
    'land_size',
    'outside_building',
    'flatlet',
    'price',
    'category',
    'monthly_levy',
    'monthly_rates',
    'kitchenette',
    'parking',
  ],
  skip: 0,
  order_dir: 'ASC',
  order_by: 'id',
};

/**
 * @description getAll list of users
 * @param {Object} options - Options of the query.
 * @returns {Promise} Return list of users.
 * @example
 * const users = await raceresult.user.getAll({
 *  take: 20,
 *  skip: 0
 * });
 */
async function getAll(options) {
  const optionsWithDefault = Object.assign({}, DEFAULT_OPTIONS, options);

  const queryParams = {
    attributes: optionsWithDefault.fields,
    offset: Number(optionsWithDefault.skip),
    order: [[optionsWithDefault.order_by, optionsWithDefault.order_dir]],
  };

  if (optionsWithDefault.take) {
    queryParams.limit = Number(optionsWithDefault.take);
  }

  if (optionsWithDefault.skip > 0) {
    queryParams.offset =
      (optionsWithDefault.skip - 1) * Number(optionsWithDefault.take);
  }

  queryParams.where = {};

  if (optionsWithDefault.propertyType) {
    queryParams.where.property_type = {
      [Op.or]: [
        Sequelize.where(Sequelize.fn('lower', Sequelize.col('property_type')), {
          [Op.like]: `%${optionsWithDefault.propertyType}%`,
        }),
      ],
    };
  }

  if (optionsWithDefault.type) {
    queryParams.where.category = {
      [Op.or]: [
        Sequelize.where(Sequelize.fn('lower', Sequelize.col('category')), {
          [Op.like]: `%${optionsWithDefault.type}%`,
        }),
      ],
    };
  }

  if (optionsWithDefault.location) {
    queryParams.where.town = {
      [Op.or]: [
        Sequelize.where(Sequelize.fn('lower', Sequelize.col('town')), {
          [Op.like]: `%${optionsWithDefault.location}%`,
        }),
        Sequelize.where(Sequelize.fn('lower', Sequelize.col('suburb')), {
          [Op.like]: `%${optionsWithDefault.location}%`,
        }),
      ],
    };
  }

  if (optionsWithDefault.search) {
    queryParams.where = {
      [Op.or]: [
        Sequelize.where(Sequelize.fn('lower', Sequelize.col('property_name')), {
          [Op.like]: `%${optionsWithDefault.search}%`,
        }),

        Sequelize.where(Sequelize.fn('lower', Sequelize.col('property_type')), {
          [Op.like]: `%${optionsWithDefault.search}%`,
        }),
        Sequelize.where(Sequelize.fn('lower', Sequelize.col('town')), {
          [Op.like]: `%${optionsWithDefault.search}%`,
        }),

        Sequelize.where(Sequelize.fn('lower', Sequelize.col('bedrooms')), {
          [Op.like]: `%${optionsWithDefault.search}%`,
        }),

        Sequelize.where(Sequelize.fn('lower', Sequelize.col('price')), {
          [Op.like]: `%${optionsWithDefault.search}%`,
        }),

        Sequelize.where(
          Sequelize.fn('lower', Sequelize.col('outside_building')),
          {
            [Op.like]: `%${optionsWithDefault.search}%`,
          }
        ),

        Sequelize.where(Sequelize.fn('lower', Sequelize.col('kitchens')), {
          [Op.like]: `%${optionsWithDefault.search}%`,
        }),

        Sequelize.where(Sequelize.fn('lower', Sequelize.col('region')), {
          [Op.like]: `%${optionsWithDefault.search}%`,
        }),

        Sequelize.where(Sequelize.fn('lower', Sequelize.col('suburb')), {
          [Op.like]: `%${optionsWithDefault.search}%`,
        }),

        Sequelize.where(Sequelize.fn('lower', Sequelize.col('seller_id')), {
          [Op.like]: `%${optionsWithDefault.search}%`,
        }),
      ],
    };
  }
  const properties = await db.Property.findAll({
    queryParams,
    include: [
      {
        model: db.Image,
        attributes: ['id', 'name', 'url'],
      },
    ],
  });

  const propertiesPlain = properties.map((property) => {
    const propertyPlain = property.get({ plain: true });
    return propertyPlain;
  });

  return propertiesPlain;
}

module.exports = {
  getAll,
};
