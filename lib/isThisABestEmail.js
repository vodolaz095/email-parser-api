'use strict';

const verify = require('email-verify').verify;

// best email is the one, we can send something too :-)
const timeout = 10*1000;

module.exports = exports = function (email) {
  return new Promise(function (resolve, reject){
    verify(email,{ timeout, port: 25 }, function (error, result){
      if(error) {
        return reject(error);
      }
      if(result.success) {
        result.best = true;
      }
      return resolve(result);
    });
  });
};

