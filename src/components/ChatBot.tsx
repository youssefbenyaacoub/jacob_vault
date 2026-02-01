import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, User, Bot, Sparkles } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', type: 'bot', text: 'chatWelcome' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text: string, isManual = true) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), type: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    if (isManual) setInputValue('');
    
    setIsTyping(true);
    
    // Simulated Bot Logic
    setTimeout(() => {
      let botResponse = "I am processing your inquiry regarding the ARCHIVE™. Please be specific or use the quick protocols below.";
      
      const lowerText = text.toLowerCase();
      if (lowerText.includes('order') || lowerText.includes('status') || text === t('chatOrder')) {
        botResponse = 'chatResponseOrder';
      } else if (lowerText.includes('size') || lowerText.includes('sizing') || text === t('chatSizing')) {
        botResponse = 'chatResponseSizing';
      } else if (lowerText.includes('shipping') || text === t('chatShipping')) {
        botResponse = 'chatResponseShipping';
      } else if (lowerText.includes('human') || lowerText.includes('representative') || text === t('chatHuman')) {
        botResponse = 'chatResponseHuman';
      }

      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        type: 'bot', 
        text: botResponse 
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const quickProtocols = [
    { label: t('chatOrder'), value: t('chatOrder') },
    { label: t('chatSizing'), value: t('chatSizing') },
    { label: t('chatShipping'), value: t('chatShipping') },
    { label: t('chatHuman'), value: t('chatHuman') },
  ];

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-[200] bg-foreground text-background w-14 h-14 rounded-full shadow-2xl flex items-center justify-center group border border-background/20"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageSquare className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse"></div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-28 ${isRTL ? 'left-8' : 'right-8'} z-[200] w-[350px] h-[500px] bg-background border border-card-border shadow-2xl flex flex-col overflow-hidden`}
          >
            {/* Header */}
            <div className="bg-foreground text-background p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-background/10 flex items-center justify-center rounded-sm">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest">{t('studioAssistant')}</h3>
                  <p className="text-[8px] opacity-60 uppercase tracking-tighter flex items-center gap-1">
                    <span className="w-1 h-1 bg-green-500 rounded-full"></span> {t('online')}
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="opacity-50 hover:opacity-100 transition-opacity">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-card/30"
            >
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.type === 'bot' ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={msg.id}
                  className={`flex ${msg.type === 'bot' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[85%] p-3 text-[11px] font-medium leading-relaxed ${
                    msg.type === 'bot' 
                      ? 'bg-muted/10 border border-card-border text-foreground' 
                      : 'bg-foreground text-background'
                  }`}>
                    {msg.type === 'bot' ? t(msg.text) : msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted/10 border border-card-border p-3 space-x-1 flex">
                    <span className="w-1 h-1 bg-foreground/40 rounded-full animate-bounce"></span>
                    <span className="w-1 h-1 bg-foreground/40 rounded-full animate-bounce delay-75"></span>
                    <span className="w-1 h-1 bg-foreground/40 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Protocols */}
            <div className="p-3 border-t border-card-border flex gap-2 overflow-x-auto no-scrollbar bg-background">
              {quickProtocols.map((protocol) => (
                <button
                  key={protocol.label}
                  onClick={() => handleSend(protocol.value, false)}
                  className="whitespace-nowrap px-3 py-1.5 border border-card-border text-[9px] font-black uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
                >
                  {protocol.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
              className="p-4 border-t border-card-border flex gap-3 bg-background"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t('chatPlaceholder')}
                className="flex-1 bg-transparent border-none focus:ring-0 text-[11px] font-medium uppercase placeholder:opacity-30"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim()}
                className="text-foreground disabled:opacity-20 hover:scale-110 transition-transform"
              >
                <Send className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
