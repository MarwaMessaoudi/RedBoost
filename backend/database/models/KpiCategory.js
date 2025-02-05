const mongoose = require('mongoose');


// Define the KPI Category schema
const kpiCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const kpicategory = mongoose.model('kpicategory', kpiCategorySchema); // Create the KPI Category model

module.exports = kpicategory;
