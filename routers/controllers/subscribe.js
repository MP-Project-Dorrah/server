const subscribeModel = require("./../../db/models/subscribe");
const userModel = require("./../../db/models/user");
const propertyModel = require("./../../db/models/property");
const stripe = require("stripe")(process.env.KEY);
const cron = require("node-cron");
const schedule = require("node-schedule");

const payment = async (req, res) => {
  let { amount, id, userId, startDate, endDate, paymentMethod } = req.body;
  const day = startDate.toString().slice(5, 7);

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "subscribe",
      payment_method: id,
      confirm: true,
    });
    await userModel.findOneAndUpdate(
      { _id: userId },
      { subscribeStatus: "active" }
    );
    const resultt = await subscribeModel.findOne({ seller: userId });
    if (resultt) {
      await subscribeModel.findOneAndUpdate(
        { seller: userId },
        { isActive: true, startDate, endDate }
      );
      await propertyModel
        .updateMany({ postedBy: userId }, { isSellerSub: true })
        .catch((err) => {
          return res.status(400).json(err);
        });
    } else {
      const newSubscribe = new subscribeModel({
        seller: userId,
        amount,
      });

      newSubscribe.save().exec();
    }

    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    await userModel
      .findOneAndUpdate({ _id: userId }, { subscribeStatus: "unActive" })
      .catch((err) => {
        return res.status(400).json(err);
      });
    await subscribeModel
      .findOneAndUpdate({ seller: userId }, { isActive: false })
      .catch((err) => {
        return res.status(400).json(err);
      });
    await propertyModel
      .updateMany({ postedBy: userId }, { isSellerSub: false })
      .catch((err) => {
        return res.status(400).json(err);
      });

    res.json({
      message: "Payment failed",
      success: false,
    });
  }
};

const cancelPayment = async (req, res) => {
  const { userId } = req.body;
  await userModel
    .findOneAndUpdate({ _id: userId }, { subscribeStatus: "cancelPending" })
    .catch((err) => {
      return res.status(400).json(err);
    });
  const resulttt = await subscribeModel.findOne({ seller: userId });
  const date = resulttt.endDate;
  schedule.scheduleJob(date, async () => {
    await userModel
      .findOneAndUpdate({ _id: userId }, { subscribeStatus: "unActive" })
      .catch((err) => {
        return res.status(400).json(err);
      });
    await subscribeModel
      .findOneAndUpdate({ seller: userId }, { isActive: false })
      .catch((err) => {
        return res.status(400).json(err);
      });
    await propertyModel
      .updateMany({ postedBy: userId }, { isSellerSub: false })
      .catch((err) => {
        return res.status(400).json(err);
      });
  });
  res.status(200).json("done");
};

const getOneSubscribe = (req, res) => {
  const { userId } = req.params;
  subscribeModel
    .find({ seller: userId })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { payment, cancelPayment, getOneSubscribe };
