const { User, UserSchema } = require('./user.model');
const { PatientSchema, Patient } = require("./patient.model");
const { DoctorSchema, Doctor} = require('./doctor.model')

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize))
  Patient.init(PatientSchema, Patient.config(sequelize))
  Doctor.init(DoctorSchema, Doctor.config(sequelize))

  User.associate(sequelize.models)
  Patient.associate(sequelize.models)
  Doctor.associate(sequelize.models)
}

module.exports = setupModels;
