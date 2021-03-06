const { Model, DataTypes, Sequelize } = require('sequelize');
const { PATIENT_TABLE } = require("./patient.model");
const {RFID_READER_TABLE} = require("./rfidReader.model");

const RFID_READS_TABLE = 'rfid_reads';

const RfidReadSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  rfId: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  patientId: {
    field: 'patient_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PATIENT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  rfidReaderId: {
    field: 'rfid_reader_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: RFID_READER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class RfidRead extends Model {
  static associate(models) {
    this.belongsTo(models.RfidReader, {
      as: 'rfid_reader'
    })
    this.belongsTo(models.Patient, {
      as: 'patient'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: RFID_READS_TABLE,
      modelName: 'RfidRead',
      timestamps: false
    }
  }
}


module.exports = { RFID_READS_TABLE, RfidReadSchema, RfidRead }
