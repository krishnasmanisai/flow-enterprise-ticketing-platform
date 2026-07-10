import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: React.ReactNode;
  icon?: React.ElementType;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, icon: Icon, className = '', ...props }, ref) => {
    
    // Base styles
    let baseStyles = 'inline-flex items-center justify-center gap-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium rounded-md whitespace-nowrap';
    
    const variants = {
      primary: 'bg-gradient-to-b from-brand-500 to-brand-600 text-white shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.2)] border border-brand-600 hover:from-brand-600 hover:to-brand-700 active:scale-[0.98] active:shadow-inner',
      secondary: 'bg-bg-surface text-text-primary border border-border-strong hover:bg-bg-surface-hover shadow-sm active:scale-[0.98]',
      outline: 'bg-transparent text-text-primary border border-border-default hover:bg-bg-surface-hover hover:border-border-strong active:scale-[0.98]',
      ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover active:scale-[0.98]',
      danger: 'bg-gradient-to-b from-error-bg to-error-bg text-error-text hover:bg-error-bg/90 shadow-sm border border-error-text/20 active:scale-[0.98] focus-visible:ring-error-text',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-9 px-4 text-sm',
      lg: 'h-10 px-5 text-sm',
      icon: 'h-9 w-9 p-0', // For icon-only buttons
    };

    let classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
      <button ref={ref} className={classes} {...props}>
        {Icon && <Icon className={size === 'sm' || size === 'icon' ? 'w-4 h-4 shrink-0' : 'w-4 h-4 shrink-0'} />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
