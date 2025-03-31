'use client'

import CodeEditorHtml from "@/components/CodeEditorHtml";
import CodeEditorCss from "@/components/CodeEditorCss";
import Preview from "@/components/Preview";
import { useState } from "react";

const EditorPage = () => {
  const [htmlCode, setHtmlCode] = useState<string>("");
  const [cssCode, setCssCode] = useState<string>("");

  return (
    <div className="container mx-auto p-4 h-screen">
      <h1 className="text-4xl font-bold mb-6">
        <span style={{ color: '#ff79c6' }}>Semanti</span>
        <span style={{ color: '#21222c' }}>Code</span>
        <span className="blinking-cursor">|</span>
      </h1>
      <div className="flex h-[90%]">
        <div className="flex flex-col w-1/2 h-full space-y-4 pr-4">
          <CodeEditorHtml onChange={setHtmlCode} />
          <CodeEditorCss onChange={setCssCode} />
        </div>
        <div className="flex-1 h-full">
          <Preview htmlCode={htmlCode} cssCode={cssCode} />
        </div>
      </div>
    </div>
  );
}

export default EditorPage;