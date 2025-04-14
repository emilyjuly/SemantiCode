import { NextResponse, NextRequest } from 'next/server';
import { deleteTempPage, getTempPage } from '@/lib/tempPages';
import { ExecException } from 'child_process';

type AnalyzeResponse =
  | { results: string }
  | { error: string; details: string | ExecException };

export async function GET(req: NextRequest): Promise<NextResponse<AnalyzeResponse>> {
  const id = req.nextUrl.searchParams.get('id');
  const apiKey = process.env.API_KEY;

  if (!id) {
    return NextResponse.json(
      { error: 'Missing "id" parameter', details: 'No ID provided in query.' },
      { status: 400 }
    );
  }

  try {
    const html = getTempPage(id);

    if (!html) {
      return NextResponse.json(
        { error: 'Page not found', details: 'No HTML found for the given ID.' },
        { status: 404 }
      );
    }

    console.log('no analyze o id é esse', id)
    const urlToAnalyze = `https://semanticode.vercel.app/api/preview/${id}`;

    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      urlToAnalyze,
    )}&category=ACCESSIBILITY&category=SEO&strategy=desktop&key=${apiKey}`;

    const res = await fetch(apiUrl);
    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Lighthouse API error', details: JSON.stringify(data) },
        { status: 500 }
      );
    }

    return NextResponse.json({ results: data }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Unexpected error', details: err.message },
      { status: 500 }
    );
  } finally {
    // deleteTempPage(id);
  }
}
