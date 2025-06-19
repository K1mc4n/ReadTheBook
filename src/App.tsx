import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const fileNames = ['intro.md', 'chapter1.md', 'chapter2.md', 'JakePhilosophy.md'];

function App() {
  const [markdownContent, setMarkdownContent] = useState<Record<string, string>>({});

  useEffect(() => {
    fileNames.forEach((file) => {
      fetch(`/content/${file}`)
        .then((res) => res.text())
        .then((text) => {
          setMarkdownContent((prev) => ({ ...prev, [file]: text }));
        });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold">📚 Read The Book</h1>
        <p className="text-gray-500">Enjoy structured, chapter-based markdown reading</p>
      </header>

      {/* Main Content */}
      <main className="px-4 py-8 max-w-3xl mx-auto">
        {fileNames.map((file) => (
          <article key={file} className="mb-12">
            <h2 className="text-xl font-semibold mb-2">{formatTitle(file)}</h2>
            <div className="prose prose-lg">
              <ReactMarkdown>{markdownContent[file]}</ReactMarkdown>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}

function formatTitle(file: string) {
  const name = file.replace('.md', '');
  return name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1');
}

export default App;
