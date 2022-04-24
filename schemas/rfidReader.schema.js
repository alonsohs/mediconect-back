const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string()
const locationName = Joi.string()
const doctorId = Joi.number().integer()
const isActive = Joi.boolean()

const createRfidReaderSchema = Joi.object({
  name: name.required(),
  locationName: locationName.required(),
  doctorId: doctorId.required()
})

const updateRfidReaderSchema = Joi.object({
  name,
  locationName,
  doctorId,
  isActive
})

const getRfidReaderSchema = Joi.object({
  id: id.required(),
})

module.exports = { createRfidReaderSchema, updateRfidReaderSchema, getRfidReaderSchema }
