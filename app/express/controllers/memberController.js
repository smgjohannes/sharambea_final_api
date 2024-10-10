const asyncMiddleware = require('../middleware/asyncMiddleware');
const memberService = require('../../services/member/member.update');

module.exports = function memberController(app) {
  /**
   * @api {get} /api/v1/members
   * @apiName get
   * @apiGroup member
   *
   */
  async function get(req, res) {
    const response = await app.members.get(req.query);
    res.json(response);
  }

  /**
   * @api {member} /api/v1/members
   * @apiName create
   * @apiGroup member
   *
   */
  async function create(req, res) {
    const createdMember = await app.members.create(req.body, req, req.files);
    res.json(createdMember).status(201);
  }

  /**
   * @api {member} /api/v1/members/:id
   * @apiName update
   * @apiGroup member
   *
   */
  async function update(req, res) {
    const updatedMember = await memberService.update(
      req.params.id,
      req.body,
      req
    );
    res.status(200).json(updatedMember);
  }

  /**
   * @api {get} /api/v1/members/:id
   * @apiName getById
   * @apiGroup member
   *
   */
  async function getById(req, res) {
    const response = await app.members.getById(req.params.id);
    res.json(response);
  }

  /**
   * @api {delete} /api/v1/members/:id
   * @apiName destroy
   * @apiGroup Result
   *
   */
  async function destroy(req, res) {
    const { id } = req.params;

    const deletedMember = await app.members.destroy(id, res);
    res.status(200).json({ member: deletedMember });
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
