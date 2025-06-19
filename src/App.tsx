import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

function App() {
  const [files, setFiles] = useState<string[]>([]);
  const [markdownContent, setMarkdownContent] = useState<Record<string, string>>({});

  useEffect(() => {
    // Urutan ditentukan secara manual sesuai struktur bab
    const fileNames = ['intro.md', 'chapter1.md', 'chapter2.md', 'JakePhilosophy.md'];
    setFiles(fileNames);

    fileNames.forEach((file) => {
      fetch(`/content/${file}`)
        .then((res) => res.text())
        .then((text) => {
          setMarkdownContent((prev) => ({ ...prev, [file]: text }));
        });
    });
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 Read The Book</h1>
      {files.map((file) => (
        <div key={file} className="mb-10">
          <h2 className="text-xl font-semibold mb-2">{formatTitle(file)}</h2>
          <div className="prose prose-lg">
            <ReactMarkdown>{markdownContent[file]}</ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
}

// Fungsi opsional untuk ubah nama file jadi judul
function formatTitle(file: string) {
  const name = file.replace('.md', '');
  return name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1');
}

export default App;
