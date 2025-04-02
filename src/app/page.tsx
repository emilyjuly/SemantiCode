'use client'

import CodeEditorHtml from "@/components/CodeEditorHtml";
import CodeEditorCss from "@/components/CodeEditorCss";
import Preview from "@/components/Preview";
import { useState } from "react";
import { Button } from "@/components/ui/button"

const EditorPage = () => {
  const [htmlCode, setHtmlCode] = useState<string>("");
  const [cssCode, setCssCode] = useState<string>("");

  async function handleAnalyze(html: string, css: string): Promise<void> {
    await fetch("/api/saveCode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html, css }),
    });

    const response = await fetch("/api/analyze", { method: "GET" });
    const data = await response.json();

    console.log("Results:", data.results);
  }

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
          <Button className="mt-5 cursor-pointer" onClick={() => handleAnalyze(htmlCode, cssCode)}>Start analysis</Button>
        </div>
      </div>
    </div>
  );
}

export default EditorPage;