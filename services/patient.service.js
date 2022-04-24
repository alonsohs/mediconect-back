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

  async findByRFID(rfId) {
    const rta = await models.Patient.findOne({
      where: { rfId }
    });
    if (!rta) {
      throw boom.notFound('Patient not found');
    }
    return rta;
  }

  async findOnePatient(id) {
    const patient = await models.Patient.findByPk(id);
    if (!patient) {
      throw boom.notFound('Patient not found');
    }
    return patient;
  }

  async update(id, changes) {
    const patient = await this.findOnePatient(id);
    const rta = await patient.update(changes);
    return rta;
  }

  async delete(id) {
    const patient = await this.findOnePatient(id);
    await patient.destroy();
    return { id };
  }
}

module.exports = PatientService
