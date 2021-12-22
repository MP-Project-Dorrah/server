const express = require("express");
const appointmentRouter = express.Router();

const { createAppointment } = require("./../controllers/appointment");

appointmentRouter.post("/create", createAppointment);

module.exports = appointmentRouter;
