const express = require("express");
const router = express.Router();
const Event = require("../../database/models/EventSchema");

// Update an event by ID
router.put("/events/:idEvent", async (req, res) => {
  try {
    const { idEvent } = req.params;

    const updatedEvent = await Event.findByIdAndUpdate(idEvent, req.body, {
      new: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res
      .status(200)
      .json({ message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
