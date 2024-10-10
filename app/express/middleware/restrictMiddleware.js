/**
 * restrictTo
 * @param  {...any} roles
 * @returns
 */
exports.restrictMiddleware = (...roles) => {
  return (req, res, next) => {
    // Roles ['user', 'admin']
    if (!roles.includes(req.user.role)) {
      return next(
        new Error403('You do not have permission to perform this action.')
      );
    }
    next();
  };
};
