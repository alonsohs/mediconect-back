const { Model, DataTypes, Sequelize } = require('sequelize')

const { USER_TABLE } = require('./user.model')

const DOCTOR_TABLE = 'doctors'

const DoctorSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  professionalId: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  fathers_lastname: {
    allowNull: false,
    type: DataTypes.STRING
  },
  mothers_lastname: {
    allowNull: false,
    type: DataTypes.STRING
  },
  date_of_birth: {
    allowNull: false,
    type: DataTypes.DATEONLY
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  isActive: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  hasRfidReader: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.rfid_reader !== null
    }
  },
  fullName: {
    field: 'full_name',
    type:DataTypes.VIRTUAL,
    get() {
      return `${this.name} ${this.fathers_lastname} ${this.mothers_lastname}`;
    }
  }
}

class Doctor extends Model {

  static associate(models) {
    this.belongsTo(models.User, {as: 'user'});
    this.hasOne(models.RfidReader, {
      as: 'rfid_reader',
      foreignKey: 'doctorId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DOCTOR_TABLE,
      modelName: 'Doctor',
      timestamps: false
    }
  }
}

module.exports = { Doctor, DoctorSchema, DOCTOR_TABLE }
