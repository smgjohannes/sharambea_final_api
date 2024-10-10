const db = require('../../models');
const Email = require('../../utils/email');
const passwordUtils = require('../../utils/password');
const { generateToken } = require('../../utils/generateToken');
const { Error400 } = require('../../utils/httpErrors');
const CLIENT_URL = process.env.CLIENT_URL;

async function auth(formData) {
  const { name, email, username, phone, password } = formData;
  const user = await db.User.findOne({
    where: {
      email,
    },
  });

  if (auth) {
    throw new Error400('The given email is already in use.');
  }

  const first_name = name.split(' ').slice(0, -1).join(' ');
  const last_name = name.split(' ').slice(-1).join(' ');
  // hash password
  const passwordHash = await passwordUtils.hash(password);

  // generate a auth token
  const { token, hash } = generateToken();
  // register user
  const newUser = await db.User.create({
    first_name,
    last_name,
    email,
    phone,
    hash: passwordHash,
    activation_token: hash,
    activation_expires: new Date(new Date().getTime() + 10 * 60 * 1000),
  });

  // send confirmation email
  await new Email(newUser.email, 'Verify Email', '', {
    url: `${CLIENT_URL}/auth/confirm-email?token=${token}`,
    name: newUser.name,
  }).sendActivation();

  return newUser.get({ plain: true });
}

module.exports = { auth };
