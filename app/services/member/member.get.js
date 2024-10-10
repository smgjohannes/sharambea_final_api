const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../../models');

const DEFAULT_OPTIONS = {
  fields: [
    'id',
    'id_number',
    'name',
    'surname',
    'cell_number',
    'date_of_birth',
    'age',
    'member_of',
    'local_church',
    'from_date',
    'father',
    'mother',
    'slug',
    'status',
    'created_at',
    'updated_at',
  ],
  skip: 0,
  order_dir: 'ASC',
  order_by: 'id',
};

/**
 * @description Get list of users
 * @param {Object} options - Options of the query.
 * @returns {Promise} Return list of users.
 * @example
 * const users = await raceresult.user.get({
 *  take: 20,
 *  skip: 0
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
      {
        model: db.Payment,
        as: 'payments',
      },
    ],
  };

  if (optionsWithDefault.take) {
    queryParams.limit = optionsWithDefault.take;
  }

  if (optionsWithDefault.search) {
    queryParams.where = {
      [Op.or]: [
        Sequelize.where(Sequelize.fn('lower', Sequelize.col('name')), {
          [Op.like]: `%${optionsWithDefault.search}%`,
        }),
        Sequelize.where(Sequelize.fn('lower', Sequelize.col('surname')), {
          [Op.like]: `%${optionsWithDefault.search}%`,
        }),

        Sequelize.where(Sequelize.fn('lower', Sequelize.col('father')), {
          [Op.like]: `%${optionsWithDefault.search}%`,
        }),
        Sequelize.where(Sequelize.fn('lower', Sequelize.col('mother')), {
          [Op.like]: `%${optionsWithDefault.search}%`,
        }),
        Sequelize.where(Sequelize.fn('lower', Sequelize.col('status')), {
          [Op.like]: `%${optionsWithDefault.search}%`,
        }),
      ],
    };
  }

  const members = await db.Member.findAll(queryParams);

  const membersPlain = members.map((member) => {
    // we converted the member to plain object
    const memberPlain = member.get({ plain: true });
    return memberPlain;
  });

  return membersPlain;
}

module.exports = {
  get,
};
