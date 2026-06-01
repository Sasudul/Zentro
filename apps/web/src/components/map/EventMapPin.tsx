import React from 'react';
import { Event } from '@zentro/shared';
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
      <div 
        style={{
          cursor: 'pointer',
          transform: isActive ? 'scale(1.2)' : 'scale(1)',
          transition: 'transform 150ms ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{
            filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.2))'
          }}
        >
          <path 
            d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" 
            fill="#EF4444" 
            stroke="#FFFFFF" 
            strokeWidth="1.5"
          />
          <circle cx="12" cy="10" r="3" fill="#FFFFFF" />
        </svg>
      </div>
    </AdvancedMarker>
  );
}
