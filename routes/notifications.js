const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/auth');

const { getNotifications } = require('../controllers/notifications');

// @route   GET api/notifications
// @desc    Get all user's notifications
// @access  Private
router.get('/', protect, getNotifications);

module.exports = router;
