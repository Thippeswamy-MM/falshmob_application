const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const { auth, adminAuth } = require('../middleware/auth');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const { featured } = req.query;
    const query = featured ? { featured: featured === 'true' } : {};
    
    const categories = await Category.find(query)
      .populate('parent', 'name')
      .sort('name');
    
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
});

// Get single category
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate('parent', 'name');
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category' });
  }
});

// Create category (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error creating category' });
  }
});

// Update category (admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error updating category' });
  }
});

// Delete category (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category' });
  }
});

module.exports = router; 