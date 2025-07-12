const express = require("express");
const router = express.Router();
const Request = require("../models/Request");

router.post("/send", async (req, res) => {
  const { from, to } = req.body;

  try {
    // Check if request already exists
    const existing = await Request.findOne({ from, to });
    if (existing) {
      return res.status(400).json({ error: "Request already sent" });
    }

    const newRequest = new Request({ from, to });
    await newRequest.save();

    res.json({ message: "Request sent successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to send request" });
  }
});

module.exports = router;
