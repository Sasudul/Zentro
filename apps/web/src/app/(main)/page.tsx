import EventFilters from '@/components/events/EventFilters';
import EventGrid from '@/components/events/EventGrid';
import { Map } from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      <header className="home-hero">
        <h1>
          Curated Tech Gatherings<span className="text-accent">.</span>
        </h1>
        <p>
          Discover highly curated developer conferences, local meetups, hackathons, and virtual masterclasses from top organizers worldwide.
        </p>
      </header>

      <div className="home-split">
        <div className="home-feed">
          <EventFilters />
          <EventGrid />
        </div>

        <aside className="home-map-sidebar">
          <div className="map-panel" style={{ height: 'calc(100vh - 120px)' }}>
            <div className="map-placeholder">
              <div className="map-placeholder-icon">
                <Map style={{ width: '20px', height: '20px' }} />
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', marginBottom: 'var(--space-8)' }}>Interactive Event Map</h4>
                <p className="text-secondary text-xs" style={{ maxWidth: '240px' }}>
                  Pins representing conferences and meetups appear here when Google Maps is configured.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
