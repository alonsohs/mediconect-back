const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class ReadingLogService {
  constructor() {}

  async create(data) {
    return models.ReadingLog.create(data);
  }

  async find() {
    const rta = await models.ReadingLog.findAll({
      include: ['rfid_reader', 'rfid_reads']
    });
    return rta;
  }

  async findByDoctorId(doctorId) {
    const rta = await models.ReadingLog.findOne({
      where: {
        '$rfid_reader.doctorId$': doctorId
      },
      include: ['rfid_reader']
    });
    if (!rta) {
      throw boom.notFound('Reading log not found');
    }
    return rta;
  }

  async findOne(id) {
    const rfidReader = await models.ReadingLog.findByPk(id, {
      include: ['rfid_reader', 'rfid_reads']
    });
    if (!rfidReader) {
      throw boom.notFound('Reading log not found');
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

module.exports = ReadingLogService
