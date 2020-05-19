const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const crypto = require('crypto');
const { validationResult } = require('express-validator');

const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');
const Token = require('../models/Token');

exports.register = async (req, res) => {
  // Validate
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // If email exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    // Hash password and create user
    const salt = await bcrypt.genSalt(10);
    user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, salt),
    });

    // Create a verification token for this user
    const token = crypto.randomBytes(16).toString('hex');

    await Token.create({
      user: user._id,
      email: user.email,
      token: crypto.createHash('sha256').update(token).digest('hex'),
      tokenExpire: Date.now() + 24 * 60 * 60 * 1000,
    });

    // Send email
    const tokenUrl = `${req.protocol}://${req.get(
      'host'
    )}/api/auth/confirmation/${token}`;

    const message = `Hello ${user.name},\n\n Please verify your account by clicking the link below: \n\n ${tokenUrl}`;

    await sendEmail({
      email: user.email,
      subject: 'Account verification token',
      message,
    });

    res.status(200).json({
      msg: `A verification email has been sent to ${user.email}.`,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.confirmationEmail = async (req, res) => {
  // Get hashed token
  const confirmationToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  try {
    // Check token
    const token = await Token.findOne({
      token: confirmationToken,
      tokenExpire: { $gt: Date.now() },
    });

    if (!token) {
      return res.status(400).json({ msg: 'Invalid token' });
    }

    // Update status verified and email
    const user = await User.findByIdAndUpdate(
      token.user,
      { isVerified: true, email: token.email },
      { new: true }
    );

    // Delete token
    await Token.findByIdAndDelete(token._id);

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  // Validate
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Check for user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // Check for password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getMe = (req, res) => {
  res.json(req.user);
};

exports.resendEmail = async (req, res) => {
  try {
    // Create a verification token for this user
    const token = crypto.randomBytes(16).toString('hex');

    await Token.create({
      user: req.user._id,
      email: req.user.email,
      token: crypto.createHash('sha256').update(token).digest('hex'),
      tokenExpire: Date.now() + 24 * 60 * 60 * 1000,
    });

    // Send email
    const tokenUrl = `${req.protocol}://${req.get(
      'host'
    )}/api/auth/confirmation/${token}`;

    const message = `Hello ${req.user.name},\n\n Please verify your account by clicking the link below: \n\n ${tokenUrl}`;

    await sendEmail({
      email: req.user.email,
      subject: 'Account verification token',
      message,
    });

    res.status(200).json({
      msg: `A verification email has been sent to ${req.user.email}.`,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.forgotPassword = async (req, res) => {
  // Validate
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check if not user
  const user = await User.findOne({ email: req.body.email }).select(
    '-password'
  );
  if (!user) {
    return res.status(404).json({
      msg: `There is no user with the email address ${req.body.email}`,
    });
  }

  // Create password reset token
  const resetToken = crypto.randomBytes(16).toString('hex');

  // Encrypt token
  user.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  user.resetPasswordExpire = Date.now() + 24 * 60 * 60 * 1000;

  await user.save();

  // Send email
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message,
    });

    res.status(200).json({
      msg: `A reset password email has been sent to ${user.email}.`,
    });
  } catch (err) {
    console.error(err.message);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(500).json({ msg: 'Reset email could not be sent' });
  }
};

exports.resetPassword = async (req, res) => {
  // Validate
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid token' });
    }

    // Set new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateInfo = async (req, res) => {
  // Validate
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name: req.body.name },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.changePassword = async (req, res) => {
  // Validate
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { password, currentPassword } = req.body;

  try {
    const user = await User.findById(req.user._id);

    // If current password incorrect
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Current password is incorrect' });
    }

    // Change password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.save();

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.changeEmail = async (req, res) => {
  // Validate
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if email already used
    const userExists = await User.findOne({ email: req.body.email }).select(
      '-password'
    );
    if (userExists) {
      return res.status(400).json({
        msg: `Email already used`,
      });
    }

    // Save new email
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { email: req.body.email, isVerified: false },
      { new: true }
    );

    // Create a verification token for this user
    const token = crypto.randomBytes(16).toString('hex');

    await Token.create({
      user: user._id,
      email: user.email,
      token: crypto.createHash('sha256').update(token).digest('hex'),
      tokenExpire: Date.now() + 24 * 60 * 60 * 1000,
    });

    // Send email
    const tokenUrl = `${req.protocol}://${req.get(
      'host'
    )}/api/auth/confirmation/${token}`;

    const message = `Hello ${user.name},\n\n Please verify your account by clicking the link below: \n\n ${tokenUrl}`;

    await sendEmail({
      email: user.email,
      subject: 'Account verification token',
      message,
    });

    res.status(200).json({
      msg: `A verification email has been sent to ${user.email}.`,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
