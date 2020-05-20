const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/auth');
const checkObjectId = require('../middlewares/checkObjectId');

const {
  getNotifications,
  markRead,
  clearNotification,
} = require('../controllers/notifications');

// @route   GET api/notifications
// @desc    Get all user's notifications
// @access  Private
router.get('/', protect, getNotifications);

// @route   PUT api/notifications/:id
// @desc    Mark as Read & Unread
// @access  Private
router.put('/:id', protect, checkObjectId('id'), markRead);

// @route   DELETE api/notifications/:id
// @desc    Clear notification
// @access  Private
router.delete('/:id', protect, checkObjectId('id'), clearNotification);

module.exports = router;
