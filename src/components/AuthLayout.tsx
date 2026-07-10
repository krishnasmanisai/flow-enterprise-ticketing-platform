import React from 'react';

export function AuthLayout({ children, title, subtitle }: { children: React.ReactNode, title?: string, subtitle?: string }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-bg-page relative overflow-hidden font-sans">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-brand-500/10 blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>
      
      <div className="relative w-full max-w-[440px] bg-bg-surface rounded-[20px] shadow-[0_12px_40px_rgb(0,0,0,0.08)] border border-border-default p-8 sm:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-[14px] bg-gradient-to-b from-brand-500 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/30 mb-6 border border-brand-400">
            <span className="text-2xl font-bold text-white leading-none">F</span>
          </div>
          {title && <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-2 text-center">{title}</h1>}
          {subtitle && <p className="text-sm font-medium text-text-secondary text-center max-w-[280px]">{subtitle}</p>}
        </div>
        {children}
      </div>
    </main>
  );
}
