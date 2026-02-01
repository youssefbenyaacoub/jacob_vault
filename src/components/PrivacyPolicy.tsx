import React from 'react';
import { SectionHeading } from './UI';
import { useLanguage } from './LanguageContext';

export const PrivacyPolicy = () => {
  const { t, isRTL } = useLanguage();
  
  return (
    <div className="bg-background pt-32 pb-24 min-h-screen transition-colors duration-500">
      <div className={`px-6 lg:px-24 max-w-4xl mx-auto ${isRTL ? 'text-right' : 'text-left'}`}>
        <SectionHeading subtitle={t('privacyIntro')}>{t('privacyPolicy')}</SectionHeading>
        
        <div className="space-y-12 mt-16">
          <section className="space-y-4">
            <h3 className="text-xl font-black uppercase tracking-tighter text-foreground">01. {t('accessArchive')}</h3>
            <p className="text-muted-text leading-relaxed font-medium">
              {t('privacyText1')}
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-black uppercase tracking-tighter text-foreground">02. {t('record')} Protocol</h3>
            <p className="text-muted-text leading-relaxed font-medium">
              {t('privacyText2')}
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-black uppercase tracking-tighter text-foreground">03. Encryption Standards</h3>
            <p className="text-muted-text leading-relaxed font-medium">
              Every interaction within the ARCHIVE™ ecosystem is secured via end-to-end cryptographic protocols. We do not sell identity records to third-party entities.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-black uppercase tracking-tighter text-foreground">04. Right to Erasure</h3>
            <p className="text-muted-text leading-relaxed font-medium">
              Users maintain the absolute right to request the permanent deletion of their digital records from our central studio servers at any time.
            </p>
          </section>
        </div>

        <div className="mt-24 pt-12 border-t border-card-border">
          <p className="text-[10px] uppercase tracking-[0.4em] font-black text-muted-text">
            Document Version: 26.0.1A — Updated Feb 2026
          </p>
        </div>
      </div>
    </div>
  );
};
