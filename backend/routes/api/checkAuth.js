// Import necessary modules
const express = require('express')
const router = express.Router()

// Middleware to check if user is authenticated
router.get('/login', (req, res) => {
  if (req.session?.email) {
    return res.json({
      authenticated: true,
      email: req.session.email,
    })
  } else {
    return res.json({ authenticated: false })
  }
})

module.exports = router
 