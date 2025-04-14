'use client';

import CodeEditorHtml from '@/components/CodeEditorHtml';
import CodeEditorCss from '@/components/CodeEditorCss';
import ChatBot from '@/components/ChatBot';
import Preview from '@/components/Preview';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import LoadingAnimation from '@/components/LoadingAnimation';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Footer from '@/components/Footer';

const EditorPage = () => {
  const [htmlCode, setHtmlCode] = useState<string>('');
  const [cssCode, setCssCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleAnalyze(html: string, css: string): Promise<void> {
    setResults(null);
    setLoading(true);
    setError(null);

    try {
      const saveResponse = await fetch('/api/saveCode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html, css }),
      });

      const saveData = await saveResponse.json();
      if (!saveResponse.ok) {
        throw new Error(saveData.error || `Error saving code: ${saveData.error}`);
      }

      const urlToAnalyze = `https://semanticode.vercel.app/api/preview/${saveData.id}`;
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      urlToAnalyze,
    )}&category=ACCESSIBILITY&category=SEO&strategy=desktop&key=${apiKey}`;
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (!res.ok || data.error) {
        console.error('Erro do Lighthouse:', data);
        throw new Error(data.error?.message || 'Erro na análise do Lighthouse');
      }
      setResults(data.lighthouseResult);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'green';
    if (score >= 50) return 'yellow';
    return 'red';
  };

  return (
    <div className="lg:flex-row min-h-screen container mx-auto p-4 h-screen">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-4xl font-bold mb-6">
          <span className="text-primary">Semanti</span>
          <span className="text-secondary">Code</span>
          <span className="blinking-cursor">|</span>
        </h1>
        <Dialog>
          <DialogTrigger className="underline cursor-pointer">
            How It Works
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>How It Works</DialogTitle>
              <div className="space-y-2">
                <p>
                  This site helps developers practice semantic HTML and get
                  real-time feedback on their code.
                </p>
                <ul className="list-disc pl-5">
                  <li>
                    <strong>Code Editor & Preview:</strong> Write HTML & CSS in
                    the editor and see the live preview.
                  </li>
                  <li>
                    <strong>Semantic Analysis:</strong> Enter HTML code to
                    unlock the <em>"Start Analysis"</em> button. Lighthouse will
                    evaluate your SEO & accessibility score.
                  </li>
                  <li>
                    <strong>Quick Start:</strong> Use the{' '}
                    <em>"Generate Template"</em> button for a basic HTML file
                    structure.
                  </li>
                  <li>
                    <strong>AI Chatbot:</strong> A floating bot in the
                    bottom-right corner helps answer coding questions.
                  </li>
                </ul>
                <p>Start coding and improve your semantic HTML skills! 🚀</p>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="flex flex-col lg:w-1/2 w-full space-y-4 lg:pr-4">
          <CodeEditorHtml onChange={setHtmlCode} />
          <CodeEditorCss onChange={setCssCode} />
        </div>
        <div className="flex-1 h-full lg:w-1/2 w-full space-y-4 lg:pr-4">
          <Preview htmlCode={htmlCode} cssCode={cssCode} />
          <Button
            className="mt-5 cursor-pointer"
            onClick={() => handleAnalyze(htmlCode, cssCode)}
            disabled={loading || htmlCode.length === 0}
          >
            Start analysis
          </Button>
          {loading && <LoadingAnimation />}
          {results}
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
      {error && (
        <div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg text-center z-50 animate-slide-up"
          role="alert"
        >
          <strong className="font-bold">Erro:</strong> {error}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default EditorPage;
