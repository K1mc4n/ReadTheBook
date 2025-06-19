import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

function App() {
  const [files, setFiles] = useState<string[]>([]);
  const [markdownContent, setMarkdownContent] = useState<Record<string, string>>({});

  useEffect(() => {
    const fileNames = ['intro.md', 'chapter1.md', 'chapter2.md', 'JakePhilosophy.md'];
    setFiles(fileNames);

    fileNames.forEach((file) => {
      fetch(`/content/${file}`)
        .then(res => res.text())
        .then(text => {
          setMarkdownContent(prev => ({ ...prev, [file]: text }));
        });
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📚 Read The Book</h1>
      {files.map(file => (
        <div key={file} className="mb-8">
          <h2 className="text-xl font-semibold">{file}</h2>
          <ReactMarkdown>{markdownContent[file]}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
}

export default App;
