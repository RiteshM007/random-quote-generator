import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuoteFetcher from './QuoteFetcher';
import AnimatedBackground from './AnimatedBackground';
import CustomizationPanel from './CustomizationPanel';

interface Quote {
  content: string;
  author: string;
}

const LoadingIndicator = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <motion.div
      className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const QuoteVisualizer: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [favorites, setFavorites] = useState<Quote[]>([]);
  const [history, setHistory] = useState<Quote[]>([]);
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (quote: Quote) => {
    return favorites.some(fav => fav.content === quote.content && fav.author === quote.author);
  };

  const toggleFavorite = (quote: Quote) => {
    setFavorites(prev => {
      const isFav = isFavorite(quote);
      if (isFav) {
        return prev.filter(fav => !(fav.content === quote.content && fav.author === quote.author));
      } else {
        return [...prev, quote];
      }
    });
  };

  const addToHistory = (quote: Quote) => {
    setHistory(prev => {
      const newHistory = [quote, ...prev.slice(0, 9)]; // Keep last 10 quotes
      return newHistory;
    });
  };

  const handleQuoteChange = (quote: Quote) => {
    setCurrentQuote(quote);
    addToHistory(quote);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <AnimatedBackground />
      </div>
      
      <QuoteFetcher interval={8000}>
        {(quote, refresh, loading) => (
          <>
            <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
              <div className="max-w-4xl mx-auto text-center">
                <AnimatePresence mode="wait">
                  {loading ? (
                    <LoadingIndicator />
                  ) : (
                    <motion.div
                      key={quote.content}
                      initial={{ opacity: 0, y: 50, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -50, scale: 0.9 }}
                      transition={{ 
                        duration: 0.8,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      className="space-y-8"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <motion.p 
                          className="text-3xl md:text-5xl lg:text-6xl font-light leading-relaxed text-white"
                          style={{
                            textShadow: '0 0 30px rgba(255, 255, 255, 0.15)'
                          }}
                        >
                          "{quote.content}"
                        </motion.p>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <motion.p 
                          className="text-xl md:text-2xl font-medium text-gray-300"
                          style={{
                            textShadow: '0 0 20px rgba(255, 255, 255, 0.1)'
                          }}
                        >
                          — {quote.author}
                        </motion.p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mt-12 flex items-center justify-center space-x-4"
                      >
                        <button
                          onClick={refresh}
                          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full 
                                   transition-all duration-300 backdrop-blur-sm
                                   border border-white/20 hover:border-white/30
                                   focus:outline-none focus:ring-2 focus:ring-white/30"
                        >
                          Next Quote
                        </button>
                        <button
                          onClick={() => toggleFavorite(quote)}
                          className={`p-3 rounded-full transition-all duration-300 backdrop-blur-sm
                                   border border-white/20 hover:border-white/30
                                   focus:outline-none focus:ring-2 focus:ring-white/30
                                   ${isFavorite(quote) ? 'bg-yellow-400/20 text-yellow-400' : 'bg-white/10 text-white hover:bg-white/20'}`}
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setIsPanelOpen(true)}
                          className="p-3 rounded-full transition-all duration-300 backdrop-blur-sm
                                   border border-white/20 hover:border-white/30
                                   focus:outline-none focus:ring-2 focus:ring-white/30
                                   bg-white/10 text-white hover:bg-white/20"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 6h16M4 12h16M4 18h16"
                            />
                          </svg>
                        </button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <CustomizationPanel
              isOpen={isPanelOpen}
              onClose={() => setIsPanelOpen(false)}
              favorites={favorites}
              history={history}
              onToggleFavorite={toggleFavorite}
              onSelectQuote={handleQuoteChange}
              isFavorite={isFavorite}
            />
          </>
        )}
      </QuoteFetcher>
    </div>
  );
};

export default QuoteVisualizer; 