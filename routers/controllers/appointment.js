const appointmentModel = require("./../../db/models/appointment");

const createAppointment = (req, res) => {
  const { client, onProperty, propertyPostedBy, realestateAgent, type, date } =
    req.body;
  if (!realestateAgent) {
    const newAppointment = new appointmentModel({
      client,
      onProperty,
      propertyPostedBy,
      type,
      date,
    });
    newAppointment
      .save()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    const newAppointment = new appointmentModel({
      client,
      onProperty,
      realestateAgent,
      propertyPostedBy,
      type,
      date,
    });
    newAppointment
      .save()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
};

const cancelAppointment = (req, res) => {
  const { _id } = req.body;
  appointmentModel.findById({ _id }).then((result) => {
    appointmentModel.updateOne(
      { _id },
      { isCanceled: true },
      { new: true },
      (err) => {
        if (err) return res.status(400).json(err);
      }
    );
    res.status(200).json(result);
  });
};

module.exports = { createAppointment, cancelAppointment };
