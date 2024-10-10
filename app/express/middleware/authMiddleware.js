const asyncMiddleware = require('./asyncMiddleware');
const db = require('../../models');
const { Error401 } = require('../../utils/httpErrors');

module.exports = function AuthMiddleware(scope, app) {
  return asyncMiddleware(async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      let userId;

      // if it's an access token
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7, authHeader.length);

        // we validate the token
        const payload = app.token.validateAccessToken(token, scope);
        userId = payload.user_id;
        req.token_id = payload.token_id;
      } else if (authHeader || req.body.api_key || req.query.api_key) {
        const token = authHeader || req.body.api_key || req.query.api_key;
        // we validate the token
        userId = await app.token.validateApiKey(token, scope);
      } else {
        return next(new Error401('No authorization header or api key found'));
      }

      const user = await db.User.findOne({
        where: { id: userId },
      });

      if (user === null) {
        return next(
          new Error401('The user belonging to this token no longer exist.')
        );
      }

      // GRANT ACCESS TO PROTECTED ROUTE
      req.user = user.toJSON();
      res.locals.user = user.toJSON();

      next();
    } catch (e) {
      console.log(e);
      if (e instanceof Error401) {
        throw e;
      }
      return next(new Error401(e));
    }
  });
};
