const express = require("express");
const passport = require("passport");

const router = express.Router();

// Registration Route
router.post("/register", (req, res, next) => {
  passport.authenticate("signup", async (error, user, info) => {
    if (error) {
      return res.status(500).json({
        message: "Something went wrong during registration",
        error: error.message || "Internal Server Error",
      });
    }

    if (!user) {
      return res.status(400).json({
        message: "Registration failed",
        error: info.error || "Invalid registration details",
      });
    }

    // Log the user in after successful registration
    req.login(user, (error) => {
      if (error) {
        return res.status(500).json({
          message: "Error logging in after registration",
          error: error.message || "Internal Server Error",
        });
      }

      return res.status(201).json({
        message: "Registration successful",
        user,
      });
    });
  })(req, res, next); // Properly invoke passport.authenticate
});

module.exports = router;
