const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('./../libs/sequelize');

class PatientService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.patient.password, 10);
    const newData = {
      ...data,
      patient: {
        ...data.patient,
        password: hash
      }
    }
    const newPatient = await models.Patient.create(newData, {
      include: ['patient']
    });
    delete newPatient.dataValues.patient.dataValues.password;
    return newPatient;
  }

  async find() {
    const rta = await models.Patient.findAll({
      include: ['patient']
    });
    return rta;
  }

  async findByRFID(rfid) {
    const rta = await models.Patient.findOne({
      where: { rfid }
    });
    return rta;
  }

  async findOne(id) {
    const patient = await models.Patient.findByPk(id);
    if (!patient) {
      throw boom.notFound('Patient not found');
    }
    return patient;
  }

  async update(id, changes) {
    const patient = await this.findOne(id);
    const rta = await patient.update(changes);
    return rta;
  }

  async delete(id) {
    const patient = await this.findOne(id);
    await patient.destroy();
    return { id };
  }
}

module.exports = PatientService
