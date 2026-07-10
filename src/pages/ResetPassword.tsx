import React, { useState } from 'react';
import { Key, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { AuthLayout } from '../components/AuthLayout';

export function ResetPassword({ onBackToLogin }: { onBackToLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const inputClass = "w-full h-12 pl-11 pr-4 bg-bg-surface border border-border-strong rounded-[10px] text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all shadow-sm";

  const reqs = [
    { label: 'Minimum 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'One number', met: /[0-9]/.test(password) },
    { label: 'One special character', met: /[^A-Za-z0-9]/.test(password) },
  ];
  
  const allReqsMet = reqs.every(r => r.met);
  const passwordsMatch = password && password === confirmPassword;
  const isFormValid = allReqsMet && passwordsMatch && confirmPassword.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 bg-success-bg rounded-full flex items-center justify-center mb-6 shadow-sm border border-success-text/10">
            <CheckCircle className="w-8 h-8 text-success-text" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-2">Password Reset</h1>
          <p className="text-sm font-medium text-text-secondary mb-8 max-w-[280px]">
            Your password has been successfully reset. You can now use your new password to sign in.
          </p>
          <Button 
            type="button" 
            variant="primary"
            className="w-full h-12 text-[15px] shadow-md shadow-brand-500/20"
            onClick={onBackToLogin}
          >
            Back to Sign in
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Set new password" subtitle="Please enter your new password below.">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">New Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Key className="w-5 h-5 text-text-muted" />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`${inputClass} pr-12`}
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-text-primary transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            <div className="mt-4 space-y-2.5">
              {reqs.map((r, i) => (
                <div key={i} className="flex items-center gap-2.5 text-[13px] font-medium transition-colors">
                  {r.met ? (
                    <CheckCircle className="w-4 h-4 text-success-text shrink-0 animate-in zoom-in" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-border-strong shrink-0" />
                  )}
                  <span className={r.met ? "text-text-primary" : "text-text-muted"}>{r.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Key className="w-5 h-5 text-text-muted" />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={`${inputClass} ${confirmPassword && !passwordsMatch ? 'border-error-text focus:border-error-text focus:ring-error-text/10' : ''}`}
                required
              />
            </div>
            {confirmPassword.length > 0 && !passwordsMatch && (
              <p className="text-xs font-semibold text-error-text mt-2 animate-in fade-in">Passwords do not match</p>
            )}
          </div>
        </div>
        
        <Button 
          type="submit" 
          variant="primary"
          className="w-full h-12 text-[15px] shadow-md shadow-brand-500/20 disabled:opacity-50 disabled:shadow-none transition-all"
          disabled={!isFormValid}
        >
          Reset Password
        </Button>
      </form>
    </AuthLayout>
  );
}
