const crypto = require('crypto');

function generateToken() {
  const token = crypto.randomBytes(32).toString('hex');

  return {
    token,
    hash: crypto.createHash('sha256').update(token).digest('hex'),
  };
}

module.exports = {
  generateToken,
};
