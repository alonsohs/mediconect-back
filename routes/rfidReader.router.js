const express = require('express')
const passport = require('passport')
const RfidReaderService = require('../services/rfidReader.service')
const validationHandler = require('../middlewares/validator.handler')
const {
  createRfidReaderSchema,
  getRfidReaderSchema,
  updateRfidReaderSchema
} = require('../schemas/rfidReader.schema')
const { checkRoles } = require("../middlewares/auth.handler");

const router = express.Router()
const service = new RfidReaderService()

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

router.get('/:ownerDoctorId/doctorId',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'doctor'),
  async (req, res, next) => {
    try {
      const { ownerDoctorId } = req.params;
      res.json(await service.findByOwnerDoctorId(ownerDoctorId));
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'doctor'),
  validationHandler(createRfidReaderSchema, 'body'),
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
  validationHandler(getRfidReaderSchema, 'params'),
  validationHandler(updateRfidReaderSchema, 'body'),
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
  validationHandler(getRfidReaderSchema, 'params'),
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
