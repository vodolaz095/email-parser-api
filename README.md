email-parser-api
=========================

NodeJS api, that runs browser using Selenium Webdriver (be it chrome, firefox or other [supported browsers](https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_Browser.html))
and extracts emails from page.


How to start
=========================

1. Ensure you have nodejs installed. Code was tested using nodejs of version `12.19.0` from stack repos of Fedora 31 linux distro. But code could probably work on Windows or MacOS machines.
2. Ensure you have Browser and [Selenium Driver](https://www.selenium.dev/downloads/) installed. Code was tested using Firefox 82.0.2 from stack repos of Fedora 31 linux distro. For privacy reasons author of code does not have Google Chrome or Chromium browsers installed.
3. Clone code - `git clone git@bitbucket.org:vodolaz095/email-parser-api.git` 
4. Install modules required - `npm install`
5. It can be good idea to create drop in config by creating `.env` file like `.env.example` provided to work on your particular machine.
6. Start application - `npm start`
7. Open page in browser and provide URL to parse - `http://localhost:3000`. If you provided different `PORT` parameter in `.env` file, use it accordingly.

Configuration parameters
===========================

Application follows [12factor](https://12factor.net/config) approach, so all config parameters are stored in environment.
This parameters in form of environment variables values are taken in account:


- `PORT`. Default value is `3000` - depicts port, on which application is running.
- `NODE_ENV`. Default value is `development`, currently shows how verbose logs are. On `production` logs are less verbose.
- `REMOTE_WEBDRIVER`. Default is `no`. It depicts way we connect to browser automation tool.
- `BROWSER`. Default is `firefox`. Can be `chrome`, `ie` and other compatible [browsers](https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_Browser.html). Used, when `REMOTE_WEBDRIVER` environment variable is set to `no`. It starts new browser on each parsing request.
- `SELENIUM_URL`. Default is `http://localhost:4444/wd/hub`. If we have selenium webdriver running on different server, its how we try to connect to it. Used, when `REMOTE_WEBDRIVER` environment variable is set to `yes`. It uses same browser session on every request.



Contributing
==========================

After you have made changes, ensure

1. Eslint check pass - `npm run lint`
2. Unit tests pass - `npm test`
3. Code coverage is sane as reported in `coverage/lcov-report/index.html`