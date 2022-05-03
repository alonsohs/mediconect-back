const { config } = require('../../config/config')
const cloudinary = require('cloudinary').v2

const  boom = require('@hapi/boom')

cloudinary.config({
  cloud_name: config.cloudinaryName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret
})

const uploadImageToCloudinary = async (image) => {
  try {
    return await cloudinary.uploader.upload(image, {
      upload_preset: 'mediconect'
    })
  } catch (e) {
    console.error(e)
    throw boom.internal('No se pudo cargar la imagen de perfil');
  }
}

module.exports = { cloudinary, uploadImageToCloudinary }
