'use client';
import React, { useState, useEffect, useRef } from "react";
import CodeMirror, { type ReactCodeMirrorProps } from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { Copy } from 'lucide-react';

export default function HTMXCodeSandbox() {
  const initialCode = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hello World Example</title>
  <script src="https://unpkg.com/htmx.org@1.7.0"></script>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100 flex items-center justify-center h-screen">
  <div class="text-center">
    <h1 class="text-4xl font-bold text-blue-500">Hello, World!</h1>
  </div>
</body>
</html>
  `;

  const [code, setCode] = useState<string>(initialCode);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const onChange = React.useCallback<Required<ReactCodeMirrorProps>['onChange']>((value: string, _viewUpdate) => {
    setCode(value);
  }, []);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = code;
    }
  }, [code]);

  const copyToClipboard = (format: 'htmx' | 'templ') => {
    let textToCopy = code;
    if (format === 'templ') {
      textToCopy = `
package templates

templ Example() {
${code}
}`;
    }
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert(`Code copied as ${format.toUpperCase()} format!`);
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
    setDropdownVisible(false);
  };

  return (
    <div className="relative mt-8">
      <CodeMirror
        value={code}
        height="400px"
        theme={vscodeDark}
        extensions={[html()]}
        onChange={onChange}
      />
      <div className="mt-4 p-4 bg-gray-900 border border-gray-700 rounded-lg relative">
        <h3 className="text-lg font-bold text-white">Output</h3>
        <iframe
          ref={iframeRef}
          className="w-full h-96 border-none"
          title="sandbox"
        />
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setDropdownVisible(!dropdownVisible)}
            className="bg-transparent"
          >
            <Copy className="w-6 h-6 text-gray-300 hover:text-white" />
          </button>
          {dropdownVisible && (
            <div className="absolute bg-gray-800 text-white shadow-lg rounded mt-2 w-56">
              <button
                className="block px-4 py-2 text-left hover:bg-gray-700 w-full"
                onClick={() => copyToClipboard('htmx')}
              >
                Copy as HTMX
              </button>
              <button
                className="block px-4 py-2 text-left hover:bg-gray-700 w-full"
                onClick={() => copyToClipboard('templ')}
              >
                Copy as Templ
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
