import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Mail, Lock, User, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Button, SectionHeading } from './UI';

export const Auth = ({ onBack, onAuthSuccess }: { onBack: () => void, onAuthSuccess: () => void }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6 lg:p-24 relative overflow-hidden transition-colors duration-500">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-card -z-10 translate-x-1/4 skew-x-12 opacity-50"></div>
      
      <button 
        onClick={onBack}
        className="absolute top-12 left-12 flex items-center gap-4 text-[11px] font-black uppercase tracking-widest hover:underline transition-colors text-foreground"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Studio
      </button>

      <div className="max-w-md w-full">
        <div className="mb-12">
          <SectionHeading subtitle="Security">
            {mode === 'login' ? 'Access Archive' : 'Create Identity'}
          </SectionHeading>
          <p className="text-[10px] text-muted-text uppercase tracking-[0.2em] font-bold leading-relaxed mt-4">
            {mode === 'login' 
              ? 'Authorized personnel only. Enter credentials to access your archive records.' 
              : 'Register your unique identity within the ARCHIVE™ network to secure exclusive drops.'
            }
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-8">
          <AnimatePresence mode="wait">
            {mode === 'register' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2 overflow-hidden"
              >
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-text">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text" />
                  <input type="text" required className="w-full bg-card border border-card-border p-4 pl-12 text-xs font-bold outline-none focus:border-foreground text-foreground" placeholder="DESIGNER_NAME" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-text">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text" />
              <input type="email" required className="w-full bg-card border border-card-border p-4 pl-12 text-xs font-bold outline-none focus:border-foreground text-foreground" placeholder="identity@domain.com" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-text">Security Key</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text" />
              <input type="password" required className="w-full bg-card border border-card-border p-4 pl-12 text-xs font-bold outline-none focus:border-foreground text-foreground" placeholder="••••••••" />
            </div>
          </div>

          <div className="pt-4 space-y-6">
            <Button disabled={isLoading} className="w-full h-16 flex items-center justify-center gap-4">
              {isLoading ? 'Verifying Protocol...' : (
                <>
                  {mode === 'login' ? 'Initiate Access' : 'Establish Identity'} 
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>

            <div className="flex flex-col items-center gap-4">
              <button 
                type="button"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="text-[10px] font-black uppercase tracking-widest text-foreground hover:underline"
              >
                {mode === 'login' ? 'Request New Identity' : 'Already Documented? Login'}
              </button>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-card border border-card-border rounded-full">
                <ShieldCheck className="w-3 h-3 text-green-500" />
                <span className="text-[8px] font-bold uppercase tracking-widest text-muted-text">End-to-End Encryption Active</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
