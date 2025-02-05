///////////////////////////
const mongoose = require('mongoose');

// Define the schema for the form fields
const formFieldSchema = new mongoose.Schema({
  fieldTitle: { type: String, required: true },  // Field name (e.g., "Patient Name")
  fieldType: { 
    type: String, 
    enum: ['text', 'number', 'date', 'select', 'checkbox'],  // Define the allowed field types
    required: true 
  },
  fieldValue: { type: mongoose.Schema.Types.Mixed, default: '' },  // Can store any type of value (string, number, boolean, etc.)
  placeholder: { type: String },  // Optional placeholder text for text fields
  required: { type: Boolean, default: false },  // Whether the field is required
  options: { type: [String] },  // Options for select fields
  min: { type: Number },  // Minimum value for number fields
  max: { type: Number }   // Maximum value for number fields
});

// Define the schema for the Category
const categorySchema = new mongoose.Schema({
  categoryTitle: { type: String, required: true },  // Title of the category (e.g., "Entrepreneurs")
  selectedIcon: { type: String, required: true },  // Icon representing the category
  formFields: [formFieldSchema]  // Array of form fields for this category
});

// Create the model from the schema
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;