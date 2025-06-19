import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

// Fungsi helper untuk shuffle array (Fisher–Yates shuffle)
function shuffleArray<T>(arr: T[]): T[] {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function App() {
  const [files, setFiles] = useState<string[]>([]);
  const [markdownContent, setMarkdownContent] = useState<Record<string, string>>({});

  useEffect(() => {
    const fileNames = ['intro.md', 'chapter1.md', 'chapter2.md', 'JakePhilosophy.md'];
    const shuffled = shuffleArray(fileNames);
    setFiles(shuffled);

    shuffled.forEach((file) => {
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
          <h2 className="text-xl font-semibold mb-2">{file}</h2>
          <div className="prose prose-lg">
            <ReactMarkdown>{markdownContent[file]}</ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
