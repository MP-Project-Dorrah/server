const express = require("express");
const appointmentRouter = express.Router();

const { createAppointment  , cancelAppointment  , getUserAppointments} = require("./../controllers/appointment");

appointmentRouter.post("/create", createAppointment);
appointmentRouter.put("/cancel", cancelAppointment);
appointmentRouter.get("/:user", getUserAppointments);

module.exports = appointmentRouter;
