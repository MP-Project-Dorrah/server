const appointmentModel = require("./../../db/models/appointment");
const userModel = require("./../../db/models/user");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
require("dotenv").config();

const sendAppointmentMessage = async (req, res) => {
  const { sellerId, AgentId, buyerNumber, PropertyLocation, type, date } =
    req.body;

  const result1 = await userModel.findById(sellerId);

  if (result1) {
    console.log(result1, "result1");
    const transporter = nodemailer.createTransport(
      sendgridTransport({
        auth: {
          api_key: process.env.ApiKey,
        },
      })
    );
    // console.log(result1, "result1");
    const mailOptions = {
      from: "perfectviewwebsite@gmail.com",
      to: result1.email,
      subject: "New Appointment",
      text:
        "Hello " +
        result1.username +
        ",\n\n" +
        "you have an appointment at : " +
        date +
        " - " +
        type +
        ",\n\n" +
        "in this location :" +
        PropertyLocation +
        "\n\nThank You!\n" +
        " Buyer Number : " +
        buyerNumber,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        return res.status(500).json(err);
      }
    });
  }
  if (AgentId) {
    const result2 = await userModel.findById(AgentId);
    if (result2) {
      console.log(result2, "result2");
      const transporter = nodemailer.createTransport(
        sendgridTransport({
          auth: {
            api_key: process.env.ApiKey,
          },
        })
      );
      const mailOptions = {
        from: "perfectviewwebsite@gmail.com",
        to: result2.email,
        subject: "New Appointment",
        text:
          "Hello " +
          result2.username +
          ",\n\n" +
          "you have an appointment at : " +
          date +
          " - " +
          type +
          ",\n\n" +
          "at this location :" +
          PropertyLocation +
          "\n\nThank You!\n" +
          " Buyer Number : " +
          buyerNumber,
      };

      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(200).json("done");
      });
    }
  } else {
    res.status(200).json("done");
  }
};

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

module.exports = {
  createAppointment,
  cancelAppointment,
  getUserAppointments,
  sendAppointmentMessage,
};
