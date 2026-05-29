import React from 'react';
import { Event } from '@pulse/shared';
import { AdvancedMarker } from '@vis.gl/react-google-maps';

interface EventMapPinProps {
  event: Event;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

export function EventMapPin({ event, isActive, onMouseEnter, onMouseLeave, onClick }: EventMapPinProps) {
  // If no lat/lng, don't render pin
  if (!event.latitude || !event.longitude) {
    return null;
  }

  return (
    <AdvancedMarker
      position={{ lat: Number(event.latitude), lng: Number(event.longitude) }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={`map-pin ${isActive ? 'active' : ''}`} />
    </AdvancedMarker>
  );
}
