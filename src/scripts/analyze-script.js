const { exec } = require('child_process');
const path = require('path');
const validator = require('html-validator');
const fs = require('fs');

async function analyze() {
  const filePath = path.join(__dirname, '../../public/temp.html');
  const htmlContent = fs.readFileSync(filePath, "utf8");

  try {
    const validationResults = await validator({ data: htmlContent, format: "json" });
    
    const serverProcess = exec("node server.js");

    setTimeout(() => {

      exec(
        `lighthouse http://localhost:8080/temp.html --output=json --quiet`,
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
