const winston = require('winston');

const dirname = 'logs';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.colorize(),
  transports: [
    new winston.transports.File({
      dirname,
      filename: 'error.log',
      level: 'error',
    }),
    new winston.transports.File({
      dirname,
      filename: 'combined.log',
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

module.exports = logger;
