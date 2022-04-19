const { Model, DataTypes, Sequelize } = require('sequelize')

const { USER_TABLE } = require('./user.model')

const PATIENT_TABLE = 'patients'

const PatientSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  curp: {
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
  gender: {
    allowNull: false,
    type: DataTypes.STRING
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
  rfId: {
    allowNull: true,
    type: DataTypes.STRING,
    unique: true
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
  hasWristband: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.rfId !== null
    }
  }
}

class Patient extends Model {

  static associate(models) {
    this.belongsTo(models.User, {as: 'user'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PATIENT_TABLE,
      modelName: 'Patient',
      timestamps: false
    }
  }
}

module.exports = { Patient, PatientSchema, PATIENT_TABLE }
