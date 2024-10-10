const Joi = require('joi');
const validateRequest = require('../middleware/validateRequest');

exports.createSchema = (req, res, next) => {
  const schema = Joi.object({
    id_number: Joi.string().required(),
    name: Joi.string().required(),
    surname: Joi.string().required(),
    date_of_birth: Joi.string().required(),
    age: Joi.string().required(),
    cell_number: Joi.string().required(),
    member_of: Joi.string().required(),
    local_church: Joi.string().required(),
    from_date: Joi.string().required(),
    father: Joi.string().required(),
    mother: Joi.string().required(),
    status: Joi.string().required().valid('active', 'inactive'),
    tags: Joi.array().empty(),
  });
  validateRequest(req, next, schema);
};

exports.updateSchema = (req, res, next) => {
  const schema = Joi.object({
    id_number: Joi.string().optional(),
    name: Joi.string().optional(),
    surname: Joi.string().optional(),
    cell_number: Joi.string().optional(),
    date_of_birth: Joi.string().optional(),
    age: Joi.string().optional(),
    member_of: Joi.string().optional(),
    local_church: Joi.string().optional(),
    from_date: Joi.string().optional(),
    father: Joi.string().optional(),
    mother: Joi.string().optional(),
    status: Joi.string().optional().valid('active', 'inactive'),
  });

  validateRequest(req, next, schema);
};
