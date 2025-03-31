'use client';

import { useCallback, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { dracula } from '@uiw/codemirror-theme-dracula';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CodeEditorProps {
  onChange: (code: string) => void;
}

const CodeEditorHtml: React.FC<CodeEditorProps> = ({ onChange }) => {
  const handleHtmlChange = useCallback(
    (val) => {
      onChange(val);
    },
    [onChange],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <img src="/doc.svg" alt="Ícone indicando arquivo" />
          index.html
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CodeMirror
          height="300px"
          extensions={[html(), dracula]}
          onChange={handleHtmlChange}
        />
      </CardContent>
    </Card>
  );
};

export default CodeEditorHtml;
