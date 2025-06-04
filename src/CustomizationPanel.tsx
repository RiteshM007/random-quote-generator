import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Quote {
  content: string;
  author: string;
}

interface CustomizationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Quote[];
  history: Quote[];
  onToggleFavorite: (quote: Quote) => void;
  onSelectQuote: (quote: Quote) => void;
  isFavorite: (quote: Quote) => boolean;
}

const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  isOpen,
  onClose,
  favorites,
  history,
  onToggleFavorite,
  onSelectQuote,
  isFavorite,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-black/80 backdrop-blur-md 
                     border-l border-white/10 shadow-2xl z-50 overflow-hidden"
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-light text-white">Customize</h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-white/10">
                <button className="flex-1 py-4 text-white/70 hover:text-white transition-colors border-b-2 border-white">
                  Favorites
                </button>
                <button className="flex-1 py-4 text-white/70 hover:text-white transition-colors">
                  History
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-4">
                  {favorites.map((quote, index) => (
                    <motion.div
                      key={`${quote.content}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                      onClick={() => onSelectQuote(quote)}
                    >
                      <p className="text-white/90 mb-2">"{quote.content}"</p>
                      <div className="flex items-center justify-between">
                        <p className="text-white/60 text-sm">— {quote.author}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(quote);
                          }}
                          className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                          <svg
                            className={`w-5 h-5 ${isFavorite(quote) ? 'text-yellow-400' : 'text-white/40'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CustomizationPanel; 