import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search as SearchIcon, X, ArrowRight, History } from 'lucide-react';

export const SearchOverlay = ({ isOpen, onClose, onSearch }: { isOpen: boolean, onClose: () => void, onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('');
  
  const trendingSearches = ['KINETIC SHELL', 'VOID KNIT', 'PARKA', 'ARCHIVE 01'];
  const recentSearches = ['TROUSERS', 'OUTERWEAR'];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-background flex flex-col p-6 lg:p-24 transition-colors duration-500"
        >
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 lg:top-12 lg:right-24 hover:rotate-90 transition-transform p-2 text-foreground"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="max-w-4xl mx-auto w-full pt-20">
            <form onSubmit={handleSubmit} className="relative mb-24">
              <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-foreground" />
              <input 
                autoFocus
                type="text"
                placeholder="SEARCH THE ARCHIVE..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent border-b-2 border-foreground pl-14 pb-6 text-4xl lg:text-7xl font-black uppercase tracking-tighter outline-none focus:border-foreground/50 transition-colors text-foreground"
              />
              <button 
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 group text-foreground"
              >
                <ArrowRight className="w-10 h-10 group-hover:translate-x-4 transition-transform" />
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
              <div className="space-y-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-text">Trending Now</h3>
                <div className="flex flex-col gap-6">
                  {trendingSearches.map((item) => (
                    <button 
                      key={item}
                      onClick={() => { setQuery(item); onSearch(item); onClose(); }}
                      className="text-left text-xl font-black uppercase tracking-tighter hover:underline underline-offset-4 transition-colors text-foreground"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-text">Recent Queries</h3>
                <div className="flex flex-col gap-6">
                  {recentSearches.map((item) => (
                    <button 
                      key={item}
                      onClick={() => { setQuery(item); onSearch(item); onClose(); }}
                      className="flex items-center gap-4 text-left text-xl font-black uppercase tracking-tighter text-muted-text hover:text-foreground transition-colors"
                    >
                      <History className="w-4 h-4" /> {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-12 border-t border-card-border flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-muted-text">
            <span>Archive Search Protocol v1.0</span>
            <span>Ref: SEARCH-SECURE</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
