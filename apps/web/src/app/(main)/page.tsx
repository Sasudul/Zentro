'use client';

import EventFilters from '@/components/events/EventFilters';
import EventGrid from '@/components/events/EventGrid';
import { Map, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useFilterStore } from '@/store/filterStore';
import { useEvents } from '@/hooks/useEvents';
import { MapPanel } from '@/components/map/MapPanel';

export default function HomePage() {
  const { filters } = useFilterStore();
  const { data } = useEvents(filters);
  const events = data?.data || [];

  const renderStars = () => (
    <div style={{ display: 'flex', gap: '2px', color: '#FBBF24', marginTop: '4px' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ fontSize: '0.75rem' }}>★</span>
      ))}
    </div>
  );

  return (
    <div style={{ width: '100%' }}>
      {/* ── HIGH IMPACT HERO SECTION ── */}
      <section style={{
        backgroundColor: 'var(--color-teal-dark)',
        borderRadius: '12px',
        padding: 'var(--space-48) var(--space-32)',
        marginTop: 'var(--space-20)',
        marginBottom: 'var(--space-40)',
        boxShadow: '0 10px 30px rgba(7, 30, 34, 0.2)',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 'var(--space-40)',
        alignItems: 'center',
        color: '#FFFFFF'
      }} className="hero-grid">
        {/* Left Info Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-24)' }}>
          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            margin: 0,
            fontFamily: 'var(--font-sans)'
          }}>
            Event ticketing<br />made simple
          </h1>
          <p style={{
            fontSize: '1.05rem',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.85)',
            maxWidth: '520px',
            margin: 0,
            fontFamily: 'var(--font-sans)'
          }}>
            An easy-to-use event ticketing platform with fair pricing and dedicated human support. All the tools you need for a fraction of the cost charged by other platforms.
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-20)', flexWrap: 'wrap' }}>
            <Link href="/events/create" className="btn" style={{
              backgroundColor: 'var(--color-green-brand)',
              color: '#FFFFFF',
              fontSize: '0.9375rem',
              fontWeight: 700,
              height: '48px',
              padding: '0 var(--space-32)',
              borderRadius: '4px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'background-color 150ms ease'
            }}>
              Create Event
            </Link>
            <Link href="/" style={{
              color: '#FFFFFF',
              fontSize: '0.9375rem',
              fontWeight: 600,
              textDecoration: 'underline',
              fontFamily: 'var(--font-sans)'
            }}>
              Book A Demo
            </Link>
          </div>

          {/* Ratings Row */}
          <div style={{
            display: 'flex',
            gap: 'var(--space-24)',
            marginTop: 'var(--space-12)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: 'var(--space-24)',
            flexWrap: 'wrap'
          }}>
            <div style={{ borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: 'var(--space-20)' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Capterra 4.7/5</span>
              {renderStars()}
            </div>
            <div style={{ borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: 'var(--space-20)' }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>G2 5/5</span>
              {renderStars()}
            </div>
            <div>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Google 4.7/5</span>
              {renderStars()}
            </div>
          </div>
        </div>

        {/* Right Staggered Photo Collage */}
        <div className="hero-collage" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          width: '100%',
          maxWidth: '540px',
          justifySelf: 'center'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ position: 'relative', height: '150px', borderRadius: '8px', overflow: 'hidden' }}>
              <Image src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80" alt="event cover" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
            <div style={{ position: 'relative', height: '180px', borderRadius: '8px', overflow: 'hidden' }}>
              <Image src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&q=80" alt="event cover" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ position: 'relative', height: '160px', borderRadius: '8px', overflow: 'hidden' }}>
              <Image src="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=300&q=80" alt="event cover" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── SEARCH, FILTER & EVENT GRID SECTION ── */}
      <div id="explore" style={{ scrollBehavior: 'smooth' }}>
        <header style={{ paddingBottom: 'var(--space-16)', marginBottom: 'var(--space-20)' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
            Discover Premium Events
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', margin: 'var(--space-4) 0 0 0' }}>
            Join highly curated Conferences, Theatre, Meetups, and Concerts globally.
          </p>
        </header>

        <div className="home-split">
          <div className="home-feed">
            <EventFilters />
            <EventGrid />
          </div>

          <aside className="home-map-sidebar">
            <div className="map-panel" style={{ height: 'calc(100vh - 120px)' }}>
              <MapPanel events={events} />
            </div>
          </aside>
        </div>
      </div>

      <style jsx global>{`
        @media (min-width: 992px) {
          .hero-grid {
            grid-template-columns: 1.2fr 1fr !important;
            padding: var(--space-64) var(--space-48) !important;
          }
        }
      `}</style>
    </div>
  );
}
