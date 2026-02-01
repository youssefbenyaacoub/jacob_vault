import React from 'react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  className, 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: 'primary' | 'outline' | 'ghost' 
}) => {
  const variants = {
    primary: "bg-foreground text-background hover:bg-[#0047FF] hover:text-white transition-all duration-300",
    outline: "border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300",
    ghost: "bg-transparent text-foreground hover:bg-card",
  };

  return (
    <button 
      className={cn(
        "px-8 py-3 text-[12px] uppercase tracking-[0.2em] font-bold",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const SectionHeading = ({ children, subtitle, className }: { children: React.ReactNode, subtitle?: string, className?: string }) => (
  <div className={cn("mb-12", className)}>
    {subtitle && <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-2 block">{subtitle}</span>}
    <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">{children}</h2>
  </div>
);

export const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={cn("px-2 py-1 bg-[#0047FF] text-white text-[9px] font-bold uppercase tracking-widest", className)}>
    {children}
  </span>
);
