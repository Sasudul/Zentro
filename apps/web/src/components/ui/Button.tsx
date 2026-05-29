import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = 'primary', isLoading, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || props.disabled}
        className={cn(
          'btn',
          {
            'btn-primary': variant === 'primary',
            'btn-secondary': variant === 'secondary',
            'btn-ghost': variant === 'ghost',
          },
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div style={{
            width: '16px',
            height: '16px',
            border: '2px solid transparent',
            borderTopColor: 'currentColor',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }} />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
