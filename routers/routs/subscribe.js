const express = require("express");
const subscribeRouter = express.Router();
const authentication = require("./../middleWhere/authentication");

const {
  payment,
  cancelPayment,
  getOneSubscribe,
} = require("./../controllers/subscribe");

subscribeRouter.post("/payment", authentication, payment);
subscribeRouter.put("/delete", authentication, cancelPayment);
subscribeRouter.get("/:userId", authentication, getOneSubscribe); /////

module.exports = subscribeRouter;
