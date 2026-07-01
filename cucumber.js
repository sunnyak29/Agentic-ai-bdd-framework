require('dotenv').config();

const parallelWorkers = parseInt(process.env.PARALLEL_WORKERS, 10) || 2;
const cucumberTags = process.env.CUCUMBER_TAGS ? `--tags "${process.env.CUCUMBER_TAGS}"` : '';

const common = `
  --require-module dotenv/config
  --require test/steps/**/*.js
  --require support/hooks.js
  --format progress
  --format json:reports/cucumberReport/cucumber-report.json
  --format html:reports/cucumberReport/cucumber-report.html
`;

module.exports = {
  default: `
    ${common}
    test/features/**/*.feature
    ${cucumberTags}
    --parallel ${parallelWorkers}
  `,
};
