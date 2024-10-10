const Joi = require('joi');
const validateRequest = require('../middleware/validateRequest');

exports.listPropertySchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    price: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
    category_type: Joi.string()
      .valid('house', 'apartment', 'hotel', 'villa', 'office')
      .optional(),
    property_type: Joi.string()
      .valid('rent', 'sell', 'buy', 'comercial')
      .required(),
    images: Joi.array().items(Joi.any()),

    proof_of_funds: Joi.when('property_type', {
      is: 'buy',
      then: Joi.any().optional().label('Proof of Funds'),
      otherwise: Joi.forbidden(),
    }),
    pre_approval: Joi.when('property_type', {
      is: 'buy',
      then: Joi.any().optional().label('Pre-Approval'),
      otherwise: Joi.forbidden(),
    }),
    date_of_moving: Joi.when('property_type', {
      is: 'rent',
      then: Joi.date().optional().label('Date of Moving'),
      otherwise: Joi.forbidden(),
    }),
    looking_for: Joi.when('property_type', {
      is: 'rent',
      then: Joi.string()
        .valid('flat', 'bachelor')
        .optional()
        .label('What Kind of Property You Are Looking For'),
      otherwise: Joi.forbidden(),
    }),
  });

  validateRequest(req, next, schema);
};
