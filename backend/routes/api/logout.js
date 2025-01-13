// logoutRouter.js
const express = require("express");
const router = express.Router();

// Logout route
router.get("/logout", (req, res) => {
  // Expire the session cookie
  req.session.cookie.expires = new Date(0);

  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.clearCookie("sessionId");
      res.status(200).json({ message: "Logout successful" }); // Clear the session cookie (replace "connect.sid" with your session cookie name if it's different)
    }
  });
});

module.exports = router;
