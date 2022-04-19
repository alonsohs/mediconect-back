const { User, UserSchema } = require('./user.model');
const { PatientSchema, Patient } = require("./patient.model");

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize))
  Patient.init(PatientSchema, Patient.config(sequelize))


  User.associate(sequelize.models)
  Patient.associate(sequelize.models)
}

module.exports = setupModels;
