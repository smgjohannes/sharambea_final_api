const asyncMiddleware = require('../middleware/asyncMiddleware');
const Email = require('../../utils/email');

module.exports = function EmainController(app) {
  /**
   * @api {post} /api/v1/mail/send
   * @apiName send
   * @apiGroup mail
   *
   */
  async function send(req, res) {
    const { from_name, from_email, subject, message } = req.body;
    const toEmail = 'sharambe@sharambeaprop.com';
    const toName = 'chelsea';

    const response = await new Email(
      toEmail,
      `${subject} <${from_email} ${from_name}>`,
      message,
      {
        name: toName,
      }
    ).sendEmail('default');

    res.json(response);
  }

  return Object.freeze({
    send: asyncMiddleware(send),
  });
};
