const express = require('express');

const validatorHandler = require('./../middlewares/validator.handler');
const passport = require("passport");
const {checkRoles} = require("../middlewares/auth.handler");

const PatientService = require('./../services/patient.service');
const { postRfidSchema } = require('./../schemas/rfid.schema');

const router = express.Router();
const patientService = new PatientService();


router.post('/read',
  passport.authenticate('jwt', {session: false}),
  checkRoles( 'rfid_reader'),
  validatorHandler(postRfidSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = req.user
      const body = req.body
      const { rfId } = body
      console.log(body)
      //TODO: Save to reading log
      //TODO: Emit event to socket connection
      const patient = await patientService.findByRFID(rfId)
      res.status(200).json(patient);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
