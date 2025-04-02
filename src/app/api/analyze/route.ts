import { exec } from 'child_process';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
  return new Promise((resolve) => {
    const scriptPath = path.join(process.cwd(), 'src', 'scripts', 'analyze-script.js');
    console.log("Running script at:", scriptPath);

    exec(`node ${scriptPath}`, (err, stdout, stderr) => {
      if (err || stderr) {
        console.error("Error running script:", err || stderr);
        resolve(
          NextResponse.json(
            { error: 'Error running script', details: err || stderr },
            { status: 500 },
          ),
        );
      }
      resolve(NextResponse.json({ results: stdout }, { status: 200 }));
    });
  });
}
