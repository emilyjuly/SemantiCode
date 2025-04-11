import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await fetch('https://cablyai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-4o',
      }),
    });

    if (!response.ok) {
      throw new Error('Error connecting to AI. Check your connection.');
    }

    const data = await response.json();

    if (data.error) {
      console.error(data.error);
      return NextResponse.json(
        { error: 'Error connecting to AI: ' + data.error },
        { status: 500 },
      );
    }

    return NextResponse.json({ response: data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error connecting to AI' },
      { status: 500 },
    );
  }
}
