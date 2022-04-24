const { User, UserSchema } = require('./user.model');
const { PatientSchema, Patient } = require("./patient.model");
const { DoctorSchema, Doctor} = require('./doctor.model')
const { RfidReaderSchema, RfidReader } = require('./rfidReader.model')

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize))
  Patient.init(PatientSchema, Patient.config(sequelize))
  Doctor.init(DoctorSchema, Doctor.config(sequelize))
  RfidReader.init(RfidReaderSchema, RfidReader.config(sequelize))

  User.associate(sequelize.models)
  Patient.associate(sequelize.models)
  Doctor.associate(sequelize.models)
  RfidReader.associate(sequelize.models)
}

module.exports = setupModels;
