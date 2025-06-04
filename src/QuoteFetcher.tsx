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
  },
  {
    content: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    content: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    content: "The best way to predict the future is to invent it.",
    author: "Alan Kay"
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
  const [retryCount, setRetryCount] = useState(0);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      // Using a CORS proxy to avoid certificate issues
      const response = await fetch('https://cors-anywhere.herokuapp.com/http://api.quotable.io/random');
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      const data = await response.json();
      setQuote({
        content: data.content,
        author: data.author
      });
      setRetryCount(0); // Reset retry count on success
    } catch (err) {
      console.error('Error fetching quote:', err);
      setError('Failed to fetch quote. Using fallback quotes.');
      // Use a random fallback quote
      const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
      setQuote(fallbackQuotes[randomIndex]);
      
      // Increment retry count
      setRetryCount(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
    // Adjust interval based on retry count to prevent too many requests
    const adjustedInterval = retryCount > 3 ? interval * 2 : interval;
    const timer = setInterval(fetchQuote, adjustedInterval);
    return () => clearInterval(timer);
  }, [interval, retryCount]);

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