import { NextResponse } from 'next/server';
import { saveTempPage, deleteTempPage, getTempPage } from '@/lib/tempPages';

export async function POST(req: Request) {
  try {
    const { html, css } = await req.json();

    if (!html) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
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

    const id = Math.random().toString(36).substr(2, 9);
    saveTempPage(id, fullHtml);
    console.log('o id no save code é esse', id)

    setTimeout(() => deleteTempPage(id), 10 * 60 * 1000);
    return NextResponse.json({
      message: 'File created successfully',
      id,
    });
  } catch (error) {
    console.error('Error saving code:', error);
    return NextResponse.json({ error: `Error saving code: ${error}` }, { status: 500 });
  }
}
