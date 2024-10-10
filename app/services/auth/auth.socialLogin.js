// const _ = require('lodash');
// const Promise = require('bluebird');
// const request = require('superagent');
// const db = require('../../models');
// const Email = require('../../utils/email');

// async function socialLogin(payload) {
//   const { access_token, provider, useragent, ip } = payload;
//   let userDetails = {};

//   // request user data from google
//   function googleDataRequest() {
//     return Promise.promisify((resolve, reject) => {
//       request
//         .get('https://www.googleapis.com/plus/v1/people/me')
//         .query({ access_token: access_token })
//         .set('Accept', 'application/json')
//         .end((err, res) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve(res.body);
//           }
//         });
//     }).then((data) => {
//       userDetails = {
//         provider_id: data.id,
//         firstName: data.name,
//         lastName: data.name,
//         birthday: data.birthday,
//         email: data.email,
//         imageUrl: _.get(data, 'image.url'),
//       };
//     });
//   }

//   // register/login

//   googleDataRequest();

//   const user = await db.User.findOne({
//     where: {
//       email: userDetails.provider_id,
//     },
//   });

//   if (user === null && userDetails !== null) {
//     // create new user
//     const newUser = await db.User.create({
//       first_name: userDetails.firstName,
//       last_name: userDetails.lastName,
//       birthday: userDetails.birthday,
//       email: userDetails.email,
//       picture: userDetails.imageUrl,
//       email_verified_at: new Date(),
//       username: userDetails.provider_id,
//       active: true,
//       activated_at: new Date(),
//     });
//     // send successful email activation notice
//     await new Email(newUser.email, 'Welcome', '', {
//       name: newUser.name,
//     }).sendEmail('welcome');

//     return newUser;
//   } else {
//     // log successful login
//     await db.Login.create({
//       ip_address: ip,
//       identity: newUser.email,
//       user_agent: useragent,
//       success: 1,
//       timestamp: Date.now() + 60 * 15 * 1000,
//     });
//     return user;
//   }
// }

// module.exports = { socialLogin };
