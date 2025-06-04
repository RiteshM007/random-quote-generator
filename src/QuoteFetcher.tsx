import React, { useState, useEffect, useCallback } from 'react';

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
  },
  {
    content: "The only limit to our realization of tomorrow is our doubts of today.",
    author: "Franklin D. Roosevelt"
  },
  {
    content: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  },
  {
    content: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair"
  },
  {
    content: "Success is walking from failure to failure with no loss of enthusiasm.",
    author: "Winston Churchill"
  },
  {
    content: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela"
  },
  {
    content: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    content: "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs"
  },
  {
    content: "If life were predictable it would cease to be life, and be without flavor.",
    author: "Eleanor Roosevelt"
  },
  {
    content: "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    author: "Oprah Winfrey"
  },
  {
    content: "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
    author: "James Cameron"
  },
  {
    content: "Life is what happens when you're busy making other plans.",
    author: "John Lennon"
  },
  {
    content: "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
    author: "Mother Teresa"
  },
  {
    content: "When you reach the end of your rope, tie a knot in it and hang on.",
    author: "Franklin D. Roosevelt"
  },
  {
    content: "Always remember that you are absolutely unique. Just like everyone else.",
    author: "Margaret Mead"
  },
  {
    content: "Don't judge each day by the harvest you reap but by the seeds that you plant.",
    author: "Robert Louis Stevenson"
  },
  {
    content: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    content: "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    author: "Benjamin Franklin"
  },
  {
    content: "The best and most beautiful things in the world cannot be seen or even touched — they must be felt with the heart.",
    author: "Helen Keller"
  },
  {
    content: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle"
  },
  {
    content: "Whoever is happy will make others happy too.",
    author: "Anne Frank"
  },
  {
    content: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    author: "Ralph Waldo Emerson"
  },
  {
    content: "You will face many defeats in life, but never let yourself be defeated.",
    author: "Maya Angelou"
  }
];

interface QuoteFetcherProps {
  interval?: number;
  children: (quote: Quote, refresh: () => void, loading: boolean, showPreviousQuote: () => void, hasPreviousQuotes: boolean) => React.ReactNode;
}

const QuoteFetcher: React.FC<QuoteFetcherProps> = ({
  interval = 8000,
  children
}) => {
  const [quote, setQuote] = useState<Quote>(fallbackQuotes[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quoteHistory, setQuoteHistory] = useState<Quote[]>([fallbackQuotes[0]]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);

  const getRandomQuote = useCallback(() => {
    return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
  }, []);

  const fetchQuote = useCallback(() => {
    setLoading(true);
    setError(null);
    const newQuote = getRandomQuote();
    setQuote(newQuote);
    setQuoteHistory(prev => {
      const newHistory = [...prev, newQuote];
      return newHistory;
    });
    setCurrentHistoryIndex(prev => prev + 1);
    setLoading(false);
  }, [getRandomQuote]);

  const showPreviousQuote = useCallback(() => {
    if (currentHistoryIndex > 0) {
      const newIndex = currentHistoryIndex - 1;
      setCurrentHistoryIndex(newIndex);
      setQuote(quoteHistory[newIndex]);
    }
  }, [currentHistoryIndex, quoteHistory]);

  useEffect(() => {
    fetchQuote();
    const timer = setInterval(fetchQuote, interval);
    return () => clearInterval(timer);
  }, [fetchQuote, interval]);

  return (
    <>
      {children(quote, fetchQuote, loading, showPreviousQuote, currentHistoryIndex > 0)}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500/10 text-red-500 px-4 py-2 rounded-full text-sm animate-fade-in">
          {error}
        </div>
      )}
    </>
  );
};

export default QuoteFetcher; 