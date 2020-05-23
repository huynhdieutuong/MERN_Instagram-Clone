const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/auth');
const checkObjectId = require('../middlewares/checkObjectId');

const {
  getNotifications,
  markRead,
  markAllRead,
  clearNotification,
  clearAll,
} = require('../controllers/notifications');

// @route   GET api/notifications
// @desc    Get all user's notifications
// @access  Private
router.get('/', protect, getNotifications);

// @route   PUT api/notifications/:id
// @desc    Mark as Read & Unread
// @access  Private
router.put('/:id', protect, checkObjectId('id'), markRead);

// @route   PUT api/notifications
// @desc    Mark All as Read
// @access  Private
router.put('/', protect, markAllRead);

// @route   DELETE api/notifications/:id
// @desc    Clear notification
// @access  Private
router.delete('/:id', protect, checkObjectId('id'), clearNotification);

// @route   DELETE api/notifications
// @desc    Clear all notifications
// @access  Private
router.delete('/', protect, clearAll);

module.exports = router;
