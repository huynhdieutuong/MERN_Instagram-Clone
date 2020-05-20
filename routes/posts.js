const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { protect } = require('../middlewares/auth');
const checkObjectId = require('../middlewares/checkObjectId');

const {
  createPost,
  getPosts,
  getPost,
  deletePost,
} = require('../controllers/posts');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  '/',
  protect,
  [check('text', 'Text is required').not().isEmpty()],
  createPost
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', getPosts);

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Public
router.get('/:id', checkObjectId('id'), getPost);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', protect, checkObjectId('id'), deletePost);

module.exports = router;
