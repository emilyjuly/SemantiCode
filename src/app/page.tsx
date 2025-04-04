'use client'

import CodeEditorHtml from "@/components/CodeEditorHtml";
import CodeEditorCss from "@/components/CodeEditorCss";
import Preview from "@/components/Preview";
import { useState } from "react";
import { Button } from "@/components/ui/button"

const EditorPage = () => {
  const [htmlCode, setHtmlCode] = useState<string>("");
  const [cssCode, setCssCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<any>(null);

  async function handleAnalyze(html: string, css: string): Promise<void> {
    setLoading(true);
    await fetch("/api/saveCode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html, css }),
    });

    const response = await fetch("/api/analyze", { method: "GET" });
    const data = await response.json();
    console.log(JSON.parse(data.results));
    setResults(JSON.parse(data.results))
    setLoading(false);
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "green";  // Bom
    if (score >= 50) return "yellow"; // Médio
    return "red";                     // Ruim
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
          {results && results.categories && (
            <div>
              <h2>Audit Results</h2>
              <ul>
                {Object.keys(results.categories).map((key) => (
                  <li key={key}>
                    <strong>{results.categories[key].title}:</strong>{' '}
                    {results.categories[key].score}
                  </li>
                ))}
              </ul>
              <p
                style={{
                  color: getScoreColor(
                    results.categories.accessibility.score * 100,
                  ),
                }}
              >
                Acessibilidade: {results.categories.accessibility.score * 100}
              </p>
              <p
                style={{
                  color: getScoreColor(results.categories.seo.score * 100),
                }}
              >
                SEO: {results.categories.seo.score * 100}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditorPage;