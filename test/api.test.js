'use strict';

/* global describe, it */

const supertest = require('supertest');
const should = require('should');
const fs = require('fs');
const path = require('path');
const app = require('./../index');


describe('api', function () {
  this.timeout(30000); // because mocha has timeout of 3 seconds by default

  let body = '';
  it('can read template used as index page', function (done) {
    fs.readFile(path.join(__dirname, '../', 'views', 'index.html'), function (error, data) {
      should.not.exist(error);
      body = data.toString();
      body.length.should.be.above(0);
      done();
    });
  });

  it('loads index page with form', function (done) {
    supertest(app)
      .get('/')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        res.text.should.be.equal(body);
        done();
      });
  });

  it('parses example.org and finds no emails on it', function (done) {
    supertest(app)
      .post('/do')
      .send({
        url: 'http://example.org'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        res.text.should.be.equal('[]');
        done();
      });
  });

  it('parses https://vodolaz095.life/centos8_fix_error_setting_up_base_repository/ and finds no emails on it', function (done) {
    supertest(app)
      .post('/do')
      .send({
        url: 'https://vodolaz095.life/centos8_fix_error_setting_up_base_repository/'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        res.text.should.be.equal('[]');
        done();
      });
  });

  it('parses https://radonezh.ru/kontakt and finds email on it', function (done) {
    supertest(app)
      .post('/do')
      .send({
        url: 'https://radonezh.ru/kontakt'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        res.text.should.containEql('info@radonezh.ru');
        done();
      });
  });

});