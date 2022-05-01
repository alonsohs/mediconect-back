'use strict';

const { RFID_READS_TABLE } = require("../models/rfidRead.model");
const {RFID_READER_TABLE} = require("../models/rfidReader.model");
const {PATIENT_TABLE} = require("../models/patient.model");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(RFID_READS_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      rfId: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      patientId: {
        field: 'patient_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
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
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: RFID_READER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(RFID_READS_TABLE);
  }
};
