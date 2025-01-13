const express = require("express");
const router = express.Router();
const Event = require("../../database/models/EventSchema"); // Import your Event model

// Route to fetch all events
router.get("/events", async (req, res) => {
  try {
    const events = await Event.find(); // Retrieve all events from the database
    res.status(200).json(events); // Send the events as a JSON response
  } catch (error) {
    console.error("Failed to fetch events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});
module.exports = router;
