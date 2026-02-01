import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Trash2, ArrowRight } from 'lucide-react';
import { Button } from './UI';

export const Cart = ({ isOpen, onClose, onCheckout }: { isOpen: boolean, onClose: () => void, onCheckout: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-[160] w-full max-w-md h-screen bg-background shadow-2xl p-8 lg:p-12 flex flex-col transition-colors duration-500"
          >
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-foreground">Your Archive</h2>
              <button onClick={onClose} className="p-2 hover:bg-card rounded-full transition-colors text-foreground"><X className="w-6 h-6" /></button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-8 custom-scrollbar">
              {/* Mock items */}
              {[1].map((item) => (
                <div key={item} className="flex gap-6 group">
                  <div className="w-24 h-32 bg-card overflow-hidden shrink-0 border border-card-border">
                    <img 
                      src="https://images.unsplash.com/photo-1634552897937-1297c485f598?auto=format&fit=crop&q=80&w=200" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                      alt="Cart Item"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Kinetic Shell</h3>
                        <p className="text-sm font-mono text-foreground">$420</p>
                      </div>
                      <p className="text-[10px] text-muted-text mt-1 uppercase font-bold tracking-widest">Size: M | Black</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <button className="text-xs font-bold text-muted-text hover:text-foreground">-</button>
                        <span className="text-xs font-bold text-foreground">1</span>
                        <button className="text-xs font-bold text-muted-text hover:text-foreground">+</button>
                      </div>
                      <button className="text-muted-text hover:text-foreground transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-card-border space-y-6">
              <div className="flex justify-between items-center text-foreground">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-text">Subtotal</span>
                <span className="text-xl font-mono">$420.00</span>
              </div>
              <p className="text-[10px] text-muted-text leading-relaxed uppercase tracking-widest font-bold">
                Shipping and taxes calculated at checkout. Express worldwide delivery available.
              </p>
              <Button onClick={onCheckout} className="w-full h-16 flex items-center justify-center gap-4">
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
