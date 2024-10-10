const asyncMiddleware = require('../middleware/asyncMiddleware');
const { BadParameters } = require('../../utils/coreErrors');
const filterObj = require('../../utils/filterObj');

const LOGIN_TOKEN_VALIDITY_IN_SECONDS = 30 * 24 * 60 * 60;

module.exports = function UserController(app) {
  /**
   * @api {get} /api/v1/user/login login user
   * @apiName login
   * @apiGroup User
   *
   */
  async function login(req, res) {
    try {
      const user = await app.users.login(req.body);
      const scope = req.body.scope || [
        'post:write',
        'post:read',
        'post:delete',
      ];
      const token = await app.token.create(
        user.id,
        scope,
        LOGIN_TOKEN_VALIDITY_IN_SECONDS,
        req.headers['user-agent']
      );
      res.json({ success: true, token, user });
    } catch (error) {
      res.status(401).json({ success: false, message: error.message });
    }
  }

  /**
   * @api {get} /api/v1/user getUsers
   * @apiName getUsers
   * @apiGroup User
   *
   */
  async function getUsers(req, res, next) {
    const options = req.query;
    if (options.fields) {
      options.fields = options.fields.split(',');
    }
    const users = await app.users.get(options);
    res.json(users);
  }

  /**
   * @api {get} /api/v1/user/:id getUserById
   * @apiName getUserById
   * @apiGroup User
   *
   */
  async function getUserById(req, res) {
    const user = await app.users.getById(req.params.id);
    res.json(user);
  }

  /**
   * @api {patch} /api/v1/user/:user_selector updateUser
   * @apiName updateUser
   * @apiGroup User
   *
   */
  async function updateUser(req, res) {
    const user = await app.users.update(
      req.params.id,
      req.body,
      req.headers['user-agent']
    );
    res.json(user);
  }

  /**
   * @api {delete} /api/v1/user/:id deleteUser
   * @apiName deleteUser
   * @apiGroup User
   *
   */
  async function deleteUser(req, res) {
    if (req.user.id === req.params.id) {
      throw new BadParameters('You cannot delete yourself');
    }
    const response = await app.users.destroy(req.params.id);
    res.json(response);
  }

  /**
   * @api {get} /api/v1/me getMe
   * @apiName getMe
   * @apiGroup User
   *
   */
  async function getMe(req, res) {
    const user = await app.users.getById(req.user.id);
    res.json(user);
  }

  /**
   * @api {patch} /api/v1/me updateMe
   * @apiName updateMe
   * @apiGroup User
   *
   */
  async function updateMe(req, res) {
    // 1) create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
      throw new BadParameters(
        'This route is not for password update. Please use /update-password.'
      );
    }

    // 2)create error if user is trying to change their user role
    if (req.body.role) {
      throw new BadParameters('Action not permitted! Role cannot be changed.');
    }

    // Filtered out unwanted fields names that are
    const formData = filterObj(req.body, 'name');

    const response = await app.users.update(req.user.id, formData);
    res.json(response);
  }

  /**
   * @api {patch} /api/v1/me/updatePassword
   * @apiName updatePassword
   * @apiGroup User
   *
   */
  async function updatePassword(req, res) {
    const updatePassword = await app.users.updatePassword(
      req.user.id,
      req.body
    );
    await app.token.revoke(req.user.id, req.token_id);
    res.json(updatePassword);
  }

  return Object.freeze({
    login: asyncMiddleware(login),
    getMe: asyncMiddleware(getMe),
    get: asyncMiddleware(getUsers),
    getById: asyncMiddleware(getUserById),
    update: asyncMiddleware(updateUser),
    delete: asyncMiddleware(deleteUser),
    updateMe: asyncMiddleware(updateMe),
    updatePassword: asyncMiddleware(updatePassword),
  });
};
