import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Shop } from './components/Shop';
import { Lookbook } from './components/Lookbook';
import { Philosophy } from './components/Philosophy';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfExistence } from './components/TermsOfExistence';
import { ProductDetail } from './components/ProductDetail';
import { Checkout } from './components/Checkout';
import { Cart } from './components/Cart';
import { SearchOverlay } from './components/SearchOverlay';
import { Auth } from './components/Auth';
import { ClientPanel } from './components/ClientPanel';
import { AdminPanel } from './components/AdminPanel';
import { ChatBot } from './components/ChatBot';
import { LimitedDrops } from './components/LimitedDrops';
import { LanguageProvider, useLanguage } from './components/LanguageContext';
import { ArrowRight, Instagram, Twitter, Youtube, Shield, Moon, Sun, Globe } from 'lucide-react';

function AppContent() {
  const [currentView, setView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(false);
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleProductSelect = (product: any) => {
    setSelectedProduct(product);
    setView('product-detail');
  };

  const handleGoToCheckout = () => {
    setIsCartOpen(false);
    setView('checkout');
  };

  const handleSearchSubmit = (query: string) => {
    setView('shop');
  };

  const handleAuthSuccess = () => {
    setUser({ name: 'ALEXIS ARCHIVE', email: 'alexis@studio.com', role: 'admin' });
    setView('panel');
  };

  const handleProfileClick = () => {
    if (user) {
      setView('panel');
    } else {
      setView('auth');
    }
  };

  return (
    <div className={`min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background ${isRTL ? 'font-arabic' : 'font-sans'}`}>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: currentColor;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {currentView !== 'checkout' && currentView !== 'auth' && currentView !== 'admin' && (
        <Navbar 
          currentView={currentView} 
          setView={setView} 
          user={user}
          darkMode={darkMode}
          toggleTheme={toggleTheme}
          onCartClick={() => setIsCartOpen(true)} 
          onSearchClick={() => setIsSearchOpen(true)}
          onProfileClick={handleProfileClick}
        />
      )}

      <main>
        {currentView === 'home' && <Home onProductSelect={handleProductSelect} />}
        {currentView === 'shop' && <Shop onProductSelect={handleProductSelect} />}
        {currentView === 'lookbook' && <Lookbook />}
        {currentView === 'story' && <Philosophy />}
        {currentView === 'drops' && <LimitedDrops />}
        {currentView === 'privacy' && <PrivacyPolicy />}
        {currentView === 'terms' && <TermsOfExistence />}
        {currentView === 'checkout' && <Checkout onBack={() => setView('home')} cartItems={[]} />}
        {currentView === 'auth' && <Auth onBack={() => setView('home')} onAuthSuccess={handleAuthSuccess} />}
        {currentView === 'panel' && <ClientPanel user={user} onLogout={() => { setUser(null); setView('home'); }} />}
        {currentView === 'admin' && <AdminPanel onBack={() => setView('home')} />}
        
        {currentView === 'product-detail' && (
          <ProductDetail 
            product={selectedProduct} 
            onBack={() => setView('shop')} 
          />
        )}
      </main>

      {/* ChatBot System */}
      {currentView !== 'admin' && currentView !== 'checkout' && <ChatBot />}

      {/* Admin Quick Access - Only visible if logged in as admin */}
      {user?.role === 'admin' && currentView !== 'admin' && (
        <button 
          onClick={() => setView('admin')}
          className="fixed bottom-8 left-8 z-[200] bg-foreground text-background p-4 rounded-full shadow-2xl hover:bg-muted-text transition-all flex items-center gap-3 group"
        >
          <Shield className="w-5 h-5" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all text-[10px] font-black uppercase tracking-widest">Access Command Center</span>
        </button>
      )}

      {/* Footer */}
      {currentView !== 'checkout' && currentView !== 'auth' && currentView !== 'admin' && (
        <footer className="bg-foreground text-background py-24 px-6 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
            <div className="space-y-8">
              <h2 className="text-3xl font-black uppercase tracking-tighter">{t('brandName')}</h2>
              <p className="opacity-50 text-[10px] uppercase font-bold tracking-widest leading-relaxed max-w-xs">
                {t('footerDesc')}
              </p>
              <div className="flex gap-6">
                <Instagram className="w-5 h-5 hover:text-muted-text cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 hover:text-muted-text cursor-pointer transition-colors" />
                <Youtube className="w-5 h-5 hover:text-muted-text cursor-pointer transition-colors" />
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold">{t('studio')}</h3>
              <ul className="space-y-4 text-[10px] opacity-50 font-black uppercase tracking-widest">
                <li onClick={() => setView('shop')} className="hover:opacity-100 underline decoration-1 underline-offset-4 cursor-pointer transition-colors">{t('latestDrop')}</li>
                <li onClick={() => setView('drops')} className="hover:opacity-100 underline decoration-1 underline-offset-4 cursor-pointer transition-colors">{t('limitedDrop')}</li>
                <li onClick={() => setView('lookbook')} className="hover:opacity-100 underline decoration-1 underline-offset-4 cursor-pointer transition-colors">{t('lookbook')}</li>
                <li className="hover:opacity-100 underline decoration-1 underline-offset-4 cursor-pointer transition-colors">Vault Log</li>
              </ul>
            </div>

            <div className="space-y-8">
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold">{t('assistance')}</h3>
              <ul className="space-y-4 text-xs opacity-50 font-bold uppercase tracking-widest">
                <li className="hover:opacity-100 cursor-pointer transition-colors">{t('careGuide')}</li>
                <li className="hover:opacity-100 cursor-pointer transition-colors">{t('shipping')}</li>
                <li className="hover:opacity-100 cursor-pointer transition-colors">{t('sizeMatrix')}</li>
                <li className="hover:opacity-100 cursor-pointer transition-colors">Authentication</li>
              </ul>
            </div>

            <div className="space-y-8">
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold">{t('inquiries')}</h3>
              <p className="text-xs opacity-50">studio@jacobvault.com</p>
              <button className="text-[10px] uppercase tracking-[0.2em] font-black flex items-center gap-2 group cursor-pointer">
                {t('contactStudio')} <ArrowRight className={`w-4 h-4 group-hover:translate-x-2 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between gap-6">
            <p className="text-[9px] uppercase tracking-widest opacity-30">© 2026 {t('brandName')} LTD. {t('rights')}</p>
            <div className="flex gap-12 text-[9px] uppercase tracking-widest opacity-30">
              <span onClick={() => setView('privacy')} className="cursor-pointer hover:opacity-100">{t('privacyPolicy')}</span>
              <span onClick={() => setView('terms')} className="cursor-pointer hover:opacity-100">{t('termsOfExistence')}</span>
            </div>
          </div>
        </footer>
      )}

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onCheckout={handleGoToCheckout}
      />

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearchSubmit}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
