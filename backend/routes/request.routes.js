const express = require("express");
const router = express.Router();
const Request = require("../models/Request");

// ✅ Send a new request
router.post("/send", async (req, res) => {
  const { from, to } = req.body;

  if (!from || !to) {
    return res.status(400).json({ error: "Missing sender or receiver ID" });
  }

  try {
    const existing = await Request.findOne({ from, to });
    if (existing) {
      return res.status(400).json({ error: "Request already sent" });
    }

    const newRequest = new Request({ from, to });
    await newRequest.save();

    res.json({ message: "Request sent successfully", request: newRequest });
  } catch (err) {
    console.error("❌ Failed to send request:", err);
    res.status(500).json({ error: "Failed to send request" });
  }
});

// ✅ Get all requests received by a user
router.get("/received/:userId", async (req, res) => {
  try {
    const requests = await Request.find({ to: req.params.userId })
      .populate("from", "name email")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    console.error("❌ Failed to fetch received requests:", err);
    res.status(500).json({ error: "Failed to fetch received requests" });
  }
});

// ✅ Get all requests sent by a user
router.get("/sent/:userId", async (req, res) => {
  try {
    const requests = await Request.find({ from: req.params.userId })
      .populate("to", "name email")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    console.error("❌ Failed to fetch sent requests:", err);
    res.status(500).json({ error: "Failed to fetch sent requests" });
  }
});

// ✅ Update request status
router.put("/status/:id", async (req, res) => {
  const { status } = req.body;

  if (!["Pending", "Accepted", "Rejected"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    const updated = await Request.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Request not found" });
    }

    res.json({ message: "Status updated", request: updated });
  } catch (err) {
    console.error("❌ Failed to update status:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
});

module.exports = router;
