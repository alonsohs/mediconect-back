const Joi = require('joi');

const rfId = Joi.string().alphanum().required()

const postRfidSchema = Joi.object({
  rfId
});

module.exports = { postRfidSchema }
