'use strict';

const { PATIENT_TABLE } = require('./../models/patient.model');
const { USER_TABLE } = require("../models/user.model");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(PATIENT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      curp: {
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
      gender: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
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
      rfId: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
        unique: true
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
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable(PATIENT_TABLE);
  }
};
