const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('./../libs/sequelize');

class DoctorService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        role: "doctor",
        password: hash
      }
    }
    const newDoctor = await models.Doctor.create(newData, {
      include: ['user']
    });
    delete newDoctor.dataValues.user.dataValues.password;
    return newDoctor;
  }

  async find() {
    const rta = await models.Doctor.findAll({
      include: ['rfid_reader']
    });
    return rta;
  }

  async findByProfessionalID(professionalId) {
    const rta = await models.Doctor.findOne({
      where: { professionalId }
    });
    if (!rta) {
      throw boom.notFound('Doctor not found');
    }
    return rta;
  }

  async findOne(id) {
    const doctor = await models.Doctor.findByPk(id, {
      include: ['rfid_reader']
    });
    if (!doctor) {
      throw boom.notFound('Doctor not found');
    }
    return doctor;
  }

  async update(id, changes) {
    const doctor = await this.findOne(id);
    const rta = await doctor.update(changes);
    return rta;
  }

  async delete(id) {
    const doctor = await this.findOne(id);
    await doctor.destroy();
    return { id };
  }
}

module.exports = DoctorService
