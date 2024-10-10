const USER_ROLE = {
  SUPERADMIN: 'superadmin',
  ADMIN: 'admin',
  MEMBER: 'user',
};

const AVAILABLE_LANGUAGES = {
  EN: 'en',
};

const TOKEN_TYPES = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  API_KEY: 'api_key',
};

const ACTIONS_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
};

const ERROR_MESSAGES = {
  REQUEST_TO_THIRD_PARTY_FAILED: 'REQUEST_TO_THIRD_PARTY_FAILED',
  INVALID_ACCESS_TOKEN: 'INVALID_ACCESS_TOKEN',
  NO_CONNECTED_TO_THE_INTERNET: 'NO_CONNECTED_TO_THE_INTERNET',
};

const createList = (obj) => {
  const list = [];
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
      Object.keys(obj[key]).forEach((secondKey) => {
        list.push(obj[key][secondKey]);
      });
    } else {
      list.push(obj[key]);
    }
  });
  return list;
};

// build lists from object
const USER_ROLE_LIST = createList(USER_ROLE);
const AVAILABLE_LANGUAGES_LIST = createList(AVAILABLE_LANGUAGES);

const TOKEN_TYPE_LIST = createList(TOKEN_TYPES);

module.exports.ACTIONS_STATUS = ACTIONS_STATUS;
module.exports.USER_ROLE = USER_ROLE;
module.exports.AVAILABLE_LANGUAGES = AVAILABLE_LANGUAGES;
module.exports.TOKEN_TYPES = TOKEN_TYPES;

module.exports.USER_ROLE_LIST = USER_ROLE_LIST;
module.exports.AVAILABLE_LANGUAGES_LIST = AVAILABLE_LANGUAGES_LIST;
module.exports.TOKEN_TYPE_LIST = TOKEN_TYPE_LIST;

module.exports.ERROR_MESSAGES = ERROR_MESSAGES;
