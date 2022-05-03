const Joi = require('joi')

const id = Joi.number().integer()
const professionalId = Joi.string().alphanum()
const name = Joi.string()
const fathers_lastname = Joi.string()
const mothers_lastname = Joi.string()
const date_of_birth = Joi.date().max('now')
const phone = Joi.string()
const profileImage = Joi.string()
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
  profileImage,
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
  profileImage,
  isActive
})

const getDoctorSchema = Joi.object({
  id: id.required(),
})

module.exports = { createDoctorSchema, updateDoctorSchema, getDoctorSchema }
