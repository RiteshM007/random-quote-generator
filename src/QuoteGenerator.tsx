import React, { useState, useEffect, useRef } from 'react';
import { FaQuoteLeft, FaSyncAlt, FaVolumeUp, FaRegCopy, FaRegHeart, FaShareAlt } from 'react-icons/fa';

interface Quote {
  text: string;
  author: string;
  category?: string;
}

const fallbackQuotes: Quote[] = [
  { text: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: 'Thomas A. Edison', category: 'Motivation' },
  { text: 'Always remember that you are absolutely unique. Just like everyone else.', author: 'Margaret Mead', category: 'Humor' },
  { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs', category: 'Work' },
  { text: 'Life is what happens when you\'re busy making other plans.', author: 'John Lennon', category: 'Life' },
  { text: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt', category: 'Dreams' },
  { text: 'Success is not final, failure is not fatal: It is the courage to continue that counts.', author: 'Winston Churchill', category: 'Success' },
  { text: 'You miss 100% of the shots you don\'t take.', author: 'Wayne Gretzky', category: 'Motivation' },
  { text: 'Whether you think you can or you think you can\'t, you\'re right.', author: 'Henry Ford', category: 'Mindset' },
  { text: 'The best way to predict the future is to invent it.', author: 'Alan Kay', category: 'Innovation' },
  { text: 'Happiness is not something ready made. It comes from your own actions.', author: 'Dalai Lama', category: 'Happiness' },
  { text: 'Dream big and dare to fail.', author: 'Norman Vaughan', category: 'Dreams' }
];

const categories = [
  'All Categories',
  ...Array.from(new Set(fallbackQuotes.map(q => q.category!)))
];

const getRandomQuote = (cat: string) => {
  const filtered = cat === 'All Categories' ? fallbackQuotes : fallbackQuotes.filter(q => q.category === cat);
  return filtered[Math.floor(Math.random() * filtered.length)];
};

const QuoteGenerator: React.FC = () => {
  const [quote, setQuote] = useState<Quote>(getRandomQuote('All Categories'));
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('All Categories');
  const [history, setHistory] = useState<Quote[]>([]);
  const [favorites, setFavorites] = useState<Quote[]>([]);
  const [activeTab, setActiveTab] = useState<'History' | 'Favorites' | 'Add'>('History');
  const [soundOn, setSoundOn] = useState(false);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  // Keyboard shortcut for generating a quote
  useEffect(() => {
    const handleSpace = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleNewQuote();
      }
    };
    window.addEventListener('keydown', handleSpace);
    return () => window.removeEventListener('keydown', handleSpace);
  });

  const handleNewQuote = () => {
    setLoading(true);
    setTimeout(() => {
      const newQuote = getRandomQuote(category);
      setQuote(newQuote);
      setHistory(prev => [newQuote, ...prev].slice(0, 10));
      setLoading(false);
      if (soundOn) speakQuote(newQuote);
    }, 400);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`);
  };

  const handleFavorite = () => {
    if (!favorites.some(f => f.text === quote.text && f.author === quote.author)) {
      setFavorites([quote, ...favorites]);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Inspirational Quote',
        text: `"${quote.text}" — ${quote.author}`
      });
    } else {
      handleCopy();
      alert('Quote copied to clipboard!');
    }
  };

  const speakQuote = (q: Quote) => {
    if ('speechSynthesis' in window) {
      const utter = new window.SpeechSynthesisUtterance(`${q.text} by ${q.author}`);
      window.speechSynthesis.speak(utter);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#f5f3ff] to-[#f1f5ff] px-2 py-6">
      {/* Header */}
      <div className="flex w-full max-w-5xl items-center justify-between mb-6">
        <h1 className="text-5xl font-bold text-purple-500 drop-shadow-sm">Inspire Me</h1>
        <div className="flex items-center gap-3">
          <select
            className="rounded-lg px-4 py-2 bg-white shadow text-gray-700 focus:ring-2 focus:ring-purple-300"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            onClick={handleNewQuote}
            className="p-2 rounded-lg bg-white shadow hover:bg-purple-100 transition"
            title="New Quote"
          >
            <FaSyncAlt className={loading ? 'animate-spin text-purple-500' : 'text-purple-500'} />
          </button>
          <button
            onClick={() => setSoundOn(s => !s)}
            className={`p-2 rounded-lg bg-white shadow hover:bg-purple-100 transition ${soundOn ? 'ring-2 ring-purple-300' : ''}`}
            title="Toggle Sound"
          >
            <FaVolumeUp className={soundOn ? 'text-purple-500' : 'text-gray-400'} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex w-full max-w-5xl gap-6">
        {/* Quote Card */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-xl px-10 py-10 flex flex-col relative min-h-[320px]">
            <div className="absolute -top-1 -left-0.5"> 
              <FaQuoteLeft className="text-4xl text-purple-100 opacity-60" />
            </div>
            <p ref={quoteRef} className="text-2xl md:text-3xl text-gray-800 font-serif leading-relaxed mb-8 whitespace-pre-line">
              {quote.text}
            </p>
            <div className="text-right mt-auto">
              <span className="text-lg text-purple-400 font-medium">— {quote.author}</span>
            </div>
            {/* Action Icons */}
            <div className="flex gap-6 mt-6 ml-2">
              <button onClick={handleCopy} className="text-gray-400 hover:text-purple-500 transition" title="Copy"><FaRegCopy size={20} /></button>
              <button onClick={handleFavorite} className="text-gray-400 hover:text-purple-500 transition" title="Favorite"><FaRegHeart size={20} /></button>
              <button onClick={handleShare} className="text-gray-400 hover:text-purple-500 transition" title="Share"><FaShareAlt size={20} /></button>
            </div>
          </div>
        </div>
        {/* Sidebar */}
        <div className="w-80 flex flex-col gap-4">
          <div className="bg-white/60 rounded-2xl shadow p-4">
            <div className="flex gap-2 mb-4">
              {(['History', 'Favorites', 'Add'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1 rounded-lg text-sm font-medium transition ${activeTab === tab ? 'bg-white shadow text-purple-500' : 'text-gray-400 hover:text-purple-500'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="min-h-[120px]">
              {activeTab === 'History' && (
                history.length === 0 ? (
                  <div className="text-gray-400 text-center py-8">No quote history available yet.</div>
                ) : (
                  <ul className="space-y-2 max-h-32 overflow-y-auto pr-2">
                    {history.map((q, i) => (
                      <li key={i} className="text-gray-600 text-sm truncate">"{q.text}" — {q.author}</li>
                    ))}
                  </ul>
                )
              )}
              {activeTab === 'Favorites' && (
                favorites.length === 0 ? (
                  <div className="text-gray-400 text-center py-8">No favorites yet.</div>
                ) : (
                  <ul className="space-y-2 max-h-32 overflow-y-auto pr-2">
                    {favorites.map((q, i) => (
                      <li key={i} className="text-gray-600 text-sm truncate">"{q.text}" — {q.author}</li>
                    ))}
                  </ul>
                )
              )}
              {activeTab === 'Add' && (
                <div className="text-gray-400 text-center py-8">Feature coming soon.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleNewQuote}
        disabled={loading}
        className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-400 to-purple-500 text-white text-lg font-semibold shadow-md hover:from-purple-500 hover:to-purple-600 transition-all focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:opacity-60 mt-10"
      >
        Generate Quote
        <FaSyncAlt className={loading ? 'animate-spin' : ''} />
      </button>

      {/* Instruction */}
      <p className="text-gray-500 text-center text-base mt-6">
        Click the button or press space to generate a new inspirational quote
      </p>
    </div>
  );
};

export default QuoteGenerator; 