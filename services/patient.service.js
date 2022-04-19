const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('./../libs/sequelize');

class PatientService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      curp: data.curp.toUpperCase(),
      user: {
        ...data.user,
        role: "patient",
        password: hash
      }
    }
    const newPatient = await models.Patient.create(newData, {
      include: ['user']
    });
    delete newPatient.dataValues.user.dataValues.password;
    return newPatient;
  }

  async find() {
    const rta = await models.Patient.findAll({
      include: ['user']
    });
    return rta;
  }

  async findByRFID(rfid) {
    const rta = await models.Patient.findAll({
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
