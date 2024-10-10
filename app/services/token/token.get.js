const db = require('../../models');

const DEFAULT_OPTIONS = {
  take: 20,
  skip: 0,
  order_by: 'created_at',
  order_dir: 'desc',
};

const FIELDS = [
  'id',
  'token_type',
  'scope',
  'valid_until',
  'last_seen',
  'revoked',
  'useragent',
  'created_at',
  'updated_at',
];

/**
 * @description Get all tokens
 * @param {string} userId - Id of the user.
 * @param {Object} [options] - Options of the request.
 * @returns {Promise} Resolve with list of tokens.
 * @example
 * app.token.get('70edd65d-2bde-4f54-885b-84e9330db346');
 */
async function get(userId, options) {
  const optionsWithDefault = Object.assign({}, DEFAULT_OPTIONS, options);

  const t = await db.Token.findAll({
    attributes: FIELDS,
    limit: optionsWithDefault.take,
    offset: optionsWithDefault.skip,
    order: [[optionsWithDefault.order_by, optionsWithDefault.order_dir]],
    where: {
      revoked: false,
    },
  });

  const tokens = t.map((v) => {
    const token = v.get({ plain: true });
    token.scope = token.scope.split(',');
    return token;
  });

  return tokens;
}

module.exports = {
  get,
};
