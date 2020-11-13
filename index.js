'use strict';

const express = require('express');
const validator = require('validator');
const path = require('path');

const logger = require('./lib/logger');
const config = require('./lib/config');
const parser = require('./lib/parser');

const app = express();


app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
  return res.sendFile(path.join(__dirname, 'views', 'index.html')); // i use `path.join`, because somebody can start this code on Windows or Linux
});

app.post('/do', function (req, res, next) {
  const validatorOptions = { // see https://www.npmjs.com/package/validator
    protocols: ['http', 'https'],
    require_tld: true,
    require_protocol: false,
    require_host: true,
    require_valid_protocol: true,
    allow_underscores: false,
    host_whitelist: false,
    host_blacklist: false,
    allow_trailing_dot: false,
    allow_protocol_relative_urls: false,
    disallow_auth: false
  };


  const u = req.body.url;
  logger.debug('Checking address %s', u);
  if (!validator.isURL(u, validatorOptions)) {
    return res.status(400).json({
      status: 'error', code: 400, message: `malformed url ${u}`
    });
  }

  return parser(u)
    .then(function (results){
      logger.info('Checking address %s gave this results', u, results);
      return res.status(200).json(results);
    })
    .catch(function (error){
      next(error);
    });
});


app.use(function (error, req,res, next){ // eslint-disable-line
  logger.error('Internal server error %s', error.message, {stack: error.stack});
  return res.status(500).json({
    status: 'error', code: 500, message: error.message
  });
});

module.exports = exports = app;

if(!module.parent) { // if this is top level module in nodejs invocation, we start application
  app.listen(config.port, function (error) {
    if (error) {
      throw error;
    }
    logger.info('Application started on 0.0.0.0:%s', config.port);
  });
}

