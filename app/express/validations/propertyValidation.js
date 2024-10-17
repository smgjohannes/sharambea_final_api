const Joi = require('joi');
const validateRequest = require('../middleware/validateRequest');

exports.createSchema = (req, res, next) => {
  const schema = Joi.object({
    property_name: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    land_size: Joi.string().optional().allow(null),
    flatlet: Joi.string().optional().allow(null),
    monthly_rates: Joi.number().optional().allow(null, ''),
    monthly_levy: Joi.number().optional().allow(null, ''),
    bedrooms: Joi.number().optional().allow(null, ''),
    bathrooms: Joi.number().optional().allow(null, ''),
    kitchens: Joi.number().optional().allow(null),
    dining_rooms: Joi.number().optional().allow(null),
    sitting_rooms: Joi.number().optional().allow(null, ''),
    toilets: Joi.number().optional().allow(null, ''),
    description: Joi.string().optional(),
    category: Joi.string()
      .valid(
        'house',
        'apartment/flat',
        'farm',
        'vacant land/plot',
        'townhouse',
        'industrial property',
        'commercial property'
      )
      .optional(),
    image: Joi.any().optional(),
    additionalImages: Joi.any().optional(),
    property_type: Joi.string().valid('rent', 'buy', 'sell').required(),
    house_number: Joi.string().optional().allow(null, ''),
    street_name: Joi.string().optional().allow(null, ''),
    suburb: Joi.string().optional().allow(null, ''),
    town: Joi.string().optional().allow(null, ''),
    region: Joi.string().optional().allow(null, ''),
    outside_building: Joi.boolean()
      .truthy('true')
      .truthy('1')
      .falsy('false')
      .falsy('0')
      .optional(),
    kitchenette: Joi.boolean()
      .truthy('true')
      .truthy('1')
      .falsy('false')
      .falsy('0')
      .optional(),
    parking: Joi.boolean()
      .truthy('true')
      .truthy('1')
      .falsy('false')
      .falsy('0')
      .optional(),
  });

  validateRequest(req, next, schema);
};

exports.updateSchema = (req, res, next) => {
  const schema = Joi.object({
    property_name: Joi.string().optional(),
    name: Joi.string().optional(),
    price: Joi.number().optional(),
    land_size: Joi.string().optional().allow(null),
    flatlet: Joi.string().optional().allow(null),
    monthly_rates: Joi.number().optional().allow(null, ''),
    monthly_levy: Joi.number().optional().allow(null, ''),
    bedrooms: Joi.number().optional().allow(null),
    bathrooms: Joi.number().optional().allow(null),
    kitchens: Joi.number().optional().allow(null),
    dining_rooms: Joi.number().optional().allow(null),
    sitting_rooms: Joi.number().optional().allow(null, ''),
    toilets: Joi.number().optional().allow(null, ''),
    description: Joi.string().optional().allow(null, ''),
    category: Joi.string()
      .valid(
        'house',
        'apartment/flat',
        'farm',
        'vacant land/plot',
        'townhouse',
        'industrial property',
        'commercial property'
      )
      .optional(),
    image: Joi.any().optional(),
    additionalImages: Joi.any().optional().allow(null),
    property_type: Joi.string().valid('rent', 'buy', 'sell').optional(),
    house_number: Joi.string().optional().allow(null),
    street_name: Joi.string().optional().allow(null),
    suburb: Joi.string().optional().allow(null),
    town: Joi.string().optional().allow(null),
    region: Joi.string().optional().allow(null),
    outside_building: Joi.boolean()
      .truthy('true')
      .truthy('1')
      .falsy('false')
      .falsy('0')
      .optional(),
    kitchenette: Joi.boolean()
      .truthy('true')
      .truthy('1')
      .falsy('false')
      .falsy('0')
      .optional(),
    parking: Joi.boolean()
      .truthy('true')
      .truthy('1')
      .falsy('false')
      .falsy('0')
      .optional(),
  });

  validateRequest(req, next, schema);
};
