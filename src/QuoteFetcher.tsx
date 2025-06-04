import React, { useState, useEffect } from 'react';

interface Quote {
  content: string;
  author: string;
}

// Fallback quotes in case API fails
const fallbackQuotes: Quote[] = [
  {
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    content: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs"
  },
  {
    content: "Stay hungry, stay foolish.",
    author: "Steve Jobs"
  },
  {
    content: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs"
  },
  {
    content: "Design is not just what it looks like and feels like. Design is how it works.",
    author: "Steve Jobs"
  }
];

interface QuoteFetcherProps {
  interval?: number;
  children: (quote: Quote, refresh: () => void, loading: boolean) => React.ReactNode;
}

const QuoteFetcher: React.FC<QuoteFetcherProps> = ({ 
  interval = 8000,
  children 
}) => {
  const [quote, setQuote] = useState<Quote>(fallbackQuotes[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      // Using Quotable API which is CORS-friendly
      const response = await fetch('https://api.quotable.io/random');
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      const data = await response.json();
      setQuote({
        content: data.content,
        author: data.author
      });
    } catch (err) {
      console.error('Error fetching quote:', err);
      setError('Failed to fetch quote');
      // Use a random fallback quote
      const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
      setQuote(fallbackQuotes[randomIndex]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
    const timer = setInterval(fetchQuote, interval);
    return () => clearInterval(timer);
  }, [interval]);

  const refresh = () => {
    fetchQuote();
  };

  return (
    <>
      {children(quote, refresh, loading)}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500/10 text-red-500 px-4 py-2 rounded-full text-sm">
          {error}
        </div>
      )}
    </>
  );
};

export default QuoteFetcher; 