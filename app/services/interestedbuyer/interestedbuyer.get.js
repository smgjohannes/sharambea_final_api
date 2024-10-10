const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../../models');

const DEFAULT_OPTIONS = {
  fields: [
    'id',
    'name',
    'email',
    'phone',
    'message',
    'seller_id',
    'viewing_date_time',
    'interested',
    'created_at',
    'updated_at',
  ],
  skip: 0,
  order_dir: 'ASC',
  order_by: 'id',
};

async function get(propertyId, options) {
  const optionsWithDefault = Object.assign({}, DEFAULT_OPTIONS, options);

  const queryParams = {
    attributes: optionsWithDefault.fields,
    offset: optionsWithDefault.skip,
    order: [[optionsWithDefault.order_by, optionsWithDefault.order_dir]],
    include: [
      {
        model: db.Property,
        attributes: ['id', 'name', 'price'],
        include: [
          {
            model: db.Image,
            attributes: ['id', 'name', 'url'],
          },
        ],
      },
    ],
  };

  if (optionsWithDefault.take) {
    queryParams.limit = optionsWithDefault.take;
  }

  if (optionsWithDefault.search) {
    queryParams.where[Op.or] = [
      Sequelize.where(Sequelize.fn('lower', Sequelize.col('name')), {
        [Op.like]: `%${optionsWithDefault.search.toLowerCase()}%`,
      }),
      Sequelize.where(Sequelize.fn('lower', Sequelize.col('email')), {
        [Op.like]: `%${optionsWithDefault.search.toLowerCase()}%`,
      }),
      Sequelize.where(Sequelize.fn('lower', Sequelize.col('phone')), {
        [Op.like]: `%${optionsWithDefault.search.toLowerCase()}%`,
      }),
    ];
  }

  const interestedBuyers = await db.InterestedBuyers.findAll({
    queryParams,
    where: { property_id: propertyId },
  });

  const interestedBuyersPlain = interestedBuyers.map((interestedBuyer) => {
    return interestedBuyer.get({ plain: true });
  });

  return interestedBuyersPlain;
}

module.exports = {
  get,
};
