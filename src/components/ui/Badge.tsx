import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'brand';
type BadgeSize = 'sm' | 'md';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  showDot?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'neutral', size = 'sm', showDot = false, children, className = '', ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-[5px] border';
  
  const variants = {
    success: 'bg-success-bg text-success-text border-success-text/20',
    warning: 'bg-warning-bg text-warning-text border-warning-text/20',
    error: 'bg-error-bg text-error-text border-error-text/20',
    info: 'bg-info-bg text-info-text border-info-text/20',
    neutral: 'bg-bg-surface-alt text-text-muted border-border-default',
    brand: 'bg-brand-50 text-brand-600 border-brand-500/20',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[11px] leading-tight',
    md: 'px-2.5 py-1 text-xs leading-none',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} gap-1.5 ${className}`} {...props}>
      {showDot && (
        <span 
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            variant === 'success' ? 'bg-success-text' : 
            variant === 'warning' ? 'bg-warning-text' : 
            variant === 'error' ? 'bg-error-text' : 
            variant === 'info' ? 'bg-info-text' : 
            variant === 'brand' ? 'bg-brand-500' :
            'bg-text-muted'
          }`} 
        />
      )}
      {children}
    </span>
  );
}
