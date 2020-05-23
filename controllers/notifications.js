const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ owner: req.user.id })
      .sort('-date')
      .populate({
        path: 'guest',
        select: 'name avatar',
      })
      .populate({
        path: 'post',
        select: 'image',
      });

    res.json(notifications);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};

exports.markRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ msg: 'Notification not found' });
    }

    // Check user authorized
    if (notification.owner.toString() !== req.user.id) {
      return res.status(400).json({ msg: 'User not authorized' });
    }

    // Mark read or unread
    notification.isRead = !notification.isRead;
    await notification.save();

    res.json(notification);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};

exports.clearNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ msg: 'Notification not found' });
    }

    // Check user authorized
    if (notification.owner.toString() !== req.user.id) {
      return res.status(400).json({ msg: 'User not authorized' });
    }

    // Clear notification
    await notification.remove();

    res.json({ msg: 'Cleared notification' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};
