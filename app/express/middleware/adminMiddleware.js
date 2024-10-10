const { Error403 } = require('../../utils/httpErrors');
const { USER_ROLE } = require('../../utils/constants');

module.exports = function adminMiddleware(req, res, next) {
  if (
    (req.user && req.user.role === USER_ROLE.ADMIN) ||
    req.user.role === USER_ROLE.SUPERADMIN
  ) {
    next();
  } else {
    throw new Error403('You do not have permission to perform this action.');
  }
};
