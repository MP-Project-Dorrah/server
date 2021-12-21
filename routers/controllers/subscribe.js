const subscribeModel = require("./../../db/models/subscribe");
const userModel = require("./../../db/models/user");

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

    res.json({
      message: "Payment successful",
      success: true,
    });

    await userModel.findOneAndUpdate({ _id: userId }, { isSub: true });

    const newSubscribe = new subscribeModel({
      seller: userId,
      amount,
    });

    newSubscribe
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
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
    .findOneAndUpdate({ _id: userId }, { isActive: false })
    .catch((err) => {
      return res.status(400).json(err);
    });
  res.status(200).json("done");
};

module.exports = { payment, cancelPayment };
