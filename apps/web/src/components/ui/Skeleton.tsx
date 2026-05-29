import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-shimmer', className)}
      style={{
        borderRadius: 'var(--radius-sm)',
        ...props.style,
      }}
      {...props}
    />
  );
}

export function EventCardSkeleton() {
  return (
    <div className="event-card" style={{ cursor: 'default' }}>
      <Skeleton className="event-card-media" />
      <div className="event-card-content">
        <div className="event-card-header">
          <Skeleton style={{ width: '40%', height: '16px' }} />
          <Skeleton style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
        </div>
        <Skeleton style={{ width: '80%', height: '24px', margin: '4px 0' }} />
        <Skeleton style={{ width: '90%', height: '14px' }} />
        <Skeleton style={{ width: '60%', height: '14px' }} />
        <div className="event-card-tags">
          <Skeleton style={{ width: '50px', height: '20px', borderRadius: '20px' }} />
          <Skeleton style={{ width: '70px', height: '20px', borderRadius: '20px' }} />
        </div>
        <div className="event-card-footer">
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Skeleton style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
            <Skeleton style={{ width: '80px', height: '14px' }} />
          </div>
          <Skeleton style={{ width: '40px', height: '14px' }} />
        </div>
      </div>
    </div>
  );
}
