import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const fileNames = ['intro.md', 'chapter1.md', 'chapter2.md', 'JakePhilosophy.md'];

function App() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [markdown, setMarkdown] = useState<string>('');

  useEffect(() => {
    if (selectedFile) {
      fetch(`/content/${selectedFile}`)
        .then((res) => res.text())
        .then(setMarkdown);
    }
  }, [selectedFile]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans px-4 py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 Read The Book</h1>

      {/* Daftar Bab */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        {fileNames.map((file) => (
          <button
            key={file}
            onClick={() => setSelectedFile(file)}
            className={`px-4 py-2 rounded border ${
              selectedFile === file ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'
            } hover:bg-blue-500 hover:text-white transition`}
          >
            {formatTitle(file)}
          </button>
        ))}
      </div>

      {/* Konten Markdown */}
      {selectedFile && (
        <div className="prose prose-lg bg-white p-6 rounded shadow">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

function formatTitle(file: string) {
  const name = file.replace('.md', '');
  return name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1');
}

export default App;
