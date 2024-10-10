const morgan = require('morgan');
const fs = require('fs');

module.exports = function (app) {
  let logger;

  if (app.get('env') === 'production') {
    const logFile = fs.createWriteStream('log.txt', { flags: 'a' });
    const format =
      ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms';

    logger = morgan(morgan.compile(format), { stream: logFile });
  } else {
    logger = morgan('dev');
  }

  return logger;
};
