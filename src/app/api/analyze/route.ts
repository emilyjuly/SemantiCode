import { ExecException, exec } from 'child_process';
import { NextResponse } from 'next/server';
import path from 'path';

type AnalyzeResponse =
  | { results: string }
  | { error: string; details: string | ExecException };

export async function GET(): Promise<NextResponse<AnalyzeResponse>> {
  return new Promise((resolve) => {
    try {
      const scriptPath = path.join(
        process.cwd(),
        'src',
        'scripts',
        'analyze-script.js',
      );

      exec(`node ${scriptPath}`, (err, stdout, stderr) => {
        if (err || stderr) {
          console.error('Error running script:', err || stderr);
          resolve(
            NextResponse.json(
              { error: `Error running script: ${err}`, details: err || stderr },
              { status: 500 },
            ),
          );
          return;
        }
        resolve(NextResponse.json({ results: stdout }, { status: 200 }));
      });
    } catch (error) {
      console.error('Error:', error);
      resolve(
        NextResponse.json(
          { error: 'Unexpected error', details: String(error) },
          { status: 500 },
        ),
      );
    }
  });
}
