const express = require("express");
const subscribeRouter = express.Router();

const { payment, cancelPayment  , getOneSubscribe} = require("./../controllers/subscribe");

subscribeRouter.post("/payment", payment);
subscribeRouter.put("/delete", cancelPayment);
subscribeRouter.get("/:userId", getOneSubscribe); /////

module.exports = subscribeRouter;
