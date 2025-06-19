import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

function App() {
  const [files, setFiles] = useState<string[]>([]);
  const [markdownContent, setMarkdownContent] = useState<Record<string, string>>({});
  const [selectedFile, setSelectedFile] = useState('intro.md');

  useEffect(() => {
    // Menentukan judul tab browser
    document.title = "📚 Farcaster Story";

    // Daftar file markdown yang akan dimuat
    const fileNames = ['intro.md', 'chapter1.md', 'chapter2.md', 'JakePhilosophy.md'];
    setFiles(fileNames);

    // Ambil konten markdown dari folder public/content
    fileNames.forEach((file) => {
      fetch(`/content/${file}`)
        .then(res => res.text())
        .then(text => {
          setMarkdownContent(prev => ({ ...prev, [file]: text }));
        });
    });
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Judul utama di halaman */}
      <h1 className="text-2xl font-bold mb-4">📚 Farcaster Story</h1>

      {/* Tombol pilihan chapter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {files.map(file => (
          <button
            key={file}
            className={`border px-4 py-2 rounded ${
              selectedFile === file ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => setSelectedFile(file)}
          >
            {file.replace('.md', '')}
          </button>
        ))}
      </div>

      {/* Konten Markdown */}
      <div className="prose">
        <ReactMarkdown>
          {markdownContent[selectedFile] || 'Loading...'}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default App;
