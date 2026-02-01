import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, ChevronDown, X, Search, SlidersHorizontal, ArrowRight, Loader2 } from 'lucide-react';
import { SectionHeading, Badge, Button } from './UI';
import { useLanguage } from './LanguageContext';
import { projectId } from '../utils/supabase/info';

export const Shop = ({ onProductSelect }: { onProductSelect: (p: any) => void }) => {
  const [activeSegment, setActiveSegment] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latestArrivals');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [inventory, setInventory] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t, isRTL } = useLanguage();

  const SEGMENTS = ['All', 'Men', 'Women', 'Kids'];
  const CATEGORIES = ['All', 'Outerwear', 'Tailoring', 'Knitwear', 'Accessories'];
  const SORT_OPTIONS = [
    { id: 'latestArrivals', label: 'latestArrivals' },
    { id: 'priceLowHigh', label: 'priceLowHigh' },
    { id: 'priceHighLow', label: 'priceHighLow' }
  ];

  const fetchInventory = async () => {
    try {
      const res = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-4138cd39/inventory`);
      const data = await res.json();
      setInventory(data);
    } catch (err) {
      console.error("Shop: Inventory fetch failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const baseProducts = [
    { 
      id: 1, 
      name: 'Kinetic Shell', 
      translationKey: 'kineticShell',
      price: 420, 
      category: 'Outerwear', 
      segment: 'Men',
      image: 'https://images.unsplash.com/photo-1634552897937-1297c485f598?auto=format&fit=crop&q=80&w=800',
      tags: ['New', 'Limited'],
      variants: [
        { color: 'Charcoal', hex: '#1A1A1A', image: 'https://images.unsplash.com/photo-1634552897937-1297c485f598?auto=format&fit=crop&q=80&w=800' },
        { color: 'Ghost', hex: '#E5E5E5', image: 'https://images.unsplash.com/photo-1618470342208-9b2c2bf3a4e9?auto=format&fit=crop&q=80&w=800' }
      ]
    },
    { 
      id: 2, 
      name: 'Draftsman Trousers', 
      translationKey: 'draftsmanTrousers',
      price: 280, 
      category: 'Tailoring', 
      segment: 'Women',
      image: 'https://images.unsplash.com/photo-1739616194392-ee37d7584484?auto=format&fit=crop&q=80&w=800', 
      tags: ['Classic'],
      variants: [
        { color: 'Deep Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1739616194392-ee37d7584484?auto=format&fit=crop&q=80&w=800' },
        { color: 'Olive', hex: '#3D4035', image: 'https://images.unsplash.com/photo-1642761733235-b3f7f56f251c?auto=format&fit=crop&q=80&w=800' }
      ]
    },
    { 
      id: 3, 
      name: 'Void Knit', 
      translationKey: 'voidKnit',
      price: 350, 
      category: 'Knitwear', 
      segment: 'Kids',
      image: 'https://images.unsplash.com/photo-1642761733235-b3f7f56f251c?auto=format&fit=crop&q=80&w=800', 
      tags: ['Sold Out'],
      variants: [
        { color: 'Void', hex: '#0A0A0A', image: 'https://images.unsplash.com/photo-1642761733235-b3f7f56f251c?auto=format&fit=crop&q=80&w=800' }
      ]
    },
    { 
      id: 4, 
      name: 'Observer Parka', 
      translationKey: 'observerParka',
      price: 580, 
      category: 'Outerwear', 
      segment: 'Men',
      image: 'https://images.unsplash.com/photo-1601926299866-6a5c9bfa6be0?auto=format&fit=crop&q=80&w=800', 
      tags: ['Archive'],
      variants: [
        { color: 'Industrial Gray', hex: '#4A4A4A', image: 'https://images.unsplash.com/photo-1601926299866-6a5c9bfa6be0?auto=format&fit=crop&q=80&w=800' }
      ]
    },
  ];

  const productsWithStock = useMemo(() => {
    if (!inventory) return baseProducts;
    return baseProducts.map(p => {
      const stockInfo = inventory[p.id.toString()];
      const isSoldOut = stockInfo ? stockInfo.stock <= 0 : false;
      return {
        ...p,
        isSoldOut,
        tags: isSoldOut ? [...p.tags.filter(t => t !== 'Sold Out'), 'Sold Out'] : p.tags.filter(t => t !== 'Sold Out')
      };
    });
  }, [inventory]);

  const filteredProducts = useMemo(() => {
    let result = productsWithStock.filter(p => {
      const matchesSegment = activeSegment === 'All' || p.segment === activeSegment;
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           t(p.translationKey).toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      
      return matchesSegment && matchesCategory && matchesSearch && matchesPrice;
    });

    if (sortBy === 'priceLowHigh') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceHighLow') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeSegment, activeCategory, searchQuery, sortBy, priceRange, t, productsWithStock]);

  if (isLoading) {
    return (
      <div className="pt-32 min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-text" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen transition-colors duration-500">
      {/* Shop Header */}
      <div className="px-6 lg:px-24 mb-8">
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-card-border pb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          <SectionHeading subtitle={t('shop')} className="mb-0">{t('collection')}<br />{t('archetype')} 01</SectionHeading>
          
          <div className="flex flex-wrap items-center gap-4 md:gap-8">
            <div className="relative w-full md:w-64">
              <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text`} />
              <input 
                type="text" 
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full bg-card border-none ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3 text-[10px] font-black tracking-widest uppercase outline-none focus:ring-1 focus:ring-foreground text-foreground`}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2`}>
                  <X className="w-3 h-3 text-muted-text hover:text-foreground" />
                </button>
              )}
            </div>

            <div className="hidden md:flex gap-6 items-center">
              <div className="flex bg-card p-1 mr-4 border border-card-border">
                {SEGMENTS.map(seg => (
                  <button 
                    key={seg}
                    onClick={() => setActiveSegment(seg)}
                    className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${activeSegment === seg ? 'bg-foreground text-background' : 'text-muted-text hover:text-foreground'}`}
                  >
                    {t(seg.toLowerCase())}
                  </button>
                ))}
              </div>
              <div className="h-4 w-px bg-card-border mr-2"></div>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[11px] font-black uppercase tracking-widest transition-colors ${activeCategory === cat ? 'underline underline-offset-4' : 'text-muted-text hover:text-foreground'}`}
                >
                  {t(cat.toLowerCase())}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-widest border px-6 py-3 transition-colors ${isFilterOpen ? 'bg-foreground text-background border-foreground' : 'border-foreground text-foreground hover:bg-card'}`}
            >
              <Filter className="w-4 h-4" /> {isFilterOpen ? t('close') : t('filterSort')}
            </button>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-card border-b border-card-border mb-12"
          >
            <div className="px-6 lg:px-24 py-12 grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-text">{t('sortBy')}</h4>
                <div className="flex flex-col gap-4">
                  {SORT_OPTIONS.map(opt => (
                    <button 
                      key={opt.id}
                      onClick={() => setSortBy(opt.id)}
                      className={`text-left text-[11px] font-black uppercase tracking-widest ${sortBy === opt.id ? 'underline' : 'text-foreground hover:underline'}`}
                    >
                      {t(opt.label)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6 md:col-span-2">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-text">{t('priceRange')} (USD)</h4>
                <div className="space-y-8 pr-12">
                  <div className="flex justify-between text-[11px] font-mono text-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="1000" 
                    step="50"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-foreground"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-end gap-4">
                 <button 
                   onClick={() => {
                     setActiveSegment('All');
                     setActiveCategory('All');
                     setSearchQuery('');
                     setSortBy('latestArrivals');
                     setPriceRange([0, 1000]);
                   }}
                   className="text-[10px] font-black uppercase tracking-widest text-muted-text hover:text-foreground underline underline-offset-4"
                 >
                   {t('resetAll')}
                 </button>
                 <Button onClick={() => setIsFilterOpen(false)} className="w-full py-4">{t('applyProtocol')}</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count & Active Filters */}
      {(searchQuery || activeCategory !== 'All' || activeSegment !== 'All' || sortBy !== 'latestArrivals' || priceRange[1] < 1000) && (
        <div className="px-6 lg:px-24 mb-12 flex flex-wrap gap-4 items-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-text mr-4">{t('active')}:</p>
          {activeSegment !== 'All' && <Badge className="bg-foreground text-background">{t(activeSegment.toLowerCase())}</Badge>}
          {activeCategory !== 'All' && <Badge className="bg-foreground text-background">{t(activeCategory.toLowerCase())}</Badge>}
          {searchQuery && <Badge className="bg-foreground text-background">"{searchQuery}"</Badge>}
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-text ml-auto">
            {filteredProducts.length} {t('results')}
          </span>
        </div>
      )}

      {/* Product Grid */}
      <div className="px-6 lg:px-24">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`group cursor-pointer ${product.isSoldOut ? 'opacity-60 grayscale cursor-not-allowed' : ''}`}
                onClick={() => !product.isSoldOut && onProductSelect(product)}
              >
                <div className="relative aspect-[3/4] bg-card mb-6 overflow-hidden border border-card-border">
                  <img 
                    src={product.image} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    alt={t(product.translationKey)}
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {product.tags.map(tag => (
                      <Badge key={tag} className={tag === 'Sold Out' ? 'bg-foreground text-background' : ''}>{tag}</Badge>
                    ))}
                  </div>
                  
                  {!product.isSoldOut && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                       <Button className="w-full bg-background text-foreground hover:bg-foreground hover:text-background py-3 border-none">{t('quickAdd')}</Button>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-tighter text-foreground">{t(product.translationKey)}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-[10px] text-muted-text uppercase tracking-widest font-bold">{t(product.category.toLowerCase())}</p>
                      <span className="text-[8px] text-muted-text">•</span>
                      <p className="text-[10px] text-muted-text uppercase tracking-widest font-bold">{product.variants?.length || 1} {t('colors')}</p>
                    </div>
                  </div>
                  <p className="text-sm font-mono text-foreground">${product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center space-y-8">
            <Search className="w-12 h-12 text-muted-text mx-auto" />
            <h3 className="text-xl font-black uppercase tracking-tighter text-foreground">{t('noRecords')}</h3>
            <Button onClick={() => { setActiveCategory('All'); setActiveSegment('All'); setSearchQuery(''); setPriceRange([0, 1000]); }} className="mx-auto">{t('clearAll')}</Button>
          </div>
        )}
      </div>
    </div>
  );
};
