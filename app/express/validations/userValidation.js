const Joi = require('joi');
const validateRequest = require('../middleware/validateRequest');

exports.loginSchema = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
  });
  validateRequest(req, next, schema);
};

exports.updateUserSchema = (req, res, next) => {
  const schemaRules = {
    name: Joi.string().empty(''),
    email: Joi.string().email().empty(''),
    phone: Joi.string().empty(''),
    address: Joi.string().empty(''),
    city: Joi.string().empty(''),
    state: Joi.string().empty(''),
    country: Joi.string().empty(''),
  };

  // only super admins can update role
  if (req.user.role === 'superadmin') {
    schemaRules.role = Joi.string().valid('admin', 'user').empty('');
  }

  const schema = Joi.object(schemaRules);
  validateRequest(req, next, schema);
};

exports.updatePasswordSchema = (req, res, next) => {
  const schema = Joi.object({
    currentPassword: Joi.string().min(8).required(),
    password: Joi.string().min(8).required(),
    passwordRepeat: Joi.string().valid(Joi.ref('password')).required(),
  });
  validateRequest(req, next, schema);
};
