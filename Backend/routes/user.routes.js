const express = require("express");
const { registerUser, loginUser, getProfile } = require("../controllers/user.controllers");
const verifyToken = require("../middlewares/auth.middleware");
const adminCheck = require("../middlewares/admin.middleware");
const userModel = require("../models/user.models");
const router = express.Router();


router.post("/register", registerUser);

router.post("/login", loginUser); 

router.get("/", verifyToken, adminCheck, async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.status(200).json({ users });
  } catch (err) {
    console.error("Admin get users error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/profile", verifyToken, getProfile);



module.exports = router;
