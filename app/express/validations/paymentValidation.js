const Joi = require('joi');
const validateRequest = require('../middleware/validateRequest');

exports.createSchema = (req, res, next) => {
  const schema = Joi.object({
    memberId: Joi.string().optional(),
    reference: Joi.string().required(),
    account: Joi.string()
      .valid(
        'Membership',
        'Pastoral Fund',
        'Contribution',
        'Building Fund',
        'Tithe',
        'Offering'
      )
      .required(),
    amount: Joi.number().positive().required(),
    date: Joi.date().iso().required(),
  });

  validateRequest(req, next, schema);
};

exports.updateSchema = (req, res, next) => {
  const schema = Joi.object({
    memberId: Joi.string().uuid().optional(),
    reference: Joi.string().optional(),
    account: Joi.string()
      .valid(
        'Membership',
        'Pastoral Fund',
        'Contribution',
        'Building Fund',
        'Tithe',
        'Offering'
      )
      .optional(),
    amount: Joi.number().positive().optional(),
    date: Joi.date().iso().optional(),
  }).min(1); // At least one field is required for update

  validateRequest(req, next, schema);
};
