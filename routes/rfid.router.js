const PatientService = require('./../services/patient.service');
const RfidReadService = require('./../services/rfidRead.service');

const data = require('../db/data')

const patientService = new PatientService();
const rfidReadService = new RfidReadService()

async function rfidReadPost(req, res, next, io) {
  try {
    const user = req.user
    const { sub } = user
    const body = req.body
    const { rfId } = body

    const patient = await patientService.findByRFID(rfId)

    const main_disease = data[patient?.dataValues?.bandColor]

    const newPatient = {
      ...patient.dataValues,
      main_disease
    }

    // Save to reading log
    const rfidRead = await rfidReadService.create({
      rfId: rfId,
      patientId: patient.dataValues.id,
      rfidReaderId: sub,
    })

    // Emit event to socket room connection
    io.sockets.in(sub).emit('rfid_read', newPatient)

    res.status(200).json({
      patient,
      rfid_read_id: rfidRead.dataValues.id
    });
  } catch (error) {
    next(error);
  }
}

module.exports = rfidReadPost;
