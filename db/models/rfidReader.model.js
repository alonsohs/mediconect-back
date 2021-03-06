const { Model, DataTypes, Sequelize } = require('sequelize');
const { DOCTOR_TABLE } = require("./doctor.model");

const RFID_READER_TABLE = 'rfidReader';

const RfidReaderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  locationName: {
    allowNull: false,
    type: DataTypes.STRING
  },
  doctorId: {
    field: 'doctor_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: DOCTOR_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  isActive: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
}

class RfidReader extends Model {
  static associate(models) {
    this.belongsTo(models.Doctor, {as: 'doctor'});
    this.hasMany(models.RfidRead, {
      as: 'readings_log',
      foreignKey: 'rfidReaderId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: RFID_READER_TABLE,
      modelName: 'RfidReader',
      timestamps: false
    }
  }
}


module.exports = { RFID_READER_TABLE, RfidReaderSchema, RfidReader }
