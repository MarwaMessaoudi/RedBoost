const express = require("express");
const router = express.Router();
const Event = require("../../database/models/EventSchema");

router.post("/events", async (req, res) => {
  try {
    const eventData = req.body;
    const event = new Event(eventData);
    await event.save();
    res.status(200).json({ message: "Event Created Successfully" });
  } catch (error) {
    console.log("Failed to create Event:", error);
    res.status(500).json({ error: "Failed to create Event" });
  }
});

module.exports = router;
