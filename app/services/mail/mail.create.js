// services/mailService.js
const nodemailer = require('nodemailer');

// Set up transporter using SMTP
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email provider
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

async function sendMail({ to, subject, text, html }) {
  const mailOptions = {
    from: '"Your Name" <your-email@gmail.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  };

  // Send mail with defined transport object
  return transporter.sendMail(mailOptions);
}

module.exports = { sendMail };
