const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ owner: req.user.id }).sort(
      '-date'
    );

    res.json(notifications);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
};
