'use strict';

const logger = require('./logger');
const config = require('./config');
const {Builder, By, Key} = require('selenium-webdriver');
const validator = require('validator');

const heartbeat = 1000; // how fast things happens, in ms

module.exports = exports = function (urlToParse) {
  let driver;
  let i, j;
  return Promise.resolve()
    .then(function (){
      if(config.useRemoteWebDriver) {
        return new Builder()
          .usingServer(config.seleniumWebDriverURL)
          .build();
      }
      return new Builder()
        .forBrowser(config.browser)
        .build();
    })
    .then(function (drv) {
      driver = drv;
      logger.debug('Opening page %s', urlToParse);
      return driver.get(urlToParse);
    })
    .then(function () {
      logger.debug('Emulate human reading page %s', urlToParse);
      i = setInterval(function () {
        logger.silly('Human pressed arrow down to scroll down :-)');
        Key.chord(Key.ARROW_DOWN);
      }, heartbeat * Math.random());

      j = setInterval(function () {
        logger.silly('Human pressed space to scroll down :-)');
        Key.chord(Key.SPACE);
      }, heartbeat * Math.random());

      return driver.sleep(10 * heartbeat * Math.random()); // emulate human reading page
    })
    .then(function () {
      clearInterval(i);
      clearInterval(j);
      // its enough scrolling down :-)
      return driver.findElements(By.xpath('//a[@href]'));
    })
    .then(function (elements) {
      const ret = [];
      logger.debug('Page %s has %s links on it!', urlToParse, elements.length);
      return Promise.all(elements.map(function (element) {
        return element.getAttribute('href')
          .then(function (href) {
            logger.debug('Page %s has this url extracted %s...', urlToParse, href);
            if (href.startsWith('mailto:')) {
              const email = href.replace('mailto:','');
              if(validator.isEmail(email)) {
                logger.debug('Page %s has this email %s...', urlToParse, href);
                ret.push(email);
              }
            }
          });
      }))
        .then(function () {
          if(!config.useRemoteWebDriver) { //if its local browser, we close it
            driver.quit();
          }
          return Promise.resolve(ret);
        });
    });
};
