'use strict';

// const path = require('path');
const winston = require('winston');
const config = require('./config');
/*
 * USE ONLY WINSTON 3.1.0 - all versions has metadata broken!
 */

/*
  levels:
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5
*/

const logger = winston.createLogger({
  level: config.environment === 'development' ? 'silly' : 'debug',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // colorize only console!!!
        winston.format.splat(),
        winston.format.simple()
      )
    })
  ]
});


module.exports = exports = logger;

