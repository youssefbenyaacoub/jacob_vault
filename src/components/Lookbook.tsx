import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from './UI';
import { useLanguage } from './LanguageContext';

export const Lookbook = () => {
  const { t, isRTL } = useLanguage();

  const LOOKS = [
    {
      id: '01',
      title: t('look1Title'),
      image: 'https://images.unsplash.com/photo-1601926299866-6a5c9bfa6be0?auto=format&fit=crop&q=80&w=1200',
      desc: t('look1Desc'),
      alignment: 'left'
    },
    {
      id: '02',
      title: t('look2Title'),
      image: 'https://images.unsplash.com/photo-1634552897937-1297c485f598?auto=format&fit=crop&q=80&w=1200',
      desc: t('look2Desc'),
      alignment: 'right'
    },
    {
      id: '03',
      title: t('look3Title'),
      image: 'https://images.unsplash.com/photo-1739616194392-ee37d7584484?auto=format&fit=crop&q=80&w=1200',
      desc: t('look3Desc'),
      alignment: 'left'
    },
  ];
  
  return (
    <div className="bg-background text-foreground min-h-screen pt-32 pb-24 transition-colors duration-500">
      <div className={`px-6 lg:px-24 mb-32 ${isRTL ? 'text-right' : 'text-left'}`}>
        <SectionHeading subtitle={t('visualRecord')} className="text-foreground">{t('lookbook')}<br />{t('lookbookTitle')}</SectionHeading>
        <p className="text-muted-text max-w-sm uppercase text-[10px] tracking-widest leading-relaxed font-bold">
          {t('lookbookIntro')}
        </p>
      </div>

      <div className="space-y-64">
        {LOOKS.map((look, i) => (
          <section key={look.id} className="relative">
            <div className={`flex flex-col ${look.alignment === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24`}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true, margin: "-100px" }}
                className="w-full lg:w-2/3 aspect-[16/9] lg:aspect-[3/2] overflow-hidden border border-card-border"
              >
                <img 
                  src={look.image} 
                  className="w-full h-full object-cover grayscale brightness-75 hover:brightness-100 transition-all duration-1000"
                  alt={look.title}
                />
              </motion.div>
              
              <div className={`px-6 lg:px-0 lg:w-1/3 space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                <span className="text-foreground font-mono text-xs font-bold">{t('record')} #{look.id}</span>
                <h3 className="text-4xl font-black uppercase tracking-tighter leading-none">{look.title}</h3>
                <p className="text-sm text-muted-text leading-relaxed max-w-xs">{look.desc}</p>
                <div className="w-12 h-[1px] bg-foreground"></div>
              </div>
            </div>
            
            {/* Background Decorative Text */}
            <div className={`absolute -z-10 top-1/2 -translate-y-1/2 ${look.alignment === 'right' ? 'left-0' : 'right-0'} text-[180px] lg:text-[280px] font-black opacity-[0.02] select-none tracking-tighter whitespace-nowrap text-foreground`}>
              {look.title}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-64 px-6 lg:px-24 text-center">
        <div className="inline-block border border-card-border p-12 bg-card">
          <SectionHeading subtitle={t('conclusion')} className="text-foreground mb-6">{t('moreToCome')}</SectionHeading>
          <p className="text-muted-text text-[10px] uppercase tracking-widest max-w-md mx-auto font-bold">
            {t('vol27Production')}
          </p>
        </div>
      </div>
    </div>
  );
};
