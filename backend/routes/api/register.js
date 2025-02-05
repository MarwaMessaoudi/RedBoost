const express = require("express");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const users = require("../../database/models/UserSchema");

require("dotenv").config();

const router = express.Router();

const oAuth2Client = new google.auth.OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oAuth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN,
});

const registerUser = async (req, res) => {
  try {
    const { username, email, phone, role, department } = req.body;

    // Check if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate a reset password token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Create new user object
    const newUser = new users({
      username,
      email,
      phone,
      role,
      department,
      password: "",
      resetToken,
      resetTokenExpires: Date.now() + 3600000, // Expires in 1 hour
    });

    await newUser.save();


    const accessToken = await oAuth2Client.getAccessToken();

    // Configure Nodemailer with OAuth2
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.USER_EMAIL,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    // Construct password reset link
    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

    // Send the email
    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Set Your Password",
      html: `
        <p>Hello ${username},</p>
        <p>Please click the link below to set your password:</p>
        <a href="${resetLink}" target="_blank">Set Password</a>
        <p>If you did not request this, please ignore this email.</p>
      `,
    });

    return res.status(201).json({
      message: "User created successfully. A password setup link has been sent to the user's email.",
    });
  } catch (error) {
    return res.status(500).json({ message: "Error creating user", error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // Log the received data
    console.log("Token:", token);
    console.log("Password:", password);

    // Validate input
    if (!token || !password) {
      return res.status(400).json({ message: "Token and password are required." });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long." });
    }

    // Find user by reset token
    const user = await users.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() },
    });

    console.log("User:", user);

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpires = null;

    await user.save();

    return res.json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res.status(500).json({ message: "Error resetting password", error: error.message });
  }
};

router.post("/register", registerUser);
router.post("/reset-password", resetPassword);

module.exports = router;
