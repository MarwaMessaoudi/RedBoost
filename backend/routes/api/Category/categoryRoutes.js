const express = require('express'); 
const { createCategory, getCategories, getCategoryById } = require('./categoryController'); // Import the controller

const router = express.Router();

// Route to create a new category
router.post('/categories', createCategory);
router.get('/Getcategories', getCategories);
router.get('/categoryByid/:id', getCategoryById); // ✅ Correct way to fetch by ID
module.exports = router;