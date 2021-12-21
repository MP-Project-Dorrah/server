const express = require("express");
const subscribeRouter = express.Router();

const { payment, cancelPayment } = require("./../controllers/subscribe");

subscribeRouter.post("/payment", payment);
subscribeRouter.put("/delete", cancelPayment);

module.exports = subscribeRouter;
