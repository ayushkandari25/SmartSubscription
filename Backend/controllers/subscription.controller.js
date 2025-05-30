const subscriptionModel = require("../models/subscription.model");

const createSubscription = async (req, res) => {
  try {
    const { planName, price, endDate } = req.body;

    const newSubscription = await subscriptionModel.create({
      user: req.user.id,
      planName,
      price,
      endDate,
    });

    res.status(201).json({ subscription: newSubscription });
  } catch (err) {
    console.error("Create subscription error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserSubscriptions = async (req, res) => {
  try {
    const subscriptions = await subscriptionModel.find({ user: req.user.id });
    res.status(200).json({ subscriptions });
  } catch (err) {
    console.error("Get subscriptions error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const cancelSubscription = async (req, res) => {
  try {
    const subId = req.params.id;

    const subscription = await subscriptionModel.findOne({
      _id: subId,
      user: req.user.id,
    });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    subscription.status = "cancelled";
    await subscription.save();

    res.status(200).json({ message: "Subscription cancelled" });
  } catch (err) {
    console.error("Cancel subscription error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createSubscription,
  getUserSubscriptions,
  cancelSubscription,
};
