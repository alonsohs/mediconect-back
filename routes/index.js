const express = require('express');

const usersRouter = require('./users.router');
const authRouter = require('./auth.router');
const patientsRouter = require('./patients.router')
const doctorRouter = require('./doctor.router')
const rfidReaderRouter = require('./rfidReader.router')
const rfidRouter = require('./rfid.router')


function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/auth', authRouter);
  router.use('/patients', patientsRouter)
  router.use('/doctors', doctorRouter)
  router.use('/rfid-readers', rfidReaderRouter)
  router.use('/rfid', rfidRouter)
}

module.exports = routerApi;
