const asyncMiddleware = require("../middleware/asyncMiddleware");
const Email = require("../../utils/email");

module.exports = function EmainController(app) {
  /**
   * @api {post} /api/v1/mail/send
   * @apiName send
   * @apiGroup mail
   *
   */
  async function send(req, res) {
    try {
      const { from_name, from_email, subject, message, to_email, to_name } =
        req.body;
      const toEmail = to_email ?? "sharambe@sharambeaprop.com";
      const toName = to_name ?? "chelsea";

      await new Email(
        toEmail,
        `${subject} <${from_email} ${from_name}>`,
        message,
        {
          name: toName,
        },
        null,
        "sharambe@sharambeaprop.com, nangy@sharambeaprop.com"
      ).sendEmail("default");

      res.json({ message: "Message successfully" });
    } catch (error) {
      res.status(400).json({ message: "Could not send message" });
    }
  }

  return Object.freeze({
    send: asyncMiddleware(send),
  });
};
