const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

process.env.CHROME_PATH = '/usr/bin/chromium-browser';

async function analyze() {
  const filePath = path.resolve('/tmp/temp.html');
  const htmlContent = fs.readFileSync(filePath, 'utf8');

  try {
    const serverProcess = exec('node server.js');
    console.log('Servidor iniciado...');

    // Espera o servidor iniciar antes de rodar o Lighthouse
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const lighthouseCommand = `node node_modules/lighthouse/cli/index.js http://localhost:8080/temp.html --output=json --quiet`;

    exec(lighthouseCommand, (err, stdout, stderr) => {
      if (err || stderr) {
        console.error('Erro ao rodar Lighthouse:', err || stderr);
        return;
      }

      try {
        const lighthouseResults = JSON.parse(stdout);
        console.log('Resultados do Lighthouse:', lighthouseResults);
      } catch (parseErr) {
        console.error('Erro ao processar saída do Lighthouse:', parseErr);
      }
    });

    serverProcess.kill(); // Mata o servidor depois da análise
  } catch (error) {
    console.error('Erro ao validar HTML:', error);
  }
}

analyze();
