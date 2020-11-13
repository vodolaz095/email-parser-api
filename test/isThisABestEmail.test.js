'use strict';

const should = require('should');
const isBest = require('./../lib/isThisABestEmail');

/* global describe, it */

const emailNotExists = 'ylwwfn6fq@yandex.ru';

describe('isThisABestEmail', function () {
  this.timeout(30000); // because mocha has timeout of 3 seconds by default
  it('says non existing email is not best email', function (){
    return isBest(emailNotExists)
      .then(function (result){
        should.exist(result);
        console.log(result);
      });
  });
});