'use strict';

const {DOCTOR_TABLE} = require("../models/doctor.model");
const {PATIENT_TABLE} = require("../models/patient.model");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(DOCTOR_TABLE, 'profileImage',{
      allowNull: true,
      type: Sequelize.DataTypes.STRING
    });

    await queryInterface.addColumn(PATIENT_TABLE, 'profileImage',{
      allowNull: true,
      type: Sequelize.DataTypes.STRING
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(DOCTOR_TABLE, 'profileImage')
    await queryInterface.removeColumn(PATIENT_TABLE, 'profileImage')
  }
};
