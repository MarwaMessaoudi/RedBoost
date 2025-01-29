const mongoose = require('mongoose');

const mongoose = require('mongoose');

// Define the KPI Category schema
const kpiCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const KPICategory = mongoose.model('KPICategory', kpiCategorySchema); // Create the KPI Category model

module.exports = KPICategory;
