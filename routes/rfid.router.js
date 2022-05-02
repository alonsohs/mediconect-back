const PatientService = require('./../services/patient.service');
const RfidReadService = require('./../services/rfidRead.service');

const patientService = new PatientService();
const rfidReadService = new RfidReadService()

async function rfidReadPost(req, res, next, io, socketUsers) {
  try {
    const user = req.user
    const { sub } = user
    const body = req.body
    const { rfId } = body

    const patient = await patientService.findByRFID(rfId)

    // Save to reading log
    const rfidRead = await rfidReadService.create({
      rfId: rfId,
      patientId: patient.dataValues.id,
      rfidReaderId: sub,
    })

    // Emit event to socket connection
    if (sub in socketUsers) {
      io.to(socketUsers[sub]).emit('rfid_read', patient.dataValues)
    }

    res.status(200).json({
      patient,
      rfid_read_id: rfidRead.dataValues.id
    });
  } catch (error) {
    next(error);
  }
}

module.exports = rfidReadPost;
