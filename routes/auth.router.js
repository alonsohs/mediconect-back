const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { config } = require('./../config/config');

const DoctorService = require('../services/doctor.service')

const router = express.Router();

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
        role: user.role
      }
      const token = jwt.sign(payload, config.jwtSecret);
      res.json({
        user,
        token
      });
    } catch (error) {
      next(error);
    }
  }
);

const doctorService = new DoctorService()

router.post('/login/rfid-reader',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      if (user.role !== 'doctor') {
        res.status(401).json({
          message: "Not a valid account"
        })
      }

      const doctor = await doctorService.findByUserId(user.id)

      if (!doctor.hasRfidReader) {
        res.status(403).json({
          message: "There is no RFID reader linked to this account"
        })
      }

      const payload = {
        sub: doctor.rfid_reader.id,
        doctorId: doctor.id,
        role: 'rfid_reader'
      }
      const token = jwt.sign(payload, config.jwtSecret);
      res.json({
        rfid_reader: doctor.rfid_reader,
        token
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
