const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class RfidReadService {
  constructor() {}

  async create(data) {
    return models.RfidRead.create(data);
  }

  async find() {
    const rta = await models.RfidRead.findAll();
    return rta;
  }

  async findByReadingLogId(readingLogId) {
    const rfidRead = await models.RfidRead.findAll({
      where: {
        readingLogId
      },
    });
    if (!rfidRead) {
      throw boom.notFound('Rfid read not found');
    }
    return rfidRead;
  }
  
  async findOne(id) {
    const rfidRead = await models.RfidRead.findByPk(id);
    if (!rfidRead) {
      throw boom.notFound('Rfid read not found');
    }
    return rfidRead;
  }

  async update(id, changes) {
    const rfidRead = await this.findOne(id);
    const rta = await rfidRead.update(changes);
    return rta;
  }

  async delete(id) {
    const rfidRead = await this.findOne(id);
    await rfidRead.destroy();
    return { id };
  }
}

module.exports = RfidReadService
