const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('./../libs/sequelize');

class RfidReaderService {
  constructor() {}

  async create(data) {
    const newRfidReader = await models.RfidReader.create(data)
    return newRfidReader
  }

  async find() {
    const rta = await models.RfidReader.findAll({
      include: ['doctor']
    });
    return rta;
  }

  async findByOwnerDoctorId(doctorId) {
    const rta = await models.RfidReader.findOne({
      where: { doctorId },
      include: ['doctor']
    });
    if (!rta) {
      throw boom.notFound('Rfid reader not found');
    }
    return rta;
  }

  async findByUserId(userId) {
    const rta = await models.RfidReader.findOne({
      where: {
        '$doctor.user.id$': userId
      },
      include: [
        {
          association: 'doctor',
          include: ['user']
        }
      ]
    });
    if (!rta) {
      throw boom.notFound('Rfid reader not found');
    }
    return rta;
  }

  async findOne(id) {
    const rfidReader = await models.RfidReader.findByPk(id, {
      include: ['doctor']
    });
    if (!rfidReader) {
      throw boom.notFound('Rfid reader not found');
    }
    return rfidReader;
  }

  async update(id, changes) {
    const rfidReader = await this.findOne(id);
    const rta = await rfidReader.update(changes);
    return rta;
  }

  async delete(id) {
    const rfidReader = await this.findOne(id);
    await rfidReader.destroy();
    return { id };
  }
}

module.exports = RfidReaderService
