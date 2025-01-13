// Import necessary modules
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const UserModal = require("../../database/models/AdminSchema");

// Middleware to check if user is authenticated
router.get("/checkPass", async (req, res) => {
  try {
    const { username, oldPassword } = req.query;

    // Find the user in the database by username
    const user = await UserModal.findOne({ username });

    // If user is not found, return error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare oldPassword with the hashed password stored in the database
    const match = await bcrypt.compare(oldPassword, user.password);

    // If passwords match, send success response, else send error response
    if (match) {
      res.status(200).json({ message: "Password is correct" });
    } else {
      res.json({ message: "Incorrect old password" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
