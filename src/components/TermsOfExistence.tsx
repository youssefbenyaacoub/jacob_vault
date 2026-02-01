import React from 'react';
import { SectionHeading } from './UI';
import { useLanguage } from './LanguageContext';

export const TermsOfExistence = () => {
  const { t, isRTL } = useLanguage();
  
  return (
    <div className="bg-background pt-32 pb-24 min-h-screen transition-colors duration-500">
      <div className={`px-6 lg:px-24 max-w-4xl mx-auto ${isRTL ? 'text-right' : 'text-left'}`}>
        <SectionHeading subtitle={t('termsIntro')}>{t('termsOfExistence')}</SectionHeading>
        
        <div className="space-y-12 mt-16">
          <section className="space-y-4">
            <h3 className="text-xl font-black uppercase tracking-tighter text-foreground">01. {t('archetype')} Agreement</h3>
            <p className="text-muted-text leading-relaxed font-medium">
              {t('termsText1')}
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-black uppercase tracking-tighter text-foreground">02. Acquisition Protocols</h3>
            <p className="text-muted-text leading-relaxed font-medium">
              {t('termsText2')}
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-black uppercase tracking-tighter text-foreground">03. Material Intellectual Property</h3>
            <p className="text-muted-text leading-relaxed font-medium">
              All textile innovations, pattern silhouettes, and visual assets are the exclusive property of ARCHIVE™ STUDIO. Reproduction for commercial use without explicit authorization is a violation of the existence agreement.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-black uppercase tracking-tighter text-foreground">04. Liability & Longevity</h3>
            <p className="text-muted-text leading-relaxed font-medium">
              We provide care guides to ensure the longevity of each piece. ARCHIVE™ is not responsible for damage resulting from neglect of technical textile care instructions.
            </p>
          </section>
        </div>

        <div className="mt-24 pt-12 border-t border-card-border">
          <p className="text-[10px] uppercase tracking-[0.4em] font-black text-muted-text">
            Contract Status: ACTIVE — Vol. 26 Revision
          </p>
        </div>
      </div>
    </div>
  );
};
