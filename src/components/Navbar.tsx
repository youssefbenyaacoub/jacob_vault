import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Search, Menu, X, ArrowRight, Instagram, Twitter, Youtube, User, Sun, Moon, Globe } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { Logo, BrandLogo } from './Logo';

export const Navbar = ({ onCartClick, onSearchClick, onProfileClick, currentView, setView, user, darkMode, toggleTheme }: {
  onCartClick: () => void,
  onSearchClick: () => void,
  onProfileClick: () => void,
  currentView: string,
  setView: (v: string) => void,
  user: any,
  darkMode: boolean,
  toggleTheme: () => void
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'shop', label: t('shop') },
    { id: 'lookbook', label: t('lookbook') },
    { id: 'story', label: t('philosophy') },
    { id: 'drops', label: t('limitedDrop') }
  ];

  const handleNavClick = (view: string) => {
    setView(view);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] px-6 transition-all duration-300 bg-background/90 backdrop-blur-md border-b border-card-border text-foreground ${scrolled ? 'py-4' : 'py-6'}`}>
        <div className="flex items-center justify-between w-full max-w-[1920px] mx-auto">
          <div className="flex items-center gap-12">
            <button
              onClick={() => handleNavClick('home')}
              className="cursor-pointer"
            >
              <BrandLogo showText={false} />
            </button>

            <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em]">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`transition-colors hover:text-foreground ${currentView === item.id ? 'underline underline-offset-4' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center bg-card border border-card-border p-1 rounded-sm">
              {(['en', 'fr', 'ar'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 text-[9px] font-black uppercase tracking-tighter transition-all ${language === lang ? 'bg-foreground text-background' : 'text-muted-text hover:text-foreground'}`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <button
              onClick={toggleTheme}
              className="hover:text-foreground transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button onClick={onSearchClick} className="hidden md:block hover:text-foreground transition-colors cursor-pointer">
              <Search className="w-5 h-5" />
            </button>

            <button onClick={onProfileClick} className="relative group cursor-pointer hidden md:block">
              <User className={`w-5 h-5 group-hover:text-foreground transition-colors ${user ? 'text-foreground' : ''}`} />
              {user && <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-foreground rounded-full ring-2 ring-background"></span>}
            </button>

            <button onClick={onCartClick} className="relative group cursor-pointer">
              <ShoppingBag className="w-5 h-5 group-hover:text-foreground transition-colors" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-foreground rounded-full"></span>
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden z-[110] relative cursor-pointer"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[95] bg-background flex flex-col justify-between p-6 pt-32"
          >
            <div className="flex flex-col gap-8">
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-text mb-4">{t('navMenu')}</p>
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                  onClick={() => handleNavClick(item.id)}
                  className="flex items-center justify-between w-full group"
                >
                  <span className={`text-5xl font-black uppercase tracking-tighter ${currentView === item.id ? 'underline underline-offset-8 decoration-4' : 'text-foreground'}`}>
                    {item.label}
                  </span>
                  <ArrowRight className={`w-8 h-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all ${isRTL ? 'rotate-180' : ''}`} />
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => { setIsMenuOpen(false); onProfileClick(); }}
                className="flex items-center justify-between w-full group pt-8 border-t border-card-border"
              >
                <span className={`text-2xl font-black uppercase tracking-tighter flex items-center gap-4 text-foreground`}>
                  <User className="w-6 h-6" /> {user ? t('studioProfile') : t('accessArchive')}
                </span>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                onClick={() => { setIsMenuOpen(false); onSearchClick(); }}
                className="flex items-center justify-between w-full group"
              >
                <span className="text-2xl font-black uppercase tracking-tighter text-foreground flex items-center gap-4">
                  <Search className="w-6 h-6" /> {t('searchArchive')}
                </span>
              </motion.button>
            </div>

            <div className="space-y-12 pb-12">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-text">{t('socials')}</h4>
                  <div className="flex gap-6">
                    <Instagram className="w-5 h-5" />
                    <Twitter className="w-5 h-5" />
                    <Youtube className="w-5 h-5" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-text">{t('inquiries')}</h4>
                  <p className="text-xs font-bold uppercase tracking-widest">studio@jacobvault.com</p>
                </div>
              </div>

              <div className="pt-8 border-t border-card-border flex justify-between items-center">
                <p className="text-[9px] uppercase tracking-widest font-bold text-muted-text">© 2026 {t('brandName')} {t('rights')}</p>
                <div className="flex gap-4">
                  <button onClick={() => { setIsMenuOpen(false); onSearchClick(); }}><Search className="w-4 h-4 text-gray-400" /></button>
                  <button onClick={() => { setIsMenuOpen(false); onCartClick(); }}><ShoppingBag className="w-4 h-4 text-gray-400" /></button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
