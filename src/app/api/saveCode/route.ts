import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { html, css } = await req.json();

  if (!html) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 },
    );
  }

  const filePath = path.join(process.cwd(), 'public', 'temp.html');

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

  fs.writeFileSync(filePath, fullHtml);

  return NextResponse.json({
    message: 'File created successfully',
    path: filePath,
  });
}
