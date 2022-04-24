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
      include: ['rfidReader']
    });
    return rta;
  }

  async findByOwnerDoctorId(ownerDoctorId) {
    const rta = await models.RfidReader.findOne({
      where: { ownerDoctorId }
    });
    if (!rta) {
      throw boom.notFound('RfidReader not found');
    }
    return rta;
  }

  async findOne(id) {
    const rfidReader = await models.RfidReader.findByPk(id);
    if (!rfidReader) {
      throw boom.notFound('RfidReader not found');
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
