const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const db = require("../../models");

const DEFAULT_OPTIONS = {
  fields: [
    "id",
    "property_name",
    "name",
    "seller_id",
    "buyer_id",
    "house_number",
    "street_name",
    "document",
    "suburb",
    "town",
    "region",
    "property_type",
    "description",
    "bedrooms",
    "bathrooms",
    "kitchens",
    "toilets",
    "dining_rooms",
    "sitting_rooms",
    "land_size",
    "outside_building",
    "flatlet",
    "price",
    "category",
    "monthly_levy",
    "monthly_rates",
    "kitchenette",
    "parking",
    "created_at",
  ],
  skip: 0,
  order_dir: "ASC",
  order_by: "id",
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
async function getAll(req) {
  const optionsWithDefault = {
    ...DEFAULT_OPTIONS,
    ...req.query,
    params: req.query.params || {},
  };
  const { params } = optionsWithDefault;

  const queryParams = {
    attributes: optionsWithDefault.fields,
    offset: Number(optionsWithDefault.skip),
    order: [[optionsWithDefault.order_by, optionsWithDefault.order_dir]],
    where: {},
  };

  if (optionsWithDefault.take) {
    queryParams.limit = Number(optionsWithDefault.take);
  }

  const filters = [];

  if (params.location) {
    filters.push({
      [Op.or]: [
        Sequelize.where(Sequelize.fn("lower", Sequelize.col("region")), {
          [Op.like]: `%${params.location.toLowerCase()}%`,
        }),
        Sequelize.where(Sequelize.fn("lower", Sequelize.col("town")), {
          [Op.like]: `%${params.location.toLowerCase()}%`,
        }),
        Sequelize.where(Sequelize.fn("lower", Sequelize.col("suburb")), {
          [Op.like]: `%${params.location.toLowerCase()}%`,
        }),
      ],
    });
  }

  if (params.property_type) {
    filters.push({
      property_type: Sequelize.where(
        Sequelize.fn("lower", Sequelize.col("property_type")),
        { [Op.like]: `%${params.property_type.toLowerCase()}%` }
      ),
    });
  }

  if (params.category) {
    filters.push({
      [Op.or]: [
        Sequelize.where(Sequelize.fn("lower", Sequelize.col("category")), {
          [Op.like]: `%${params.category.toLowerCase()}%`,
        }),
      ],
    });
  }

  if (optionsWithDefault.search) {
    filters.push({
      [Op.or]: [
        Sequelize.where(Sequelize.fn("lower", Sequelize.col("property_name")), {
          [Op.like]: `%${optionsWithDefault.search.toLowerCase()}%`,
        }),
        Sequelize.where(Sequelize.fn("lower", Sequelize.col("property_type")), {
          [Op.like]: `%${optionsWithDefault.search.toLowerCase()}%`,
        }),
        Sequelize.where(Sequelize.fn("lower", Sequelize.col("town")), {
          [Op.like]: `%${optionsWithDefault.search.toLowerCase()}%`,
        }),
        Sequelize.where(Sequelize.fn("lower", Sequelize.col("suburb")), {
          [Op.like]: `%${optionsWithDefault.search.toLowerCase()}%`,
        }),
      ],
    });
  }

  if (filters.length > 0) {
    queryParams.where = {
      [Op.and]: filters,
    };
  }

  // Fetch main properties based on filters
  const properties = await db.Property.findAll({
    ...queryParams,
    include: [
      {
        model: db.Image,
        attributes: ["id", "name", "url"],
      },
    ],
  });

  // Fetch counts grouped by town and suburb
  const townSuburbCounts = await db.Property.findAll({
    attributes: [
      "town",
      "suburb",
      "property_type",
      [Sequelize.fn("COUNT", Sequelize.col("id")), "propertyCount"],
    ],
    where: queryParams.where,
    group: ["town", "suburb", "property_type"],
  });

  // Format aggregated counts for frontend compatibility
  const formattedCounts = townSuburbCounts.map((entry) => ({
    town: entry.town,
    suburb: entry.suburb,
    property_type: entry.property_type,
    propertyCount: entry.dataValues.propertyCount,
  }));

  return {
    properties: properties.map((prop) => prop.get({ plain: true })),
    counts: formattedCounts,
  };
}

module.exports = {
  getAll,
};
