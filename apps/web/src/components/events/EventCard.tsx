'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Bookmark } from 'lucide-react';
import type { Event } from '@/types/index';
import { TagPill } from '@/components/ui/TagPill';
import { formatDate } from '@/lib/utils';

// ── Weather Tint Helper ──
interface DeterministicWeather {
  temp: number;
  condition: string;
  icon: string;
  tintClass: string;
}

export function getEventWeather(city: string | null | undefined): DeterministicWeather {
  if (!city) {
    return { temp: 20, condition: 'Clear', icon: '☀️', tintClass: 'weather-clear' };
  }
  const cleanCity = city.trim().toLowerCase();
  let hash = 0;
  for (let i = 0; i < cleanCity.length; i++) {
    hash = cleanCity.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);

  const conditions = [
    { cond: 'Clear', icon: '☀️', tintClass: 'weather-clear', tempMin: 22, tempMax: 28 },
    { cond: 'Partly Cloudy', icon: '🌤️', tintClass: 'weather-cloud', tempMin: 16, tempMax: 21 },
    { cond: 'Showers', icon: '🌧️', tintClass: 'weather-rain', tempMin: 12, tempMax: 18 },
    { cond: 'Overcast', icon: '☁️', tintClass: 'weather-cloud', tempMin: 14, tempMax: 19 },
    { cond: 'Thunderstorm', icon: '⛈️', tintClass: 'weather-storm', tempMin: 18, tempMax: 24 }
  ];

  const match = conditions[hash % conditions.length];
  const tempRange = match.tempMax - match.tempMin;
  const temp = match.tempMin + (hash % (tempRange + 1));

  return {
    temp,
    condition: match.cond,
    icon: match.icon,
    tintClass: match.tintClass
  };
}

interface EventCardProps {
  event: Event;
  variant?: 'default' | 'featured' | 'compact';
  isBookmarked?: boolean;
  onBookmarkToggle?: (e: React.MouseEvent) => void;
}

export default function EventCard({
  event,
  variant = 'default',
  isBookmarked = false,
  onBookmarkToggle
}: EventCardProps) {
  const weather = getEventWeather(event.location_city);
  const locationString = event.format === 'virtual'
    ? 'Virtual Session'
    : [event.location_city, event.location_country].filter(Boolean).join(', ');

  const now = new Date();
  const startTime = new Date(event.start_time);
  const endTime = new Date(event.end_time);
  const isLive = startTime <= now && now <= endTime;
  const imageUrl = event.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60';

  // ── 1. Compact Sidebar Variant ──
  if (variant === 'compact') {
    return (
      <article className="event-card compact">
        <div className="compact-details">
          <Link href={`/events/${event.id}`}>
            <h4 className="compact-title">{event.title}</h4>
          </Link>
          <div className="compact-meta">
            {formatDate(event.start_time, 'MMM d')} · {locationString}
          </div>
        </div>
        <button
          onClick={onBookmarkToggle}
          className={`btn-bookmark ${isBookmarked ? 'active' : ''}`}
          aria-label="Bookmark event"
          style={{ width: '28px', height: '28px', flexShrink: 0 }}
        >
          <Bookmark style={{ width: '12px', height: '12px' }} />
        </button>
      </article>
    );
  }

  // ── 2. Featured Horizontal Variant ──
  if (variant === 'featured') {
    return (
      <article className={`event-card featured ${weather.tintClass}`}>
        {isLive && <div className="event-card-live-strip" />}
        
        <div className="event-card-media-side">
          <Link href={`/events/${event.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
            <Image
              src={imageUrl}
              alt={event.title}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              priority={true}
            />
          </Link>
        </div>

        <div className="event-card-content">
          <div className="event-card-header">
            <div className="event-card-mono-meta">
              {isLive ? (
                <span className="text-accent" style={{ fontWeight: 700 }}>🟢 LIVE NOW</span>
              ) : (
                <span style={{ fontWeight: 600 }}>✦ FEATURED COVERAGE</span>
              )}
              <span>·</span>
              <span>{event.category}</span>
              <span>·</span>
              <span className="event-card-meta-item">
                <MapPin style={{ width: '10px', height: '10px', color: 'var(--color-accent)' }} />
                {locationString}
              </span>
            </div>
            <button
              onClick={onBookmarkToggle}
              className={`btn-bookmark ${isBookmarked ? 'active' : ''}`}
              aria-label="Bookmark event"
              style={{ width: '30px', height: '30px' }}
            >
              <Bookmark style={{ width: '14px', height: '14px' }} />
            </button>
          </div>

          <Link href={`/events/${event.id}`}>
            <h3 className="event-card-title">{event.title}</h3>
          </Link>

          <div className="event-card-date-time">
            <Calendar style={{ width: '12px', height: '12px' }} />
            <span>
              {formatDate(event.start_time, 'EEEE MMM d, yyyy')} · {formatDate(event.start_time, 'h:mm a')}
            </span>
          </div>

          {event.description ? (
            <p className="event-card-description" dangerouslySetInnerHTML={{
              __html: event.description.replace(/<[^>]*>/g, '')
            }} />
          ) : null}

          {event.tags && event.tags.length > 0 ? (
            <div className="event-card-tags">
              {event.tags.slice(0, 4).map((tag) => (
                <TagPill key={tag}>{tag}</TagPill>
              ))}
            </div>
          ) : null}

          <div className="event-card-divider" />

          <div className="event-card-footer">
            {event.organizer ? (
              <div className="event-card-organizer">
                <div className="event-card-organizer-avatar">
                  {event.organizer.avatar_url ? (
                    <Image src={event.organizer.avatar_url} alt={event.organizer.name} width={20} height={20} />
                  ) : (
                    <div style={{
                      width: '100%', height: '100%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '9px', fontWeight: 700,
                      backgroundColor: 'var(--color-accent-light)',
                      color: 'var(--color-accent)',
                    }}>
                      {event.organizer.name[0].toUpperCase()}
                    </div>
                  )}
                </div>
                <span className="event-card-organizer-name">{event.organizer.name}</span>
              </div>
            ) : (
              <div />
            )}

            <div className="event-card-footer-right">
              <span>{weather.icon} {weather.temp}°C, {weather.condition}</span>
              {event.attendee_count ? (
                <>
                  <span>·</span>
                  <span>{event.attendee_count} attending</span>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </article>
    );
  }

  // ── 3. Zentro Ticket Showcase Standard Card ──

  return (
    <article className="event-card" style={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      border: '1px solid var(--color-border)',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
      transition: 'transform 200ms ease, box-shadow 200ms ease',
      cursor: 'pointer',
      height: '100%'
    }}>
      {/* Top cover image */}
      <div style={{ height: '200px', width: '100%', position: 'relative', overflow: 'hidden' }}>
        <Link href={`/events/${event.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
          <Image
            src={imageUrl}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            style={{ objectFit: 'cover' }}
            className="event-card-image"
          />
        </Link>
        
        {/* Top-right bookmark button overlay */}
        <button
          onClick={onBookmarkToggle}
          className={`btn-bookmark ${isBookmarked ? 'active' : ''}`}
          aria-label="Bookmark event"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <Bookmark style={{ width: '14px', height: '14px', color: isBookmarked ? 'var(--color-saved)' : 'var(--color-text-secondary)' }} />
        </button>
      </div>

      {/* Card contents */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 'var(--space-20)',
        flexGrow: 1,
        gap: 'var(--space-8)'
      }}>
        {/* Title */}
        <Link href={`/events/${event.id}`} style={{ textDecoration: 'none' }}>
          <h3 className="event-card-title" style={{
            fontSize: '1.15rem',
            fontWeight: 700,
            lineHeight: 1.25,
            color: 'var(--color-text-primary)',
            margin: 0,
            fontFamily: 'var(--font-sans)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {event.title}
          </h3>
        </Link>

        {/* Category Pill Tag */}
        <div style={{ display: 'inline-flex', alignSelf: 'flex-start', marginTop: '2px' }}>
          <span style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            backgroundColor: 'var(--color-surface-2)',
            color: 'var(--color-text-secondary)',
            padding: '3px 10px',
            borderRadius: '9999px',
            textTransform: 'capitalize',
            fontFamily: 'var(--font-sans)'
          }}>
            {event.category}
          </span>
        </div>

        {/* Date/Time and Location block */}
        <div style={{
          fontSize: '0.8125rem',
          color: 'var(--color-text-secondary)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-6)',
          margin: 'var(--space-8) 0',
          fontFamily: 'var(--font-sans)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar style={{ width: '12px', height: '12px', color: 'var(--color-text-muted)' }} />
            <span>{formatDate(event.start_time, 'EEEE MMMM d, yyyy')} · {formatDate(event.start_time, 'h:mm a')}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin style={{ width: '12px', height: '12px', color: 'var(--color-text-muted)' }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '240px' }}>
              {event.location_name || event.location_city}
            </span>
          </div>
        </div>

        {/* Bottom row details */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginTop: 'auto',
          paddingTop: 'var(--space-12)',
          borderTop: '1px solid var(--color-border)'
        }}>
          {/* Green View CTA button */}
          <Link href={`/events/${event.id}`} style={{
            backgroundColor: '#073e34', // beautiful forest green matching spotseeker/oneticket LKR buttons
            color: '#FFFFFF',
            fontSize: '0.8125rem',
            fontWeight: 700,
            height: '34px',
            borderRadius: '24px',
            padding: '0 var(--space-16)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'none',
            transition: 'opacity 150ms ease'
          }} className="btn-view-event">
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
