const mongoose = require('mongoose');

const StartupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  created: {
    type: Boolean, // Can be changed to a Date if necessary
    required: true,
  },
  dateOfCreation: {
    type: Date,
    // Set to null by default if 'created' is false
    default: null,
  },
  legalForm: {
    type: String,
    required: true,
  },
  logo: {
    type: String, // Can be changed to a more specific type for image data
    default: null,
  },
  coFounders: {
    type: [mongoose.Schema.Types.ObjectId], // Array of ObjectIds for co-founders
    ref: 'Entrepreneur', // Reference another model for co-founders (optional)
  },
});

const Startup = mongoose.model('Startup', StartupSchema);

module.exports = Startup;

