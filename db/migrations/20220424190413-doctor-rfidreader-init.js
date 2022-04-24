'use strict';

const { DOCTOR_TABLE } = require('./../models/doctor.model');
const { USER_TABLE } = require("../models/user.model");
const { RFID_READER_TABLE } = require('../models/rfidReader.model')
const {DataTypes, Sequelize} = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(DOCTOR_TABLE, {
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
    });

    await queryInterface.createTable(RFID_READER_TABLE, {
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
      ownerDoctorId: {
        field: 'owner_doctor_id',
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
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable(DOCTOR_TABLE);
    await queryInterface.dropTable(RFID_READER_TABLE);
  }
};
