require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');

const reportDirectory = path.resolve('reports');
const cucumberReportDirectory = path.join(reportDirectory, 'cucumberReport');
const jsonFile = path.join(cucumberReportDirectory, 'cucumber-report.json');
const cucumberHtmlFile = path.join(cucumberReportDirectory, 'cucumber-report.html');
const temporaryIndex = path.join(cucumberReportDirectory, 'index.html');
const playwrightReportDirectory = path.join(reportDirectory, 'playwright-report');

function pad(value) {
  return String(value).padStart(2, '0');
}

function reportTimestamp(date) {
  const datePart = `${pad(date.getDate())}${pad(date.getMonth() + 1)}${String(date.getFullYear()).slice(-2)}`;
  const timePart = `${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
  return `${datePart}_${timePart}`;
}

if (!fs.existsSync(jsonFile) || !fs.existsSync(cucumberHtmlFile)) {
  throw new Error(
    'Cucumber JSON/HTML results were not found under reports/cucumberReport. Run npm run cucumberTest first.',
  );
}

fs.mkdirSync(reportDirectory, { recursive: true });

// Keep the requested temporary index inside cucumberReport during generation.
fs.copyFileSync(cucumberHtmlFile, temporaryIndex);

const fileName = `${reportTimestamp(new Date())}_CucumberReport.html`;
const finalReport = path.join(reportDirectory, fileName);

// Cucumber's HTML formatter embeds its styles, scripts, results and attachments.
fs.copyFileSync(temporaryIndex, finalReport);

function artifactFiles(directory, extension) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory).filter((file) => file.endsWith(extension)).sort();
}

const videos = artifactFiles(path.join(reportDirectory, 'videos'), '.webm');
const traces = artifactFiles(path.join(reportDirectory, 'traces'), '.zip');

fs.rmSync(playwrightReportDirectory, { recursive: true, force: true });
fs.mkdirSync(playwrightReportDirectory, { recursive: true });

const videoItems = videos.length
  ? videos
      .map(
        (file) => `
      <article>
        <h3>${file}</h3>
        <video controls preload="metadata" src="../videos/${file}"></video>
      </article>`,
      )
      .join('')
  : '<p>No videos were recorded for this run.</p>';

const traceItems = traces.length
  ? `<ul>${traces
      .map((file) => `<li><a href="../traces/${file}" download>${file}</a></li>`)
      .join('')}</ul>`
  : '<p>No traces were recorded for this run.</p>';

fs.writeFileSync(
  path.join(playwrightReportDirectory, 'index.html'),
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Playwright Artifacts Report</title>
    <style>
      body { color: #202124; font: 15px system-ui, sans-serif; margin: 2rem auto; max-width: 1100px; padding: 0 1rem; }
      h1, h2 { color: #2b5dab; }
      article { border: 1px solid #ddd; border-radius: 8px; margin: 1rem 0; padding: 1rem; }
      video { max-width: 100%; width: 900px; }
      a { color: #1769aa; }
    </style>
  </head>
  <body>
    <h1>Playwright Artifacts Report</h1>
    <p>Generated ${new Date().toLocaleString()} from the latest Cucumber execution.</p>
    <h2>Videos</h2>${videoItems}
    <h2>Traces</h2>${traceItems}
    <p>Open a downloaded trace with <code>npx playwright show-trace trace-file.zip</code>.</p>
  </body>
</html>\n`,
);

// Raw JSON, built-in HTML and temporary index are removed after archiving.
fs.rmSync(cucumberReportDirectory, { recursive: true, force: true });

console.log(`\nSelf-contained report generated at: ${finalReport}`);
console.log(` Playwright artifacts report: ${path.join(playwrightReportDirectory, 'index.html')}`);
