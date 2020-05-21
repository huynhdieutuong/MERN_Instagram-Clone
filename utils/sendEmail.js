const nodemailer = require('nodemailer');
const config = require('config');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: config.get('SMTP_HOST'),
    port: config.get('SMTP_PORT'),
    secure: false,
    auth: {
      user: config.get('SMTP_USER'),
      pass: config.get('SMTP_PASSWORD'),
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'Instagram Clone<noreply@instagram-clone.com>',
    to: options.email,
    subject: options.subject,
    html: options.message,
  });

  console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
