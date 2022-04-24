const express = require('express')
const passport = require('passport')
const PatientService = require('../services/patient.service')
const validationHandler = require('../middlewares/validator.handler')
const {
  createPatientSchema,
  getPatientSchema,
  updatePatientSchema,
} = require('../schemas/patient.schema')
const { checkRoles } = require("../middlewares/auth.handler");

const router = express.Router()
const service = new PatientService()

router.get('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      res.json(await service.find());
    } catch (error) {
      next(error);
    }
});

router.get('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'doctor'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json(await service.findOne(id));
    } catch (error) {
      next(error);
    }
});

router.get('/:rfid/rfid',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'doctor'),
  async (req, res, next) => {
    try {
      const { rfid } = req.params;
      res.json(await service.findByRFID(rfid));
    } catch (error) {
      next(error);
    }
});

router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'doctor'),
  validationHandler(createPatientSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'doctor'),
  validationHandler(getPatientSchema, 'params'),
  validationHandler(updatePatientSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.status(201).json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'doctor'),
  validationHandler(getPatientSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
