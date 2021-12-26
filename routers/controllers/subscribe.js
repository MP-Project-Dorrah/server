const subscribeModel = require("./../../db/models/subscribe");
const userModel = require("./../../db/models/user");
const propertyModel = require("./../../db/models/property");
const stripe = require("stripe")(process.env.KEY);

const payment = async (req, res) => {
  let { amount, id, userId } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "subscribe",
      payment_method: id,
      confirm: true,
    });
    await userModel.findOneAndUpdate({ _id: userId }, { isSub: true });
    const resultt = await subscribeModel.findOne({ seller: userId });
    if (resultt) {
      await subscribeModel.findOneAndUpdate(
        { seller: userId },
        { isActive: true, startDate: new Date().getDate() + 30 , endDate: new Date()}
      );
      await propertyModel
      .findOneAndUpdate({ postedBy: userId }, { isSellerSub: true })
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
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
};

const cancelPayment = async (req, res) => {
  const { userId } = req.body;
  await userModel
    .findOneAndUpdate({ _id: userId }, { isSub: false })
    .catch((err) => {
      return res.status(400).json(err);
    });
  await subscribeModel
    .findOneAndUpdate({ seller: userId }, { isActive: false })
    .catch((err) => {
      return res.status(400).json(err);
    });
  await propertyModel
    .findOneAndUpdate({ postedBy: userId }, { isSellerSub: false })
    .catch((err) => {
      return res.status(400).json(err);
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
