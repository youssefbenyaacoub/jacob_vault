import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading, Button } from './UI';
import { Layers, Zap, Shield, Recycle } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export const Philosophy = () => {
  const { t, isRTL } = useLanguage();

  const PILLARS = [
    { icon: Layers, title: t('pillar1Title'), desc: t('pillar1Desc') },
    { icon: Zap, title: t('pillar2Title'), desc: t('pillar2Desc') },
    { icon: Shield, title: t('pillar3Title'), desc: t('pillar3Desc') },
    { icon: Recycle, title: t('pillar4Title'), desc: t('pillar4Desc') },
  ];
  
  return (
    <div className="bg-background pt-32 pb-24 transition-colors duration-500">
      {/* Intro */}
      <section className={`px-6 lg:px-24 mb-32 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className={isRTL ? 'order-1 lg:order-2' : ''}>
          <SectionHeading subtitle={t('foundation')}>{t('manifesto').split('™')[0]}™<br />{t('manifesto').split('™')[1]}</SectionHeading>
          <div className="space-y-8 text-muted-text text-lg leading-relaxed font-medium">
            <p>{t('manifestoText1')}</p>
            <p>{t('manifestoText2')}</p>
          </div>
        </div>
        <div className={`relative aspect-square overflow-hidden bg-black border border-card-border ${isRTL ? 'order-2 lg:order-1' : ''}`}>
          <img 
            src="https://images.unsplash.com/photo-1618470342208-9b2c2bf3a4e9?auto=format&fit=crop&q=80&w=1200" 
            className="w-full h-full object-cover grayscale opacity-60"
            alt="Manifesto"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-9xl font-black uppercase tracking-tighter opacity-10">CORE</div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-foreground text-background py-32 px-6 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {PILLARS.map((pillar, i) => (
            <motion.div 
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}
            >
              <pillar.icon className="w-8 h-8 text-background" />
              <h3 className="text-xl font-black uppercase tracking-tight">{pillar.title}</h3>
              <p className="text-xs opacity-60 leading-relaxed uppercase tracking-widest font-bold">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-32 px-6 lg:px-24">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <SectionHeading subtitle={t('process')}>{t('docuOfCraft')}</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="aspect-[3/4] overflow-hidden border border-card-border">
                <img src="https://images.unsplash.com/photo-1618470342208-9b2c2bf3a4e9?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale" />
             </div>
             <div className="aspect-[3/4] overflow-hidden border border-card-border md:mt-12">
                <img src="https://images.unsplash.com/photo-1642761733235-b3f7f56f251c?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale" />
             </div>
             <div className="aspect-[3/4] overflow-hidden border border-card-border">
                <img src="https://images.unsplash.com/photo-1634552897937-1297c485f598?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale" />
             </div>
          </div>
          <p className="text-muted-text text-sm max-w-2xl mx-auto leading-loose uppercase tracking-[0.2em] font-bold">
            {t('craftText')}
          </p>
          <Button variant="outline">{t('sustainability')}</Button>
        </div>
      </section>
    </div>
  );
};
