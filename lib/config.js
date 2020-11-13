'use strict';

// port where we start application
exports.port = process.env.PORT || 3000;

exports.environment = process.env.NODE_ENV || 'development';

// i prefer using firefox, since it eat less ram, imho, and it don't listens to microphone, like Chrome or Chromium did
exports.browser = process.env.BROWSER || 'firefox'; // can be chrome, firefox

// how to connect to selenium webdriver, it can be running on different machine
exports.seleniumWebDriverURL = process.env.SELENIUM_URL || 'http://localhost:4444/wd/hub';