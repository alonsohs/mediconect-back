const Joi = require('joi')

const id = Joi.number().integer()
const curp = Joi.string().alphanum().min(18).max(18)
const name = Joi.string()
const fathers_lastname = Joi.string()
const mothers_lastname = Joi.string()
const date_of_birth = Joi.date().max('now')
const gender = Joi.string().valid('Masculino', 'Femenino')
const phone = Joi.string()
const profileImage = Joi.string()
const isActive = Joi.boolean()
const rfId = Joi.string().alphanum()
const address = Joi.string()
const bandColor = Joi.string()

const email = Joi.string().email()
const password =  Joi.string()


const createPatientSchema = Joi.object({
  curp: curp.required(),
  name: name.required(),
  fathers_lastname: fathers_lastname.required(),
  mothers_lastname: mothers_lastname.required(),
  date_of_birth: date_of_birth.required(),
  gender: gender.required(),
  phone,
  profileImage,
  rfId: rfId.required(),
  address,
  bandColor,
  user: Joi.object({
    email: email.required(),
    password: password.required()
  })
})

const updatePatientSchema = Joi.object({
  curp,
  name,
  fathers_lastname,
  mothers_lastname,
  date_of_birth,
  gender,
  phone,
  profileImage,
  rfId,
  address,
  bandColor,
  isActive
})

const getPatientSchema = Joi.object({
  id: id.required(),
})

module.exports = { createPatientSchema, updatePatientSchema, getPatientSchema }
