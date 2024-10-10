const { auth } = require('./auth');
const { forgotPassword } = require('./auth.forgotPassword');
const { resetPassword } = require('./auth.resetPassword');
const { socialLogin } = require('./auth.socialLogin');
const { resendConfirmation } = require('./auth.resendConfirmation');
const { confirmEmail } = require('./auth.confirmEmail');
const { emailExist } = require('./auth.emailExist');
const { userNameExist } = require('./auth.userNameExist');
const { login } = require('./auth.login');

class Auth {
  constructor(token) {
    this.token = token;
  }
}

Auth.prototype.post = auth;
Auth.prototype.login = login;
Auth.prototype.confirmEmail = confirmEmail;
Auth.prototype.resendConfirmation = resendConfirmation;
Auth.prototype.forgotPassword = forgotPassword;
Auth.prototype.resetPassword = resetPassword;
Auth.prototype.socialLogin = socialLogin;
Auth.prototype.emailExist = emailExist;
Auth.prototype.userNameExist = userNameExist;

module.exports = Auth;
