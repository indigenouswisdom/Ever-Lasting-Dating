const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../utils/authMiddleware');

// Get current user profile
router.get('/me', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id, '-password');
  res.json(user);
});

// Update current user profile
router.put('/me', authMiddleware, async (req, res) => {
  const { name, bio, photos, preferences } = req.body;
  const updates = { name, bio, photos, preferences };

  const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true, select: '-password' });
  res.json(user);
});

module.exports = router;
