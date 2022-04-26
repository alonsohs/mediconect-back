const express = require('express');

const PatientService = require('./../services/patient.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { postRfidSchema } = require('./../schemas/rfid.schema');
const passport = require("passport");
const {checkRoles} = require("../middlewares/auth.handler");

const router = express.Router();
const patientService = new PatientService();


router.post('/read',
  passport.authenticate('jwt', {session: false}),
  checkRoles( 'doctor'),
  validatorHandler(postRfidSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = req.user
      const body = req.body
      const { rfId } = body
      //TODO: Save to reading log
      //TODO: Emit event to socket connection
      const patient = patientService.findByRFID(rfId)
      res.status(200).json(patient);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
