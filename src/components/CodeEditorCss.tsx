'use client';

import { useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
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

const CodeEditorCss: React.FC<CodeEditorProps> = ({ onChange }) => {
  const handleCssChange = useCallback(
    (val) => {
      onChange(val);
    }, [onChange]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center'>
          <img src="/doc.svg" alt="Ícone indicando arquivo" />
          style.css
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CodeMirror
          height="300px"
          extensions={[css(), dracula]}
          onChange={handleCssChange}
        />
      </CardContent>
    </Card>
  );
};

export default CodeEditorCss;
