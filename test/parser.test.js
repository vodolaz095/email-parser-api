'use strict';

/* global describe, it */

const parser = require('./../lib/parser');
const should = require('should');

describe('parser', function () {
  this.timeout(30000); // because mocha has timeout of 3 seconds by default

  it('parses example.org and finds no emails', function () {
    return parser('http://example.org')
      .then(function (data) {
        should.exist(data);
        data.should.be.an.Array();
        data.length.should.be.equal(0);
      });
  });

  it('parses https://vodolaz095.life/centos8_fix_error_setting_up_base_repository/ and finds no emails', function () {
    return parser('https://vodolaz095.life/centos8_fix_error_setting_up_base_repository/')
      .then(function (data) {
        should.exist(data);
        data.should.be.an.Array();
        data.length.should.be.equal(0);
      });
  });

  it('parses https://radonezh.ru/kontakt and finds email on it', function (){
    return parser('https://radonezh.ru/kontakt')
      .then(function (data) {
        should.exist(data);
        data.should.be.an.Array();
        data.length.should.be.equal(1);
        console.log('Emails extracted', data); // eslint-disable-line
        data[0].info.should.be.equal('info@radonezh.ru is a valid address');
        data[0].addr.should.be.equal('info@radonezh.ru');
        data[0].code.should.be.equal(1);
        data[0].tryagain.should.be.false();
        data[0].banner.should.be.equal('220 emx.mail.ru ESMTP ready \r\n');
        data[0].best.should.be.true();
      });
  });
});