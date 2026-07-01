require('dotenv').config();

const config = {
  baseUrl: process.env.BASE_URL || 'https://parabank.parasoft.com/parabank',
  browser: process.env.BROWSER || 'chromium',
  headless: process.env.HEADLESS === 'true',
  slowMo: parseInt(process.env.SLOWMO, 10) || 0,
  timeout: parseInt(process.env.TIMEOUT, 10) || 10000,
  navigationTimeout: parseInt(process.env.NAVIGATION_TIMEOUT, 10) || 30000,
  recordVideo: process.env.RECORD_VIDEO === 'true',
  recordTrace: process.env.RECORD_TRACE === 'true',
  parallelWorkers: parseInt(process.env.PARALLEL_WORKERS, 10) || 2,
};

module.exports = config;
