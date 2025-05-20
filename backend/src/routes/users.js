const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth, adminAuth } = require('../middleware/auth');

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const user = await User.findById(req.user._id);
    
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// Update password
router.put('/password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }
    
    user.password = newPassword;
    await user.save();
    
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating password' });
  }
});

// Add address
router.post('/addresses', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.addresses.push(req.body);
    await user.save();
    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({ message: 'Error adding address' });
  }
});

// Update address
router.put('/addresses/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const address = user.addresses.id(req.params.id);
    
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
    
    Object.assign(address, req.body);
    await user.save();
    
    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({ message: 'Error updating address' });
  }
});

// Delete address
router.delete('/addresses/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.addresses.pull(req.params.id);
    await user.save();
    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting address' });
  }
});

// Add to wishlist
router.post('/wishlist/:productId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (user.wishlist.includes(req.params.productId)) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }
    
    user.wishlist.push(req.params.productId);
    await user.save();
    
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to wishlist' });
  }
});

// Remove from wishlist
router.delete('/wishlist/:productId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.wishlist.pull(req.params.productId);
    await user.save();
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error removing from wishlist' });
  }
});

// Update cart
router.put('/cart', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = req.body;
    await user.save();
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart' });
  }
});

// Get all users (admin only)
router.get('/', adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Delete user (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

module.exports = router; 