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

const getUserAppointments = async (req, res) => {
  try {
    const { user } = req.params;
    let newArr = [];
    //seller or buyer
    const result1 = await appointmentModel.find({ client: user });
    if (result1.length) {
      const appointment = await appointmentModel
        .find({ client: user })
        .populate("realestateAgent")
        .populate("onProperty")
        .exec();

      newArr = [...newArr, ...appointment];
    }

    const result2 = await appointmentModel.find({ realestateAgent: user });
    // agent
    if (result2.length) {
      const appointment = await appointmentModel
        .find({ realestateAgent: user })
        .populate("onProperty")
        .populate("client")
        .exec();

      newArr = [...newArr, ...appointment];
    }

    res.status(200).json(newArr);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { createAppointment, cancelAppointment, getUserAppointments };
