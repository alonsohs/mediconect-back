const express = require('express');

const validatorHandler = require('./../middlewares/validator.handler');
const passport = require("passport");
const {checkRoles} = require("../middlewares/auth.handler");

const PatientService = require('./../services/patient.service');
const RfidReadService = require('./../services/rfidRead.service');
const { postRfidSchema } = require('./../schemas/rfid.schema');

const router = express.Router();

const patientService = new PatientService();
const rfidReadService = new RfidReadService()


router.post('/read',
  passport.authenticate('jwt', {session: false}),
  checkRoles( 'rfid_reader'),
  validatorHandler(postRfidSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = req.user
      const { sub } = user
      const body = req.body
      const { rfId } = body

      //TODO: Emit event to socket connection
      const patient = await patientService.findByRFID(rfId)

      // Save to reading log
      const rfidRead = await rfidReadService.create({
        rfId: rfId,
        patientId: patient.dataValues.id,
        rfidReaderId: sub,
      })

      res.status(200).json({
        patient,
        rfid_read_id: rfidRead.dataValues.id
      });
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
