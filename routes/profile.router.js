const express = require('express');
const passport = require('passport');

const DoctorService = require('../services/doctor.service')
const PatientService = require('../services/patient.service')
const RfidReaderService = require('../services/rfidReader.service')
const {checkRoles} = require("../middlewares/auth.handler");

const router = express.Router();

const doctorService = new DoctorService()
const patientService = new PatientService()
const rfidReaderService = new RfidReaderService()

router.get('/me',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      const { role } = user
      let service = role === 'patient' ?  patientService : doctorService
      const profile = await service.findByUserId(user.sub)
      res.json(profile)
    } catch (error) {
      next(error);
    }
  }
);

router.get('/my-rfid-reader',
  passport.authenticate('jwt', {session: false}),
  checkRoles('doctor'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const { role } = user
      const rfidReader = await rfidReaderService.findByUserId(user.sub)
      res.json(rfidReader)
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
