const express = require('express');
const passport = require('passport');
const upload = require('multer')()

const boom = require("@hapi/boom");
const { cloudinary } = require('../utils/cloudinary/index')

const router = express.Router();

router.post('/image',
  upload.any(),
  async (req, res, next) => {
    try {
      const fileStr = req.body.image;
      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: 'mediconect',
      });
      console.log(uploadResponse);
      res.json(uploadResponse);
    } catch (err) {
      console.error(err)
      throw boom.clientTimeout('No se pudo cargar la imagen');
    }
  }
);

module.exports = router

