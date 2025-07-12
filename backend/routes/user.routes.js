const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware: verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid Token" });
  }
};

// PUT: Update user profile
router.put("/update", verifyToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          name: req.body.name,
          offers: req.body.offers,
          wants: req.body.wants,
          availability: req.body.availability,
        },
      },
      { new: true }
    );

    res.json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// Get all users
router.get("/all", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // password hide
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});


module.exports = router;
