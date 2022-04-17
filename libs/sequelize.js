const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/models');

const options = {
  dialect: 'postgres',
  logging: config.isProd ? false : true,
}

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}

const DB_URL = config.isProd ?
  `postgres://${config.dbUsername}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}?sslmode=no-verify` :
  config.dbUrl

const sequelize = new Sequelize(DB_URL, options);

setupModels(sequelize);

module.exports = sequelize;
