'use client';

import React, { useState } from 'react';
import ReactCodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { basicSetup } from '@codemirror/basic-setup';

const HTMXCodeSandbox: React.FC = () => {
  const [code, setCode] = useState<string>('<!DOCTYPE html>\n<html>\n<body>\n<h1>Hello, HTMX!</h1>\n</body>\n</html>');

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2>HTMX Code Sandbox</h2>
      <ReactCodeMirror
        value={code}
        theme={vscodeDark}
        extensions={[basicSetup]}
        onChange={(value) => handleCodeChange(value)}
      />
      <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <h3>Output</h3>
        <iframe
          srcDoc={code}
          style={{ width: '100%', height: '300px', border: 'none' }}
        />
      </div>
    </div>
  );
};

export default HTMXCodeSandbox;
