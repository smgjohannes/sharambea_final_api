const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../../models');

const DEFAULT_OPTIONS = {
  fields: [
    'id',
    'name',
    'email',
    'phone',
    'description',
    'category_type',
    'property_type',
    'location',
    'price',
    'date_of_moving_in',
    'proof_of_fund',
    'created_at',
    'updated_at',
  ],
  skip: 0,
  order_dir: 'ASC',
  order_by: 'id',
};

/**
 * @description Get list of requests
 * @param {Object} options - Options of the query.
 * @returns {Promise} Return list of requests.
 * @example
 * const requests = await raceresult.request.get({
 *  take: 20,
 *  skip: 0,
 *  property_type: 'rent',
 * });
 */
async function get(options) {
  const optionsWithDefault = Object.assign({}, DEFAULT_OPTIONS, options);

  const queryParams = {
    attributes: optionsWithDefault.fields,
    offset: optionsWithDefault.skip,
    order: [[optionsWithDefault.order_by, optionsWithDefault.order_dir]],
    include: [
      {
        model: db.Image,
        attributes: ['id', 'name', 'url'],
      },
    ],
    where: {}, // Initialize where clause as an empty object
  };

  // Add limit if specified
  if (optionsWithDefault.take) {
    queryParams.limit = optionsWithDefault.take;
  }

  // Filter by property_type if provided
  if (optionsWithDefault.property_type) {
    queryParams.where.property_type = optionsWithDefault.property_type;
  }

  // Add search condition if provided
  if (optionsWithDefault.search) {
    queryParams.where[Op.or] = [
      Sequelize.where(Sequelize.fn('lower', Sequelize.col('name')), {
        [Op.like]: `%${optionsWithDefault.search}%`,
      }),
      Sequelize.where(Sequelize.fn('lower', Sequelize.col('email')), {
        [Op.like]: `%${optionsWithDefault.search}%`,
      }),
      Sequelize.where(Sequelize.fn('lower', Sequelize.col('description')), {
        [Op.like]: `%${optionsWithDefault.search}%`,
      }),
      Sequelize.where(Sequelize.fn('lower', Sequelize.col('published')), {
        [Op.like]: `%${optionsWithDefault.search}%`,
      }),
    ];
  }

  const requests = await db.Request.findAll(queryParams);

  const requestsPlain = requests.map((request) => {
    // Convert the request to a plain object
    const requestPlain = request.get({ plain: true });
    return requestPlain;
  });

  return requestsPlain;
}

module.exports = {
  get,
};
