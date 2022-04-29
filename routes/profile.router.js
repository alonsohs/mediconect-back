const express = require('express');
const passport = require('passport');

const DoctorService = require('../services/doctor.service')
const PatientService = require('../services/patient.service')

const router = express.Router();

const doctorService = new DoctorService()
const patientService = new PatientService()

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


module.exports = router;
