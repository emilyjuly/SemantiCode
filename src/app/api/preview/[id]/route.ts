import { NextRequest, NextResponse } from 'next/server';
import { getTempPage } from '@/lib/tempPages';

export const GET = async (req: NextRequest, context: { params: Promise<{ id: string }> }) => {
  const id = (await context.params).id;
  const html = getTempPage(id);

  if (!html) {
    return new NextResponse('Página não encontrada', { status: 404 });
  }

  console.log('no preview o id é esse', id);

  return new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  });
}