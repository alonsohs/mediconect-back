'use strict';

const { DOCTOR_TABLE } = require('./../models/doctor.model');
const { USER_TABLE } = require("../models/user.model");
const { RFID_READER_TABLE } = require('../models/rfidReader.model')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(DOCTOR_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      professionalId: {
        allowNull: false,
        unique: true,
        type: Sequelize.DataTypes.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      fathers_lastname: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      mothers_lastname: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      date_of_birth: {
        allowNull: false,
        type: Sequelize.DataTypes.DATEONLY
      },
      phone: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
      isActive: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true,
      },
      userId: {
        field: 'user_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
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
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      locationName: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      doctorId: {
        field: 'doctor_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: DOCTOR_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      isActive: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
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
