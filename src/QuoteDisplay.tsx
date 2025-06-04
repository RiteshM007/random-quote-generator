import React, { JSX } from 'react';
import QuoteFetcher from './QuoteFetcher';

interface Quote {
  content: string;
  author: string;
}

const QuoteDisplay: React.FC = () => {
  return (
    <QuoteFetcher>
      {(quote, refresh, loading, showPreviousQuote, hasPreviousQuotes) => {
        console.log('QuoteDisplay render:', { hasPreviousQuotes, loading });
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 p-4">
            <div className="max-w-2xl w-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 transform transition-all duration-500 hover:scale-[1.02]">
              <div className="space-y-6">
                <div className="relative min-h-[200px] flex items-center">
                  <div className="absolute -top-4 -left-4 text-6xl text-purple-500/20">"</div>
                  <p className="text-2xl md:text-3xl font-light text-gray-800 leading-relaxed pl-8">
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                      </span>
                    ) : (
                      quote.content
                    )}
                  </p>
                  <div className="absolute -bottom-4 -right-4 text-6xl text-purple-500/20 rotate-180">"</div>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-lg text-gray-600 italic">
                    — {loading ? '...' : quote.author}
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={showPreviousQuote}
                      className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
                        hasPreviousQuotes 
                          ? 'bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 active:scale-95' 
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={!hasPreviousQuotes || loading}
                      title={hasPreviousQuotes ? "View previous quote" : "No previous quotes"}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Previous
                    </button>
                    <button
                      onClick={refresh}
                      disabled={loading}
                      className="px-4 py-2 bg-purple-500/10 text-purple-600 rounded-full hover:bg-purple-500/20 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                      title={loading ? "Loading..." : "Get next quote"}
                    >
                      {loading ? (
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                        </svg>
                      )}
                      Next Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </QuoteFetcher>
  );
};

export default QuoteDisplay; 