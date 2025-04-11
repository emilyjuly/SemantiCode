const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

process.env.CHROME_PATH = '/usr/bin/chromium-browser';

async function analyze() {
  const filePath = path.resolve('/tmp/temp.html');
  const htmlContent = fs.readFileSync(filePath, "utf8");

  try {    
    const serverProcess = exec("node server.js");

    setTimeout(() => {

      exec(
        `node node_modules/lighthouse/cli/index.js http://localhost:8080/temp.html --output=json --quiet`,
        (err, stdout, stderr) => {
          if (err || stderr) {
            console.error('Error running Lighthouse:', err || stderr);
            return;
          }

          try {
            const lighthouseResults = JSON.parse(stdout);
            console.log(stdout)
          } catch (parseErr) {
            console.error('Error parsing Lighthouse output:', parseErr);
          }
        },
      );
      serverProcess.kill();
    }, 5000);
  } catch (error) {
    console.error('Error validating HTML:', error);
  }
}

analyze();
