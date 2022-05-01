const { Model, DataTypes, Sequelize } = require('sequelize');
const { RFID_READER_TABLE } = require("./rfidReader.model");

const READING_LOG_TABLE = 'readings_logs';

const ReadingLogSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class ReadingLog extends Model {
  static associate(models) {
    this.belongsTo(models.RfidReader, {
      as: 'rfid_reader'
    })
    this.hasMany(models.RfidRead, {
      as: 'rfid_reads',
      foreignKey: 'readingLogId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: READING_LOG_TABLE,
      modelName: 'ReadingLog',
      timestamps: false
    }
  }
}


module.exports = { READING_LOG_TABLE, ReadingLogSchema, ReadingLog }
