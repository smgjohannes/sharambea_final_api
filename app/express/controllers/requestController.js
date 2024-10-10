const asyncMiddleware = require('../middleware/asyncMiddleware');
const requestService = require('../../services/request/index');

module.exports = function requestController(app) {
  /**
   * @api {get} /api/v1/requests
   * @apiName get
   * @apiGroup Request
   */
  async function get(req, res) {
    const response = await app.requests.get(req.query);
    res.json(response);
  }

  /**
   * @api {post} /api/v1/requests
   * @apiName create
   * @apiGroup Request
   */
  async function create(req, res) {
    const createdRequest = await app.requests.create(req.body, req, req.files);
    res.status(201).json(createdRequest);
  }

  /**
   * @api {get} /api/v1/requests/:id
   * @apiName getById
   * @apiGroup Request
   */
  async function getById(req, res) {
    const response = await app.requests.getById(req.params.id);
    res.json(response);
  }

  /**
   * @api {patch} /api/v1/requests/:id
   * @apiName update
   * @apiGroup Request
   */
  async function update(req, res) {
    const updatedRequest = await requestService.update(
      req.params.id,
      req.body,
      req
    );
    res.status(200).json(updatedRequest);
  }

  /**
   * @api {delete} /api/v1/requests/:id
   * @apiName destroy
   * @apiGroup Request
   */
  async function destroy(req, res) {
    const { id } = req.params;
    const deletedRequest = await app.requests.destroy(id);
    res.status(200).json({ request: deletedRequest });
  }

  return Object.freeze({
    getAll: asyncMiddleware(get),
    get: asyncMiddleware(get),
    create: asyncMiddleware(create),
    update: asyncMiddleware(update),
    getById: asyncMiddleware(getById),
    destroy: asyncMiddleware(destroy),
  });
};
