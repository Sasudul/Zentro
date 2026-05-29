import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'conference' | 'meetup' | 'hackathon' | 'workshop' | 'other' | 'live';
}

export function Badge({ className, children, variant = 'other', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'badge',
        {
          'badge-conference': variant === 'conference',
          'badge-meetup': variant === 'meetup',
          'badge-hackathon': variant === 'hackathon',
          'badge-workshop': variant === 'workshop',
          'badge-other': variant === 'other',
          'badge-live': variant === 'live',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
