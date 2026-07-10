import React, { useState } from 'react';
import { Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { AuthLayout } from '../components/AuthLayout';

export function ForgotPassword({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const inputClass = "w-full h-12 pl-11 pr-4 bg-bg-surface border border-border-strong rounded-[10px] text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all shadow-sm";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSent(true);
    }
  };

  if (isSent) {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 bg-success-bg rounded-full flex items-center justify-center mb-6 shadow-sm border border-success-text/10">
            <Mail className="w-8 h-8 text-success-text" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-2">Check your email</h1>
          <p className="text-sm font-medium text-text-secondary mb-8 max-w-[280px]">
            We've sent a password reset link to <strong className="text-text-primary">{email}</strong>.
          </p>
          
          <Button 
            type="button" 
            variant="outline"
            className="w-full h-12 text-[15px] mb-6 bg-bg-surface hover:bg-bg-surface-hover shadow-sm border-border-strong"
            onClick={() => {
              // Simulate clicking the link in the email
              window.location.hash = 'reset-password';
            }}
          >
            Simulate Email Link Click
          </Button>
          
          <button 
            type="button" 
            onClick={onBack}
            className="text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign in
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Forgot Password" subtitle="Enter your email address and we'll send you a link to reset your password.">
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <label className="block text-sm font-semibold text-text-primary mb-2">Work email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-text-muted" />
            </div>
            <input 
              type="email"
              name="email"
              autoComplete="email"
              spellCheck={false}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className={inputClass}
              required
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          variant="primary"
          className="w-full h-12 text-[15px] shadow-md shadow-brand-500/20 mb-8"
        >
          Send Reset Link
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        
        <div className="flex justify-center">
          <button 
            type="button" 
            onClick={onBack}
            className="text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign in
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
