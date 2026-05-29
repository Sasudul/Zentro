'use client';

import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { Event } from '@pulse/shared';
import { EventMapPin } from './EventMapPin';
import { MapPreviewCard } from './MapPreviewCard';
import { useRouter } from 'next/navigation';

interface MapPanelProps {
  events: Event[];
}

export function MapPanel({ events }: MapPanelProps) {
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);
  const router = useRouter();

  // Basic center, maybe calculate bounds of events later
  const defaultCenter = { lat: 37.7749, lng: -122.4194 };
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID || 'DEMO_MAP_ID';
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  if (!apiKey) {
    return (
      <div className="map-panel flex items-center justify-center bg-muted/30">
        <div className="text-center p-6">
          <p className="text-sm font-medium text-muted-foreground mb-2">Map Unavailable</p>
          <p className="text-xs text-muted-foreground/70">Please configure NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</p>
        </div>
      </div>
    );
  }

  return (
    <div className="map-panel relative w-full h-full">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={defaultCenter}
          defaultZoom={4}
          mapId={mapId}
          disableDefaultUI={true}
          className="w-full h-full"
        >
          {events.map((event) => (
            <EventMapPin
              key={event.id}
              event={event}
              isActive={hoveredEventId === event.id}
              onMouseEnter={() => setHoveredEventId(event.id)}
              onMouseLeave={() => setHoveredEventId(null)}
              onClick={() => router.push(`/events/${event.id}`)}
            />
          ))}

          {/* Render preview card outside of marker to avoid clipping, positioned via absolute coords if possible, 
              but for simplicity using a portal or rendering inside the hovered marker might be easier. 
              Actually, AdvancedMarker allows children. So we can just render the card inside the active marker. */}
          {events.map((event) => {
            if (hoveredEventId === event.id && event.latitude && event.longitude) {
              return (
                <AdvancedMarker 
                  key={`preview-${event.id}`}
                  position={{ lat: Number(event.latitude), lng: Number(event.longitude) }}
                  zIndex={30}
                >
                  <MapPreviewCard event={event} />
                </AdvancedMarker>
              );
            }
            return null;
          })}
        </Map>
      </APIProvider>
    </div>
  );
}
