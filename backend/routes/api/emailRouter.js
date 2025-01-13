const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Update with your email service
  auth: {
    user: '', // Your email address
    pass: '' // Your email password (use environment variables instead)
  }
});

// Route to send an email
router.post('/sendEmail', async (req, res) => {
  const { to, cc, subject, html } = req.body;

  try {
    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'nourcine222@gmail.com', // Sender address
      to: to, // List of recipients
      cc: cc, // List of CC recipients
      subject: subject, // Subject line
      html: html // HTML content of the email
    });
    console.log('Message sent: %s', info.messageId);
    res.status(200).send('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email!');
  }
});

module.exports = router;
