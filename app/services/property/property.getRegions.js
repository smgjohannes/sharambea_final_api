const db = require("../../models");

async function getRegions() {
  // Fetch distinct regions from the Property model
  const regions = await db.Property.findAll({
    attributes: [
      [db.Sequelize.fn("DISTINCT", db.Sequelize.col("region")), "region"],
    ],
    raw: true, // This ensures we get plain objects without additional Sequelize metadata
  });

  return regions.map((region) => region.region); // Extract region names from the results
}

module.exports = {
  getRegions,
};
