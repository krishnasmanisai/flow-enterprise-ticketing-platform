import { useState } from 'react';
import { Mail, Key, ArrowRight, Building, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [programCode, setProgramCode] = useState('easyrewardz');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const inputClass = "w-full h-12 pl-11 pr-4 bg-bg-surface border border-border-strong rounded-[10px] text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all shadow-sm";

  if (step === 1) {
    return (
      <AuthLayout title="Sign in to your program" subtitle="Enter your program code to continue.">
        <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-text-primary mb-2">Program code</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Building className="w-5 h-5 text-text-muted" />
              </div>
              <input 
                type="text"
                name="programCode"
                autoComplete="organization"
                spellCheck={false}
                value={programCode}
                onChange={(e) => setProgramCode(e.target.value)}
                className={inputClass}
                placeholder="e.g. acme-corp"
              />
              {programCode && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none animate-in fade-in zoom-in">
                  <CheckCircle className="w-5 h-5 text-success-text" />
                </div>
              )}
            </div>
          </div>

          {programCode.toLowerCase() === 'easyrewardz' && (
            <div className="bg-success-bg/30 border border-success-text/20 rounded-[10px] p-4 flex items-start gap-3 mb-8 animate-in fade-in slide-in-from-bottom-2">
              <div className="bg-success-bg rounded-full p-1 mt-0.5 shrink-0">
                <CheckCircle className="w-4 h-4 text-success-text" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-success-text font-bold uppercase tracking-wider mb-0.5">
                  Program Found
                </span>
                <span className="text-sm text-text-primary font-semibold">
                  EasyRewardz Reporting Demo
                </span>
              </div>
            </div>
          )}

          <Button 
            type="submit" 
            variant="primary"
            className="w-full h-12 text-[15px] shadow-md shadow-brand-500/20"
          >
            Continue
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-border-default text-center text-sm text-text-secondary font-medium">
          Your program code is usually provided by your administrator.<br/>
          <button type="button" className="font-semibold text-brand-600 hover:text-brand-700 transition-colors mt-2 inline-block">Need help finding it?</button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Sign in to your account" subtitle="Use your registered email and password to continue.">
      <div className="flex items-center justify-between bg-bg-surface-hover border border-border-default px-4 py-3 rounded-[10px] text-sm font-medium text-text-secondary mb-8 shadow-sm">
        <div className="flex items-center gap-2 truncate">
          <span className="truncate">Program: <strong className="text-text-primary">{programCode}</strong></span>
        </div>
        <button type="button" onClick={() => setStep(1)} className="text-brand-600 hover:text-brand-700 font-semibold transition-colors shrink-0">Change</button>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
        <div className="flex flex-col gap-5 mb-6">
          <div>
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
                placeholder="name@company.com"
                className={inputClass}
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-text-primary">Password</label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Key className="w-5 h-5 text-text-muted" />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
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
          </div>
        </div>

        <div className="flex items-center justify-between mb-8 text-sm">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-border-strong text-brand-600 focus:ring-brand-500 focus:ring-offset-1 focus:ring-offset-bg-surface bg-bg-surface cursor-pointer transition-colors" 
            />
            <span className="text-text-secondary font-medium group-hover:text-text-primary transition-colors">Remember me</span>
          </label>
          <button type="button" onClick={() => navigate('/forgot_password')} className="font-semibold text-brand-600 hover:text-brand-700 transition-colors">Forgot password?</button>
        </div>

        <Button 
          type="submit" 
          variant="primary"
          className="w-full h-12 text-[15px] shadow-md shadow-brand-500/20"
        >
          Sign in
        </Button>
      </form>

      <div className="flex items-center w-full my-6 gap-4">
        <div className="flex-1 h-px bg-border-default"></div>
        <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Or continue with</span>
        <div className="flex-1 h-px bg-border-default"></div>
      </div>

      <Button 
        variant="outline"
        type="button" 
        className="w-full h-12 text-[15px] bg-bg-surface hover:bg-bg-surface-hover border-border-strong shadow-sm"
      >
        <svg className="w-5 h-5 mr-3" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="9" height="9" fill="#f25022" />
          <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
          <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
          <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
        </svg>
        Microsoft
      </Button>
    </AuthLayout>
  );
}
