const mongoose = require('mongoose');

// Define the KPI schema
const kpiSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
    default: 0, // Default value for KPI
  },

  updates: [
    {
      value: { type: Number, required: true }, // The increment or decrement value
      timestamp: { type: Date, default: Date.now }, // When the update occurred
    },
  ],

  category: { type: mongoose.Schema.Types.ObjectId, ref: 'KPICategory' },


});
kpiSchema.pre('save', function (next) {
  if (this.count < 0) {
    return next(new Error('Count cannot be negative'));
  }
  next();
});
const kpi = mongoose.model('kpi', kpiSchema); // Create the KPI model

module.exports = kpi;
