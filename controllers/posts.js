const path = require('path');
const { validationResult } = require('express-validator');

const Post = require('../models/Post');
const Notification = require('../models/Notification');

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
    return res
      .status(400)
      .json({ errors: [{ msg: 'Please upload an image' }] });
  }

  let { name, size, mimetype, mv } = req.files.image;

  // Make sure the image is a photo
  if (!mimetype.startsWith('image')) {
    return res
      .status(400)
      .json({ errors: [{ msg: 'Please upload an image file' }] });
  }

  // Check filesize
  if (size > 5 * 1024 * 1024) {
    return res
      .status(400)
      .json({ errors: [{ msg: 'Please upload an image less than 5 MB' }] });
  }

  // Create custom filename
  name = `photo_${req.user._id}_${Date.now()}${path.parse(name).ext}`;

  try {
    // Upload file
    mv(`./public/uploads/photos/${name}`, async (error) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ errors: [{ msg: 'Problem with file upload' }] });
      }
    });

    // Create post
    const newPost = await Post.create({
      user: req.user._id,
      text: req.body.text,
      image: name,
    });

    const post = await Post.findById(newPost.id).populate({
      path: 'user',
      select: 'name avatar',
    });

    res.json(post);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort('-date').populate({
      path: 'user',
      select: 'name avatar',
    });

    res.json(posts);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};

exports.getPostsMe = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id }).sort('-date');

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
      return res.status(404).json({ errors: [{ msg: 'Post not found' }] });
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
      return res.status(404).json({ errors: [{ msg: 'Post not found' }] });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: 'User not authorized' }] });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ errors: [{ msg: 'Post not found' }] });
    }

    // Check if the post has already been liked
    const liked = post.likes.find(
      (like) => like.user.toString() === req.user.id
    );

    if (liked) {
      post.likes = post.likes.filter(
        (like) => like.user.toString() !== req.user.id
      );
    } else {
      post.likes.push({ user: req.user.id });

      // Add Notification
      if (post.user.toString() !== req.user.id) {
        await Notification.create({
          owner: post.user,
          guest: req.user.id,
          post: post.id,
          type: 'like',
        });
      }
    }

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};

exports.commentPost = async (req, res) => {
  // Validate
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ errors: [{ msg: 'Post not found' }] });
    }

    // Add new comment
    post.comments.push({
      user: req.user.id,
      text: req.body.text,
      name: req.user.name,
      avatar: req.user.avatar,
    });

    await post.save();

    if (post.user.toString() !== req.user.id) {
      // Add Notification
      await Notification.create({
        owner: post.user,
        guest: req.user.id,
        post: post.id,
        type: 'comment',
      });
    }

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete comment on a post
// @access  Private
exports.delCommentPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ errors: [{ msg: 'Post not found' }] });
    }

    // Check if not comment
    const commentExists = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    if (!commentExists) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Comment does not exists' }] });
    }
    {
      errors: [{ msg: 'Comment does not exists' }];
    }
    // Check user authorized
    if (commentExists.user.toString() !== req.user.id) {
      return res.status(400).json({ errors: [{ msg: 'User not authorized' }] });
    }

    // Remove comment and save
    post.comments = post.comments.filter(
      (comment) => comment._id.toString() !== req.params.comment_id
    );

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};
