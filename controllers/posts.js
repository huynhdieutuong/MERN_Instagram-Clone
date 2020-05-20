const path = require('path');
const { validationResult } = require('express-validator');

const Post = require('../models/Post');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
exports.createPost = async (req, res) => {
  // Validate
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Validate image
  if (!req.files) {
    return res.status(400).json({ msg: 'Please upload an image' });
  }

  let { name, size, mimetype, mv } = req.files.image;

  // Make sure the image is a photo
  if (!mimetype.startsWith('image')) {
    return res.status(400).json({ msg: 'Please upload an image file' });
  }

  // Check filesize
  if (size > 5 * 1024 * 1024) {
    return res
      .status(400)
      .json({ msg: 'Please upload an image less than 5 MB' });
  }

  // Create custom filename
  name = `photo_${req.user._id}_${Date.now()}${path.parse(name).ext}`;

  try {
    // Upload file
    mv(`./public/uploads/photos/${name}`, async (error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Problem with file upload' });
      }
    });

    // Create post
    const post = await Post.create({
      user: req.user._id,
      text: req.body.text,
      image: name,
    });

    res.json(post);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort('-date');

    res.json(posts);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};
