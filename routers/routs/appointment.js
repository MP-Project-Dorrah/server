const express = require("express");
const appointmentRouter = express.Router();

const { createAppointment  , cancelAppointment  , getUserAppointments , sendAppointmentMessage} = require("./../controllers/appointment");

appointmentRouter.post("/create", createAppointment);
appointmentRouter.put("/cancel", cancelAppointment);
appointmentRouter.get("/:user", getUserAppointments);
appointmentRouter.post("/send", sendAppointmentMessage);


module.exports = appointmentRouter;
