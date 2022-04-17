const { Pool } = require('pg');

const { config } = require('./../config/config');


const DB_URL = config.isProd ?
  `postgres://${config.dbUsername}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}?sslmode=no-verify` :
  config.dbUrl

const options = {
  connectionString: DB_URL
};

if (config.isProd) {
  options.ssl =  {
    rejectUnauthorized: false
  };
}

const pool = new Pool(options);

module.exports = pool;
