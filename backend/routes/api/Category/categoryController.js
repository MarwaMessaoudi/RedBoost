const Category = require('../../../database/models/CategorySchema'); // Import the Category model

// Controller to handle creating a new category
const createCategory = async (req, res) => {
  try {
    const { categoryTitle, selectedIcon, formFields } = req.body;

    // Create a new category document
    const newCategory = new Category({
      categoryTitle,
      selectedIcon,
      formFields
    });

    // Save the new category to the database
    await newCategory.save();

    // Return the created category
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Error creating category', error });
  }

};
// Controller to handle fetching all categories
const getCategories = async (req, res) => {
    try {
      const categories = await Category.find(); // Fetch all categories from the database
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ message: 'Error fetching categories', error });
    }
  };


// Controller to handle fetching a single category by ID
const getCategoryById = async (req, res) => {
    try {
      const category = await Category.findById(req.params.id); // Fetch category by ID
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(category); // Return the category
    } catch (error) {
      console.error('Error fetching category:', error);
      res.status(500).json({ message: 'Error fetching category', error });
    }
  };
module.exports = { createCategory,getCategories,getCategoryById };