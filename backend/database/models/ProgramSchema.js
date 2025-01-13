const mongoose = require('mongoose')
const Activity = require('../../database/models/ActivitySchema')

const programSchema = new mongoose.Schema(
  {
    logo: {
      type: String,
      required: true,
    },
    programTitle: {
      type: String,
      required: true,
    },
    programDescription: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    authorizedUsers: [],
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }], // Reference to the Activity model
  },
  {
    timestamps: true, // Enable timestamps
  },
)

const programModal = mongoose.model('Program', programSchema)
module.exports = programModal
