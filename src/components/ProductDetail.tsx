import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, ArrowLeft, Heart, Share2, Info, ChevronDown } from 'lucide-react';
import { Button, Badge, SectionHeading } from './UI';
import { useLanguage } from './LanguageContext';

export const ProductDetail = ({ product, onBack }: { product: any, onBack: () => void }) => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || { color: 'Standard', image: product?.image });
  const [activeImage, setActiveImage] = useState(selectedVariant.image);
  const { t, isRTL } = useLanguage();

  // Mapping product names to translation keys
  const getProductTranslationKey = (name: string) => {
    const map: { [key: string]: string } = {
      'Kinetic Shell': 'kineticShell',
      'Draftsman Trousers': 'draftsmanTrousers',
      'Void Knit': 'voidKnit',
      'Observer Parka': 'observerParka'
    };
    return map[name] || name;
  };

  // Sync state if product changes
  useEffect(() => {
    if (product?.variants?.length > 0) {
      setSelectedVariant(product.variants[0]);
      setActiveImage(product.variants[0].image);
    } else {
      setActiveImage(product?.image);
    }
  }, [product]);

  const handleVariantChange = (variant: any) => {
    setSelectedVariant(variant);
    setActiveImage(variant.image);
  };

  if (!product) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[110] bg-background overflow-y-auto"
    >
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Gallery */}
        <div className="w-full lg:w-2/3 h-[60vh] lg:h-screen sticky top-0 bg-card/30 flex flex-col md:flex-row gap-0 overflow-y-auto custom-scrollbar">
          <div className="w-full h-full relative overflow-hidden bg-card/10">
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                src={activeImage} 
                className="w-full h-full object-cover grayscale"
                alt={product.name}
              />
            </AnimatePresence>
            
            {/* Color Overlay Hint */}
            <div className={`absolute bottom-12 ${isRTL ? 'right-12' : 'left-12'} flex items-center gap-4 bg-background/80 backdrop-blur-md px-6 py-3 border border-card-border`}>
               <div className="w-4 h-4 rounded-full border border-card-border" style={{ backgroundColor: selectedVariant.hex || '#000' }}></div>
               <span className="text-[10px] text-foreground uppercase font-black tracking-[0.2em]">{selectedVariant.color}</span>
            </div>
          </div>
          
          <div className="w-full h-full bg-card/20 hidden md:block border-l border-card-border">
            <img 
              src="https://images.unsplash.com/photo-1618470342208-9b2c2bf3a4e9?auto=format&fit=crop&q=80&w=800" 
              className="w-full h-full object-cover opacity-30 grayscale"
              alt="Detail"
            />
          </div>
        </div>

        {/* Info Container */}
        <div className="w-full lg:w-1/3 bg-background p-8 lg:p-16 flex flex-col justify-between border-l border-card-border">
          <div className="space-y-12">
            <button 
              onClick={onBack}
              className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest hover:text-muted-text transition-colors"
            >
              <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} /> {t('backToCollection')}
            </button>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge>{t('limitedDrop')}</Badge>
                <span className="text-[10px] text-muted-text uppercase tracking-widest font-bold">{t('ref')}: {product.id}00-JV-26</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
                {t(getProductTranslationKey(product.name))}
              </h1>
              <div className="flex items-end gap-6">
                <p className="text-2xl font-mono text-foreground">${product.price}</p>
                <p className="text-[10px] text-muted-text uppercase font-black tracking-widest pb-1.5">{t('freeGlobalCourier')}</p>
              </div>
            </div>

            {/* Color Switcher */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-text">{t('selectVariant')}</label>
                <div className="flex gap-4">
                  {product.variants.map((v: any, i: number) => (
                    <button 
                      key={i}
                      onClick={() => handleVariantChange(v)}
                      className={`group relative p-1 border transition-all duration-300 ${
                        selectedVariant.color === v.color ? 'border-foreground' : 'border-transparent hover:border-card-border'
                      }`}
                    >
                      <div 
                        className="w-10 h-10 shadow-inner border border-card-border" 
                        style={{ backgroundColor: v.hex }}
                      />
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        <span className="text-[8px] font-black uppercase tracking-widest">{v.color}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-text">{t('selectSize')}</label>
                  <button className="text-[9px] font-bold text-foreground uppercase tracking-widest border-b border-foreground">{t('sizeMatrix')}</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 border text-xs font-bold transition-all ${
                        selectedSize === size ? 'bg-foreground text-background border-foreground' : 'border-card-border hover:border-foreground'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <Button className="w-full h-16 text-sm">{t('addToVault')}</Button>
              <div className="flex gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 border border-card-border h-14 hover:border-foreground transition-colors">
                  <Heart className="w-4 h-4" /> <span className="text-[10px] uppercase font-bold tracking-widest">{t('wishlist')}</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 border border-card-border h-14 hover:border-foreground transition-colors">
                  <Share2 className="w-4 h-4" /> <span className="text-[10px] uppercase font-bold tracking-widest">{t('share')}</span>
                </button>
              </div>
            </div>

            <div className="border-t border-card-border pt-8 space-y-6">
              {[
                { title: t('composition'), content: '100% Technical Nylon, Made in London' },
                { title: t('shippingReturns'), content: 'Free worldwide express delivery. 14-day returns.' },
                { title: t('sustainabilityRecord'), content: 'Carbon neutral shipping. Fully recyclable packaging.' },
              ].map((item, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="flex items-center justify-between py-2">
                    <h3 className="text-[11px] font-black uppercase tracking-widest">{item.title}</h3>
                    <ChevronDown className="w-4 h-4 text-muted-text group-hover:text-foreground transition-colors" />
                  </div>
                  <p className="text-[10px] text-muted-text font-medium leading-relaxed hidden group-hover:block pb-4 animate-in fade-in slide-in-from-top-1">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24">
             <div className={`flex items-center gap-4 p-6 bg-card border-l-4 border-foreground`}>
               <Info className="w-5 h-5 text-foreground" />
               <p className="text-[10px] uppercase tracking-widest font-bold text-muted-text">
                 {t('selectedInfo')}: {selectedVariant.color} / {selectedSize}. {t('limitedBatch')}.
               </p>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
