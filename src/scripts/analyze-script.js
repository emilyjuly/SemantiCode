const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

async function analyze() {
  const filePath = path.join(__dirname, '../../temp/temp.html');
  const htmlContent = fs.readFileSync(filePath, "utf8");

  try {    
    const serverProcess = exec("node server.js");

    setTimeout(() => {

      exec(
        `lighthouse http://localhost:8080/temp.html --output=json --quiet --chrome-flags="--headless --no-sandbox"`,
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
