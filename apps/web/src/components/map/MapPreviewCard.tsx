import React from 'react';
import { Event } from '@pulse/shared';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

interface MapPreviewCardProps {
  event: Event;
}

export function MapPreviewCard({ event }: MapPreviewCardProps) {
  return (
    <div className="map-preview-card flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Badge variant={event.category as any}>{event.category}</Badge>
        <span className="text-xs text-muted-foreground font-medium">{formatDate(event.start_time)}</span>
      </div>
      <h4 className="text-sm font-serif font-medium text-foreground line-clamp-2 leading-tight">
        {event.title}
      </h4>
      <div className="text-xs text-muted-foreground line-clamp-1">
        {event.location_name || event.location_city}
      </div>
    </div>
  );
}
