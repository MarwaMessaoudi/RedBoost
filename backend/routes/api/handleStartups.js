const express = require('express');
const router = express.Router();
const Startup = require('../../database/models/StartupSchema')

router.post('/createstartup', async (req, res) => {
  try {
    const startup = new Startup(req.body);
    await startup.save();
    res.status(201).send(startup);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
  