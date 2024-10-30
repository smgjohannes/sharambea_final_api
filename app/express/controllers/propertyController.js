const { json } = require("sequelize");
const { getRegions } = require("../../services/property/property.getRegions");
const asyncMiddleware = require("../middleware/asyncMiddleware");

module.exports = function propertyController(app) {
  /**
   * @api {get} /api/v1/properties/getAll
   * @apiName getAll
   * @apiGroup Property
   *
   */
  async function getAll(req, res) {
    const response = await app.properties.getAll(req);
    res.json(response);
  }

  /**
   * @api {get} /api/v1/properties
   * @apiName get
   * @apiGroup Property
   *
   */
  async function get(req, res) {
    const response = await app.properties.get(req, req);
    res.json(response);
  }
  /**
   * @api {get} /api/v1/properties/regions
   * @apiName getRegions
   * @apiGroup Property
   *
   */
  async function getRegions(req, res) {
    const regions = await app.properties.getRegions(); // Call the getRegions service
    res.json(regions);
  }
  /**
   * @api {post} /api/v1/properties
   * @apiName create
   * @apiGroup Property
   *
   */
  async function create(req, res) {
    const createdProperty = await app.properties.create(
      req.body,
      req,
      req.files
    );
    res.status(201).json(createdProperty);
  }

  /**
   * @api {put} /api/v1/properties/:propertyId
   * @apiName update
   * @apiGroup Property
   *
   */
  async function update(req, res) {
    const updatedProperty = await app.properties.update(
      req.params.propertyId,
      req.body,
      req
    );
    res.status(200).json(updatedProperty);
  }

  /**
   * @api {get} /api/v1/properties/:propertyId
   * @apiName getById
   * @apiGroup Property
   *
   */
  async function getById(req, res) {
    const response = await app.properties.getById(req.params.propertyId, req);
    res.json(response);
  }

  /**
   * @api {stats} /api/v1/properties/stats
   * @apiName stats
   * @apiGroup Result
   *
   */
  async function stats(req, res) {
    const response = await app.properties.stats(req);
    res.status(200).json(response);
  }

  /**
   * @api {delete} /api/v1/properties/:propertyId
   * @apiName destroy
   * @apiGroup Property
   *
   */
  async function destroy(req, res) {
    const deletedProperty = await app.properties.destroy(
      req.params.propertyId,
      req
    );
    res.status(200).json({ property: deletedProperty });
  }

  return Object.freeze({
    getAll: asyncMiddleware(getAll),
    get: asyncMiddleware(get),
    create: asyncMiddleware(create),
    update: asyncMiddleware(update),
    getById: asyncMiddleware(getById),
    stats: asyncMiddleware(stats),
    getRegions: asyncMiddleware(getRegions),
    destroy: asyncMiddleware(destroy),
  });
};
