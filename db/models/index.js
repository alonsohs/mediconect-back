const { User, UserSchema } = require('./user.model');
const { PatientSchema, Patient } = require("./patient.model");
const { DoctorSchema, Doctor} = require('./doctor.model')
const { RfidReaderSchema, RfidReader } = require('./rfidReader.model')
const { ReadingLogSchema, ReadingLog } = require('./readingLog.model')
const { RfidReadSchema, RfidRead } = require('./rfidRead.model')

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize))
  Patient.init(PatientSchema, Patient.config(sequelize))
  Doctor.init(DoctorSchema, Doctor.config(sequelize))
  RfidReader.init(RfidReaderSchema, RfidReader.config(sequelize))
  ReadingLog.init(ReadingLogSchema, ReadingLog.config(sequelize))
  RfidRead.init(RfidReadSchema, RfidRead.config(sequelize))

  User.associate(sequelize.models)
  Patient.associate(sequelize.models)
  Doctor.associate(sequelize.models)
  RfidReader.associate(sequelize.models)
  ReadingLog.associate(sequelize.models)
  RfidRead.associate(sequelize.models)
}

module.exports = setupModels;
