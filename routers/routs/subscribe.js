const express = require("express");
const subscribeRouter = express.Router();

const { payment } = require("./../controllers/subscribe");

subscribeRouter.post("/payment", payment);

module.exports = subscribeRouter;
