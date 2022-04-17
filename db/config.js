const { config } = require('./../config/config');

module.exports = {
  development: {
    url: config.dbUrl,
    dialect: 'postgres',
  },
  production: {
    url: `postgres://${config.dbUsername}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}?sslmode=no-verify`,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
}
