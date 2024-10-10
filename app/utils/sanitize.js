const DOMPurify = require("isomorphic-dompurify");

const sanitize = (str) =>
  DOMPurify.sanitize(str, { USE_PROFILES: { html: true } });

module.exports = {
  sanitize,
};
