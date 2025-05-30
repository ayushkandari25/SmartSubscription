const express = require("express");
const verifyToken = require("../middlewares/auth.middleware");
const { createSubscription, getUserSubscriptions, cancelSubscription } = require("../controllers/subscription.controller");
const adminCheck = require("../middlewares/admin.middleware");
const subscriptionModel = require("../models/subscription.model");


const router = express.Router();

router.post("/", verifyToken, createSubscription);
router.get("/", verifyToken, getUserSubscriptions);
router.delete("/:id", verifyToken, cancelSubscription);
router.get("/admin/all", verifyToken, adminCheck, async (req, res) => {
  try {
    const allSubs = await subscriptionModel
      .find()
      .populate("user", "name email");
    res.status(200).json({ subscriptions: allSubs });
  } catch (err) {
    console.error("Admin get subscriptions error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
