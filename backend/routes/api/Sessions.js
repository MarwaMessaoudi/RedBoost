// routes/api/getSessions.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const db = process.env.DATABASE_URI;

router.get("/sessions", async (req, res) => {
  try {
    const client = await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const collection = client.connection.db.collection("sessions");
    const sessions = await collection.find({}).toArray();
    res.json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
