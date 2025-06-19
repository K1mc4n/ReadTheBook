import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

function App() {
  const [files] = useState(['intro.md', 'chapter1.md', 'chapter2.md', 'JakePhilosophy.md']);
  const [activeFile, setActiveFile] = useState('intro.md');
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    document.title = "📚 Farcaster Story";
    fetch(`/content/${activeFile}`)
      .then(res => res.text())
      .then(setMarkdownContent);
  }, [activeFile]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <span>📚</span> Read The Book
      </h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {files.map(file => (
          <button
            key={file}
            className={`border px-3 py-1 rounded ${
              file === activeFile ? 'bg-black text-white' : 'bg-white text-black'
            }`}
            onClick={() => setActiveFile(file)}
          >
            {file.replace('.md', '')}
          </button>
        ))}
      </div>

      <div className="prose max-w-none">
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </div>
    </div>
  );
}

export default App;
