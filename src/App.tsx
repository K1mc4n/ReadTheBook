
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './index.css';

const chapters = ['intro', 'chapter1', 'chapter2'];

function App() {
  const [activeChapter, setActiveChapter] = useState('intro');
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    fetch(`/content/${activeChapter}.md`)
      .then((res) => res.text())
      .then((text) => setMarkdownContent(text));
  }, [activeChapter]);

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">📘 Chapters</h2>
        {chapters.map((chapter) => (
          <button
            key={chapter}
            onClick={() => setActiveChapter(chapter)}
            className={`block w-full text-left p-2 rounded hover:bg-purple-100 ${
              activeChapter === chapter ? 'bg-purple-200 font-bold' : ''
            }`}
          >
            {chapter.replace('chapter', 'Chapter ').replace('intro', 'Introduction')}
          </button>
        ))}
      </aside>
      <main className="flex-1 p-8 prose max-w-none">
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </main>
    </div>
  );
}

export default App;
