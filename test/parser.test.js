'use strict';

/* global describe, it */

const parser = require('./../lib/parser');
const should = require('should');

describe('parser', function () {
  this.timeout(30000); // because mocha has timeout of 3 seconds by default

  it.skip('parses example.org and finds no emails', function () {
    return parser('http://example.org')
      .then(function (data) {
        should.exist(data);
        data.should.be.an.Array();
        data.length.should.be.equal(0);
      });
  });

  it.skip('parses https://vodolaz095.life/centos8_fix_error_setting_up_base_repository/ and finds no emails', function () {
    return parser('https://vodolaz095.life/centos8_fix_error_setting_up_base_repository/')
      .then(function (data) {
        should.exist(data);
        data.should.be.an.Array();
        data.length.should.be.equal(0);
      });
  });

  it('parses https://radonezh.ru/kontakt and finds email', function (){
    return parser('https://radonezh.ru/kontakt')
      .then(function (data) {
        should.exist(data);
        data.should.be.an.Array();
        data.length.should.be.equal(1);
        data.should.containEql('info@radonezh.ru');
        console.log('Emails extracted', data); // eslint-disable-line
      });
  });
});