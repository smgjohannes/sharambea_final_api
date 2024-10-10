const Joi = require('joi');
const validateRequest = require('../middleware/validateRequest');

exports.sendSchema = (req, res, next) => {
  const schema = Joi.object({
    from_name: Joi.string().required(),
    from_email: Joi.string().email().required(),
    to_name: Joi.string().required(),
    to_email: Joi.string().email().required(),
    subject: Joi.string().required(),
    message: Joi.string().required(),
  });

  validateRequest(req, next, schema);
};

exports.receiveSchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    subject: Joi.string().required(),
    message: Joi.string().required(),
  });
  validateRequest(req, next, schema);
};
