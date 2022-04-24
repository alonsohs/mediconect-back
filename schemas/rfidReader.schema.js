const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string()
const locationName = Joi.string()
const isActive = Joi.boolean()

const email = Joi.string().email()
const password =  Joi.string()


const createDoctorSchema = Joi.object({
  professionalId: professionalId.required(),
  name: name.required(),
  fathers_lastname: fathers_lastname.required(),
  mothers_lastname: mothers_lastname.required(),
  date_of_birth: date_of_birth.required(),
  phone,
  user: Joi.object({
    email: email.required(),
    password: password.required()
  })
})

const updateDoctorSchema = Joi.object({
  professionalId,
  name,
  fathers_lastname,
  mothers_lastname,
  date_of_birth,
  phone,
  isActive
})

const getDoctorSchema = Joi.object({
  id: id.required(),
})

module.exports = { createDoctorSchema, updateDoctorSchema, getDoctorSchema }
