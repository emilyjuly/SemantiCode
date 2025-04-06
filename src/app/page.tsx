'use client';

import CodeEditorHtml from '@/components/CodeEditorHtml';
import CodeEditorCss from '@/components/CodeEditorCss';
import ChatBot from '@/components/ChatBot';
import Preview from '@/components/Preview';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import LoadingAnimation from '@/components/LoadingAnimation';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const EditorPage = () => {
  const [htmlCode, setHtmlCode] = useState<string>('');
  const [cssCode, setCssCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<any>(null);

  async function handleAnalyze(html: string, css: string): Promise<void> {
    setResults(null);
    setLoading(true);
    await fetch('/api/saveCode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html, css }),
    });

    const response = await fetch('/api/analyze', { method: 'GET' });
    const data = await response.json();
    if (data) {
      setResults(JSON.parse(data.results));
    }
    setLoading(false);
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'green';
    if (score >= 50) return 'yellow';
    return 'red';
  };

  return (
    <div className="container mx-auto p-4 h-screen">
      <h1 className="text-4xl font-bold mb-6">
        <span className="text-primary">Semanti</span>
        <span className="text-secondary">Code</span>
        <span className="blinking-cursor">|</span>
      </h1>
      <div className="flex h-[90%]">
        <div className="flex flex-col w-1/2 h-full space-y-4 pr-4">
          <CodeEditorHtml onChange={setHtmlCode} />
          <CodeEditorCss onChange={setCssCode} />
        </div>
        <div className="flex-1 h-full">
          <Preview htmlCode={htmlCode} cssCode={cssCode} />
          <Button
            className="mt-5 cursor-pointer"
            onClick={() => handleAnalyze(htmlCode, cssCode)}
          >
            Start analysis
          </Button>
          {loading && <LoadingAnimation />}
          {results && results.categories && (
            <div className="mt-5">
              <div className="flex space-x-8 mt-3">
                {['accessibility', 'seo'].map((category) => (
                  <div key={category} className="flex flex-col items-center">
                    <ResponsiveContainer width={150} height={150}>
                      <PieChart>
                        <Pie
                          data={[
                            {
                              name: 'Score',
                              value: results.categories[category].score * 100,
                            },
                            {
                              name: 'Remaining',
                              value:
                                100 - results.categories[category].score * 100,
                            },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          fill={getScoreColor(
                            results.categories[category].score * 100,
                          )}
                          dataKey="value"
                        >
                          <Cell
                            fill={getScoreColor(
                              results.categories[category].score * 100,
                            )}
                          />
                          <Cell fill="#E0E0E0" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <p className="text-center font-semibold mt-2">
                      {category.charAt(0).toUpperCase() + category.slice(1)}:{' '}
                      {results.categories[category].score * 100}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <ChatBot />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
