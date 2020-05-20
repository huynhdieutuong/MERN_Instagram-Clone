const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { protect } = require('../middlewares/auth');

const { createPost } = require('../controllers/posts');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  '/',
  protect,
  [check('text', 'Text is required').not().isEmpty()],
  createPost
);

module.exports = router;
