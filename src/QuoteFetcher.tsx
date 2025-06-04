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
      // Try multiple APIs in sequence
      const apis = [
        'https://api.quotable.io/random',
        'https://api.quotable.io/quotes/random',
        'https://api.quotable.io/quotes'
      ];

      let response = null;
      let data = null;

      // Try each API until one works
      for (const api of apis) {
        try {
          response = await fetch(api);
          if (response.ok) {
            data = await response.json();
            break;
          }
        } catch (e) {
          console.log(`Failed to fetch from ${api}, trying next...`);
          continue;
        }
      }

      if (!data) {
        throw new Error('All APIs failed');
      }

      // Handle different API response formats
      let quoteData: Quote;
      if (Array.isArray(data)) {
        // Handle array response
        const randomQuote = data[Math.floor(Math.random() * data.length)];
        quoteData = {
          content: randomQuote.content || randomQuote.text,
          author: randomQuote.author
        };
      } else {
        // Handle single quote response
        quoteData = {
          content: data.content || data.text,
          author: data.author
        };
      }

      setQuote(quoteData);
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