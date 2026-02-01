import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading, Button } from './UI';
import { useLanguage } from './LanguageContext';
import { ShieldAlert, Timer, Package, Lock } from 'lucide-react';

export const LimitedDrops = () => {
  const { t, isRTL } = useLanguage();

  const tiers = [
    {
      icon: ShieldAlert,
      title: t('dropTier1Title'),
      desc: t('dropTier1Desc'),
      limit: "24 UNITS"
    },
    {
      icon: Timer,
      title: t('dropTier2Title'),
      desc: t('dropTier2Desc'),
      limit: "100 UNITS"
    },
    {
      icon: Package,
      title: t('dropTier3Title'),
      desc: t('dropTier3Desc'),
      limit: "VAULT CORE"
    }
  ];

  return (
    <div className="bg-background pt-32 pb-24 min-h-screen transition-colors duration-500">
      {/* Hero Section */}
      <section className={`px-6 lg:px-24 mb-32 ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="max-w-4xl">
          <SectionHeading subtitle={t('limitedDropsTitle')}>
            {t('limitedDropsSubtitle')}
          </SectionHeading>
          <p className="mt-8 text-muted-text text-lg md:text-xl leading-relaxed font-medium max-w-2xl">
            {t('dropIntro')}
          </p>
        </div>
      </section>

      {/* Tiers Grid */}
      <section className="px-6 lg:px-24 mb-48">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-card-border border border-card-border">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-background p-12 space-y-8 group hover:bg-card transition-colors duration-500"
            >
              <div className="flex justify-between items-start">
                <tier.icon className="w-8 h-8 text-foreground" />
                <span className="text-[10px] font-black tracking-[0.3em] opacity-30 group-hover:opacity-100 transition-opacity">
                  {tier.limit}
                </span>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black uppercase tracking-tighter">{tier.title}</h3>
                <p className="text-sm text-muted-text leading-relaxed uppercase tracking-wider font-bold">
                  {tier.desc}
                </p>
              </div>
              <div className="h-px w-full bg-card-border group-hover:bg-foreground transition-colors"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Scarcity Logic Section */}
      <section className="px-6 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className={`space-y-12 ${isRTL ? 'order-1 lg:order-2 text-right' : 'text-left'}`}>
          <div className="space-y-4">
            <h2 className="text-4xl font-black uppercase tracking-tighter">{t('secondaryProtocol')}</h2>
            <p className="text-muted-text leading-relaxed font-medium">
              {t('secondaryDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <span className="text-3xl font-black uppercase tracking-tighter">0%</span>
              <p className="text-[10px] uppercase font-bold tracking-widest text-muted-text">{t('restockRate')}</p>
            </div>
            <div className="space-y-2">
              <span className="text-3xl font-black uppercase tracking-tighter">1/1</span>
              <p className="text-[10px] uppercase font-bold tracking-widest text-muted-text">{t('uniquenessFactor')}</p>
            </div>
          </div>

          <Button variant="outline" className="w-full md:w-auto">{t('registerAccess')}</Button>
        </div>

        <div className={`relative aspect-[4/5] overflow-hidden border border-card-border ${isRTL ? 'order-2 lg:order-1' : ''}`}>
          <img 
            src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200" 
            className="w-full h-full object-cover grayscale opacity-80"
            alt="Scarcity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-40"></div>
          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
             <div className="text-background mix-blend-difference">
                <Lock className="w-8 h-8 mb-4" />
                <p className="text-xs font-black uppercase tracking-[0.2em]">{t('accessRestricted')}</p>
             </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="mt-48 px-6 lg:px-24 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <SectionHeading subtitle={t('nextProtocol')}>{t('upcomingWindow')}</SectionHeading>
          <div className="flex justify-center gap-12 font-mono text-4xl font-black">
            <div className="text-center">
              <span>08</span>
              <p className="text-[10px] opacity-40">{t('days')}</p>
            </div>
            <span>:</span>
            <div className="text-center">
              <span>14</span>
              <p className="text-[10px] opacity-40">{t('hrs')}</p>
            </div>
            <span>:</span>
            <div className="text-center">
              <span>22</span>
              <p className="text-[10px] opacity-40">{t('min')}</p>
            </div>
          </div>
          <p className="text-muted-text text-sm uppercase tracking-widest font-bold">
            {t('decryptionKey')}
          </p>
        </div>
      </section>
    </div>
  );
};
