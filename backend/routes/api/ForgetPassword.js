const express = require("express");
const router = express.Router();
const User = require("../../database/models/AdminSchema");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

router.post("/forget-password", async (req, res) => {
  try {
    const email = String(req.body.email).trim();
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Generate a unique token with expiry time (1 minute for testing)
    const token = crypto.randomBytes(20).toString("hex"); // Generate a random token
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 1); // Set expiry time to 1 minute from now

    // Update user document with reset token and expiry time
    user.resetPasswordToken = token;
    user.resetPasswordExpires = expiryDate;
    await user.save();
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mohamed.ghribi@etudiant-isi.utm.tn",
        pass: "lqplxvotpemozphr",
      },
    });
    const resetLink = `http://localhost:5173/reset-password/${user._id}/${token}`;

    const mailOptions = {
      from: "RedBoost <mohamed.ghribi@etudiant-isi.utm.tn>",
      to: email,
      subject: "Reset Your Password",
      text: `Hello ${user.username},\n\nYou requested to reset your password. Please click the following link to reset your password (valid for 1 minute):\n\n${resetLink}\n\nIf you didn't request this, please ignore this email.\n\nThanks,\nRedBoost`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("error :", error);
  }
});
module.exports = router;
