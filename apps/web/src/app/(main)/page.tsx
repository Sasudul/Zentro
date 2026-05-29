import EventFilters from '@/components/events/EventFilters';
import EventGrid from '@/components/events/EventGrid';
import { Map } from 'lucide-react';

export default function HomePage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-24)',
    }}>
      {/* Editorial Header */}
      <header style={{
        padding: 'var(--space-32) 0 var(--space-12) 0',
      }}>
        <h1 className="font-serif tracking-tight text-3xl md:text-4xl font-bold mb-3" style={{
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
        }}>
          Curated Tech Gatherings<span className="text-accent">.</span>
        </h1>
        <p className="text-muted text-sm md:text-base" style={{ maxWidth: '600px' }}>
          Discover highly curated developer conferences, local meetups, hackathons, and virtual masterclasses from top organizers worldwide.
        </p>
      </header>

      {/* Main Split Screen Area */}
      <div style={{
        display: 'flex',
        gap: 'var(--space-32)',
        position: 'relative',
        alignItems: 'flex-start',
      }}>
        {/* Left Side: Events List Feed */}
        <div style={{
          flex: '1 1 0%',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-24)',
          width: '100%',
        }}>
          <EventFilters />
          <EventGrid />
        </div>

        {/* Right Side: Google Maps Sticky Panel Placeholder */}
        <aside style={{
          position: 'sticky',
          top: '92px',
          width: '380px',
          height: 'calc(100vh - 120px)',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          display: 'none', // Shown responsively via CSS layouts
          padding: 'var(--space-24)',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-16)',
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)',
        }} className="lg:flex">
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-glow)',
            color: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Map className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif text-base font-semibold mb-2">Interactive Event Map</h4>
            <p className="text-muted text-xs" style={{ maxWidth: '240px' }}>
              Pins representing conferences and meetups will appear here in Sprint 4 once Google Maps is wired.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
