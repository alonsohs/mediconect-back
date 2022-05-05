'use strict';

const {PATIENT_TABLE} = require("../models/patient.model");
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(PATIENT_TABLE, 'address',{
      allowNull: true,
      type: Sequelize.DataTypes.STRING
    });
    await queryInterface.addColumn(PATIENT_TABLE, 'bandColor',{
      allowNull: true,
      type: Sequelize.DataTypes.STRING
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(PATIENT_TABLE, 'address')
    await queryInterface.removeColumn(PATIENT_TABLE, 'bandColor')
  }
};
