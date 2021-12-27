const express = require("express");
const appointmentRouter = express.Router();
const authentication = require("./../middleWhere/authentication");

const {
  createAppointment,
  cancelAppointment,
  getUserAppointments,
  sendAppointmentMessage,
} = require("./../controllers/appointment");

appointmentRouter.post("/create", createAppointment);
appointmentRouter.put("/cancel", cancelAppointment);
appointmentRouter.get("/:user", getUserAppointments);
appointmentRouter.post("/send", authentication, sendAppointmentMessage);

module.exports = appointmentRouter;
