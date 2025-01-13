const express = require("express");
const passport = require("passport");

const router = express.Router();

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (error, user, info) => {
    console.log("req user", req.user);
    console.log("req session", req.session);
    try {
      if (error) {
        return res.status(500).json({
          message: "Something is wrong logging in",
          error: error || "internal server errror",
        });
      }

      req.login(user, async (error) => {
        if (error) {
          return res.status(500).json({
            message: "Something is wrong logging in",
            error: error || "internal server errror",
          });
          // By using 'return', we stop the execution here if there's an error.
        }
        req.session.email = user.email;
        return res.send({ user, info });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
