const winston = require('winston');
const moment = require('moment');

winston.emitErrs = true;

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      handleExeptions: true,
      json: false,
      colorize: true,
      timestamp: () => moment().format('D MMM HH:mm:ss'),
    }),
  ],
  exitOnError: false,
});

const write = message => logger.info(message.slice(0, -1));

module.exports = logger;
module.exports.stream = {
  write,
};

