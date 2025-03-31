'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PreviewProps {
  htmlCode: string;
  cssCode: string
}

const Preview: React.FC<PreviewProps> = ({ htmlCode, cssCode }) => {
  const previewContent = `
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>${htmlCode}</body>
      </html>
    `;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <iframe
          srcDoc={previewContent}
          title="Preview"
          className="w-full h-96 border rounded"
        />
      </CardContent>
    </Card>
  );
};

export default Preview;
