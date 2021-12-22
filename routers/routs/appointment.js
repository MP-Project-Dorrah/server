const express = require("express");
const appointmentRouter = express.Router();

const { createAppointment  , cancelAppointment } = require("./../controllers/appointment");

appointmentRouter.post("/create", createAppointment);
appointmentRouter.put("/cancel", cancelAppointment);

module.exports = appointmentRouter;
