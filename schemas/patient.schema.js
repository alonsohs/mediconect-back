const Joi = require('joi')

const id = Joi.number().integer()
const CURP = Joi.string().alphanum().min(18).max(18).uppercase()
const name = Joi.string()
const fathers_lastname = Joi.string()
const mothers_lastname = Joi.string()
const date_of_birth = Joi.date().max('now')
const gender = Joi.string().allow('Masculino', 'Femenino')
const phone = Joi.number().integer().min(10).max(10)
const isActive = Joi.boolean()
const rfid = Joi.string().alphanum()


const createPatientSchema = Joi.object({
  CURP: CURP.required(),
  name: name.required(),
  fathers_lastname: fathers_lastname.required(),
  mothers_lastname: mothers_lastname.required(),
  date_of_birth: date_of_birth.required(),
  gender: gender.required(),
  phone,
  rfid: rfid.required()
})

const updatePatientSchema = Joi.object({
  CURP,
  name,
  fathers_lastname,
  mothers_lastname,
  date_of_birth,
  gender,
  phone,
  rfid,
  isActive
})

const getPatientSchema = Joi.object({
  id: id.required(),
})

module.exports = { createPatientSchema, updatePatientSchema, getPatientSchema }
