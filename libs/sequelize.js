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

  console.log('Test db url');
  console.log(`postgres://${db.USERNAME}:${db.PASSWORD}@${db.HOSTNAME}:${db.PORT}/${db.DATABASE}`);
}

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

module.exports = sequelize;
