const express = require('express')
const passport = require('passport')
const DoctorService = require('../services/doctor.service')
const validationHandler = require('../middlewares/validator.handler')
const {
  createDoctorSchema,
  getDoctorSchema,
  updateDoctorSchema
} = require('../schemas/doctor.schema')
const { checkRoles } = require("../middlewares/auth.handler");

const router = express.Router()
const service = new DoctorService()

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
  checkRoles('admin', 'rfid_reader'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json(await service.findOne(id));
    } catch (error) {
      next(error);
    }
  });

router.get('/:professionalId/professionalId',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'rfid_reader'),
  async (req, res, next) => {
    try {
      const { professionalId } = req.params;
      res.json(await service.findByProfessionalID(professionalId));
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validationHandler(createDoctorSchema, 'body'),
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
  checkRoles('admin'),
  validationHandler(getDoctorSchema, 'params'),
  validationHandler(updateDoctorSchema, 'body'),
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
  checkRoles('admin'),
  validationHandler(getDoctorSchema, 'params'),
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
