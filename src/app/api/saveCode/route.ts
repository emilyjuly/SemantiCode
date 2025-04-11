import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { html, css } = await req.json();

    if (!html) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }
    const tempDir = '/tmp';
    const filePath = path.join(tempDir, 'temp.html');

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const fullHtml = `
        <!DOCTYPE html>
        <html lang="pt">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Teste</title>
          <style>${css}</style>
        </head>
        <body>${html}</body>
        </html>
    `;

    fs.writeFileSync(filePath, fullHtml, 'utf8');

    return NextResponse.json({
      message: 'File created successfully',
      path: filePath,
    });
  } catch (error) {
    console.error('Error saving code:', error);
    return NextResponse.json({ error: `Error saving code: ${error}` }, { status: 500 });
  }
}
