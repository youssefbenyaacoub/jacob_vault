import React from 'react';
import { motion } from 'motion/react';
import { Button, SectionHeading, Badge } from './UI';
import { ArrowRight, Info } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const products = [
  { id: 1, name: 'Kinetic Shell', price: '$420', category: 'Outerwear', image: 'https://images.unsplash.com/photo-1634552897937-1297c485f598?auto=format&fit=crop&q=80&w=800' },
  { id: 2, name: 'Draftsman Trousers', price: '$280', category: 'Tailoring', image: 'https://images.unsplash.com/photo-1739616194392-ee37d7584484?auto=format&fit=crop&q=80&w=800' },
  { id: 3, name: 'Void Knit', price: '$350', category: 'Knitwear', image: 'https://images.unsplash.com/photo-1642761733235-b3f7f56f251c?auto=format&fit=crop&q=80&w=800' },
  { id: 4, name: 'Observer Parka', price: '$580', category: 'Outerwear', image: 'https://images.unsplash.com/photo-1601926299866-6a5c9bfa6be0?auto=format&fit=crop&q=80&w=800' },
];

export const Home = ({ onProductSelect }: { onProductSelect: (p: any) => void }) => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="bg-background transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1601926299866-6a5c9bfa6be0?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover grayscale"
            alt="Hero Fashion"
          />
        </motion.div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="text-[10px] uppercase tracking-[0.6em] text-foreground font-bold mb-4 block">{t('latestDrop')} / {t('archetype')}</span>
            <h1 className="text-6xl md:text-[140px] font-black text-white leading-[0.85] tracking-tighter uppercase">
              {t('identity').split(' ').map((word, i, arr) => (
                <React.Fragment key={i}>
                  {word}{i === Math.floor(arr.length / 2) ? <br /> : ' '}
                </React.Fragment>
              ))}
            </h1>
            <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
              <Button onClick={() => {}} className="bg-white text-black hover:bg-black hover:text-white border-none min-w-[200px]">{t('shopCollection')}</Button>
              <button className="text-white text-[11px] uppercase tracking-widest font-bold flex items-center gap-2 group">
                {t('watchFilm')} <ArrowRight className={`w-4 h-4 group-hover:translate-x-2 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-12 hidden lg:block">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-gray-500 uppercase tracking-widest">Longitude</span>
            <span className="text-xs text-white font-mono">51.5074° N, 0.1278° W</span>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-32 px-6 lg:px-24">
        <SectionHeading subtitle={t('featuredDrops')}>{t('archetypeSelection')}</SectionHeading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => onProductSelect(product)}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-card mb-6 border border-card-border">
                <img 
                  src={product.image} 
                  className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110"
                  alt={product.name}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Badge>{t('limitedDrop')}</Badge>
                </div>
                <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="p-4 bg-background/90 backdrop-blur-sm border border-card-border">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-foreground">
                      <span>{t('concept')}: {product.category}</span>
                      <span className="text-foreground">{product.price}</span>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-black uppercase tracking-tighter text-foreground">{product.name}</h3>
              <p className="text-[10px] text-muted-text uppercase tracking-widest mt-1 font-bold">Ref: {product.id}00-AR-26</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="py-32 bg-black text-white px-6 lg:px-24 overflow-hidden relative border-t border-card-border">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] font-black opacity-[0.03] select-none tracking-tighter">
          {t('identity').split(' ')[0]}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
          <div>
            <SectionHeading subtitle={t('philosophy')} className="text-white">{t('clothingAsArt').split(' ').map((word, i, arr) => (
              <React.Fragment key={i}>
                {word}{i === Math.floor(arr.length / 2) ? <br /> : ' '}
              </React.Fragment>
            ))}</SectionHeading>
            <p className="text-lg text-gray-400 max-w-md leading-relaxed">
              {t('philosophyText')}
            </p>
            <div className="mt-12 space-y-8">
              {[
                { title: 'Individuality', desc: 'No mass production. Ever.' },
                { title: 'Craftsmanship', desc: 'Hand-stitched details in every seam.' },
                { title: 'Future-Proof', desc: 'Ethically sourced, sustainably designed.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group cursor-pointer">
                  <span className="text-white font-mono text-xs">0{i+1}</span>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-sm group-hover:text-white transition-colors">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
             <div className="aspect-[4/5] bg-gray-900 overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1739616194392-ee37d7584484?auto=format&fit=crop&q=80&w=800" 
                  className="w-full h-full object-cover grayscale opacity-80 transition-transform duration-[2s] group-hover:scale-105"
                  alt="Process"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[100px] font-black text-white mix-blend-difference pointer-events-none">
                  SOUL
                </div>
             </div>
             <div className="absolute -bottom-12 -left-12 p-8 bg-card text-foreground hidden xl:block shadow-2xl border border-card-border">
               <Info className="w-8 h-8 mb-4 text-[#0047FF]" />
               <p className="text-[10px] uppercase tracking-widest font-black max-w-[150px]">
                 98% Recycled Technical Fabrics used in Archetype 01.
               </p>
             </div>
          </div>
        </div>
      </section>

      {/* Lookbook */}
      <section className="py-32">
        <div className="flex flex-col lg:flex-row gap-0">
          <div className="w-full lg:w-1/2 h-[80vh] bg-card overflow-hidden group border-r border-card-border">
            <img 
              src="https://images.unsplash.com/photo-1634552897937-1297c485f598?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-110"
              alt="Lookbook 1"
            />
          </div>
          <div className="w-full lg:w-1/2 h-[80vh] bg-black p-12 lg:p-24 flex flex-col justify-center">
            <SectionHeading subtitle={t('visualRecord')} className="text-white">{t('lookbook')}<br />Vol. 26</SectionHeading>
            <p className="text-gray-500 mb-12 max-w-sm">{t('lookbookDesc')}</p>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black w-fit">{t('viewRecord')}</Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-32 px-6 lg:px-24 bg-card border-t border-card-border">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading subtitle="Community">{t('exclusiveAccess')}</SectionHeading>
          <p className="text-muted-text mb-12 font-bold uppercase tracking-widest text-[10px]">{t('newsletterText')}</p>
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="email" 
              placeholder={t('emailPlaceholder')} 
              className="flex-1 bg-background border border-card-border px-8 py-4 text-xs font-mono focus:border-foreground outline-none transition-colors text-foreground placeholder:text-muted-text"
            />
            <Button className="md:w-auto">{t('subscribe')}</Button>
          </div>
        </div>
      </section>
    </div>
  );
};
