import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface TagPillProps extends HTMLAttributes<HTMLSpanElement> {}

export function TagPill({ className, children, ...props }: TagPillProps) {
  return (
    <span className={cn('tag-pill', className)} {...props}>
      #{children}
    </span>
  );
}
