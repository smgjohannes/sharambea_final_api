const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');
const path = require('path');
const sgTransport = require('nodemailer-sendgrid-transport');

/**
 * sendEmail
 */
module.exports = class Email {
  /**
   * @param {string} toEmail
   * @param {string} subject
   * @param {string} message
   */
  constructor(toEmail, subject, message, data = null, attachments = []) {
    this.to = toEmail;
    this.name = data.name ? data.name : toEmail;
    this.subject = `${subject} - sharambea properties`;
    this.message = message;
    this.url = data.url ?? 'https://sharambeaprop.com/';
    this.from = `sharambeaproperties - ${process.env.EMAIL_FROM}`;
    this.data = data;
    this.attachments = attachments;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // SendGrid
      return nodemailer.createTransport(
        sgTransport({
          auth: {
            api_key: process.env.SENDGRID_API_KEY,
          },
        })
      );
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });
  }

  //Send the actual email
  /**
   * @param {string} template
   */
  async send(template) {
    const __dirname = path.resolve();
    // 1 ) Render The HTML based on a pub template
    const html = pug.renderFile(
      `${__dirname}/app/views/email/${template}.pug`,
      {
        name: this.name,
        url: this.url,
        subject: this.subject,
        message: this.message,
        data: this.data,
      }
    );

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: this.subject,
      html,
      text: htmlToText.htmlToText(html),
      attachments: this.attachments ? this.attachments : null,
    };

    // 3) Create a transport and send email
    this.newTransport().sendMail(mailOptions);
  }

  // SEND EMAIL
  /**
   * @param {string} template
   */
  async sendEmail(template) {
    await this.send(template);
  }

  // WELCOME
  async sendWelcome() {
    await this.send('welcome');
  }

  // RESET PASSWORD
  async sendPasswordReset() {
    await this.send('passwordReset');
  }

  // PASSWORD CHANGED
  async sendPasswordChanged() {
    await this.send('passwordChanged');
  }

  // ACCOUNT CONFIRMATION
  async sendActivation() {
    await this.send('activation');
  }

  async sendLoginActivity() {
    await this.send('loginActivity');
  }
};
