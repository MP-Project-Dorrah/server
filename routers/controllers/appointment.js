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

module.exports = { createAppointment };
