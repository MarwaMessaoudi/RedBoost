const express = require("express");
const passport = require("passport");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  passport.authenticate("signup", async (error, user, info) => {
    try {
      console.log("i'm here");
      if (error) {
        return res.status(500).json({
          message: "Something is wrong in Registration",
          error: error || "internal server errror",
        });
      }

      req.login(user, async (error) => {
        if (error) {
          res.status(500).json({
            message: "Something is wrong",
            error: error || "internal server errror",
          });
        }

        return res.json({ user, info });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
