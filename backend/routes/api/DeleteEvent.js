const express = require("express");
const router = express.Router();
const Event = require("../../database/models/EventSchema");

router.delete("/events/:idEvent", async (req, res) => {
  try {
    const { idEvent } = req.params; // Use req.params to get the idEvent from the URL parameter

    // Find the event by its ID and remove it
    const event = await Event.findByIdAndDelete(idEvent);

    if (!event) {
      // If event is not found, return 404 Not Found
      return res.status(404).json({ error: "Event not found" });
    }

    // Return success response
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
