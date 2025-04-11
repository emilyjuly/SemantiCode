'use client';

import { useCallback, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";

interface CodeEditorProps {
  onChange: (code: string) => void;
}

const CodeEditorHtml: React.FC<CodeEditorProps> = ({ onChange }) => {
  const [code, setCode] = useState("");

  const handleHtmlChange = useCallback(
    (val: string) => {
      setCode(val);
      onChange(val);
    },
    [onChange],
  );

  const generateHtmlTemplate = () => {
    const template = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Semanticode</title>
</head>
<body>
  <header>
    <h1>my site</h1>
  </header>
  <main>
  </main>
</body>
</html>`;

    setCode(template);
    onChange(template);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <div className='flex items-center'>
            <img src="/doc.svg" alt="Ícone indicando arquivo" />
            index.html
          </div>
          <Button
            onClick={generateHtmlTemplate}
            variant="outline"
            size="sm"
            title="Gerar HTML Semântico"
            style={{ cursor: 'pointer' }}
            className="w-50 text-[10px] lg:w-80 lg:text-[16px]"
          >
            Generate a basic HTML template 🪄
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CodeMirror
          value={code}
          height="300px"
          extensions={[html(), dracula]}
          onChange={handleHtmlChange}
        />
      </CardContent>
    </Card>
  );
};

export default CodeEditorHtml;
