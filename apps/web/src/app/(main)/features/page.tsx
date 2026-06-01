'use client';

import React from 'react';
import { Shield, Sparkles, MapPin, Zap, RefreshCw, BarChart2, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function FeaturesPage() {
  return (
    <div style={{ padding: 'var(--space-64) 0', fontFamily: 'var(--font-sans)', color: 'var(--color-text-primary)' }}>
      {/* Hero section */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-64)' }}>
        <span style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--color-green-brand)',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          backgroundColor: 'rgba(16, 185, 129, 0.08)',
          padding: '6px 12px',
          borderRadius: '20px',
        }}>
          Powering Exceptional Experiences
        </span>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          marginTop: 'var(--space-20)',
          marginBottom: 'var(--space-16)',
          letterSpacing: '-0.02em',
        }}>
          Everything you need to sell tickets
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: 'var(--color-text-secondary)',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          Zentro Event Booking offers Sri Lanka\'s most powerful, responsive, and intuitive platform to manage, distribute, and promote your events.
        </p>
      </div>

      {/* Grid of key features */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'var(--space-32)',
        marginBottom: 'var(--space-64)',
      }}>
        {/* Feature 1 */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          padding: 'var(--space-32)',
          boxShadow: 'var(--shadow-sm)',
          transition: 'transform 200ms ease, box-shadow 200ms ease',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            color: 'var(--color-green-brand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 'var(--space-20)',
          }}>
            <Sparkles size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 'var(--space-8)' }}>Interactive Seating Maps</h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: 1.5 }}>
            Design your venue layout with custom seat plans, VIP zones, and pricing tiers. Attendees can choose their exact seats in real-time.
          </p>
        </div>

        {/* Feature 2 */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          padding: 'var(--space-32)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: 'rgba(79, 70, 229, 0.1)',
            color: 'var(--color-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 'var(--space-20)',
          }}>
            <BarChart2 size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 'var(--space-8)' }}>Real-Time Ticket Sales &amp; CRM</h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: 1.5 }}>
            Monitor your sales dashboards, traffic metrics, and customer databases in real-time. Make data-driven decisions on the fly.
          </p>
        </div>

        {/* Feature 3 */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          padding: 'var(--space-32)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            color: '#F59E0B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 'var(--space-20)',
          }}>
            <Shield size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 'var(--space-8)' }}>Secure Digital Payments</h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: 1.5 }}>
            Accept direct credit cards, mobile wallets, and Sri Lankan local payments securely with immediate bank payouts and 0% risk.
          </p>
        </div>

        {/* Feature 4 */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          padding: 'var(--space-32)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            color: 'var(--color-green-brand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 'var(--space-20)',
          }}>
            <Zap size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 'var(--space-8)' }}>QR Code Check-In App</h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: 1.5 }}>
            Ditch paper tickets. Validate entry passes instantly using our fast mobile scanner app, ensuring a smooth, secure gate check-in.
          </p>
        </div>

        {/* Feature 5 */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          padding: 'var(--space-32)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: 'rgba(79, 70, 229, 0.1)',
            color: 'var(--color-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 'var(--space-20)',
          }}>
            <MapPin size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 'var(--space-8)' }}>Interactive Map Discoverability</h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: 1.5 }}>
            Help attendees discover your events instantly on our fully interactive Google Maps component. Filter by category, format, or date.
          </p>
        </div>

        {/* Feature 6 */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          padding: 'var(--space-32)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            color: '#F59E0B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 'var(--space-20)',
          }}>
            <RefreshCw size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 'var(--space-8)' }}>Live Weather Integrations</h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: 1.5 }}>
            Showcase real-time weather forecasts and temperature indicators directly on your event pages so attendees can plan accordingly.
          </p>
        </div>
      </div>

      {/* CTA section */}
      <div style={{
        backgroundColor: '#071E22',
        borderRadius: '24px',
        padding: 'var(--space-48) var(--space-32)',
        textAlign: 'center',
        color: '#FFFFFF',
      }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, marginBottom: 'var(--space-12)' }}>
          Ready to launch your first event?
        </h2>
        <p style={{ opacity: 0.8, maxWidth: '500px', margin: '0 auto var(--space-24) auto', lineHeight: 1.6 }}>
          Join thousands of creators and communities selling tickets in Sri Lanka with Zentro Event Booking.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-12)', justifyContent: 'center' }}>
          <Link href="/events/create" style={{
            backgroundColor: 'var(--color-green-brand)',
            color: '#FFFFFF',
            padding: '12px 24px',
            borderRadius: '6px',
            fontWeight: 700,
            textDecoration: 'none',
            fontSize: '0.875rem',
            transition: 'opacity 150ms ease',
          }}>
            Create Event
          </Link>
          <Link href="/#explore" style={{
            backgroundColor: 'transparent',
            color: '#FFFFFF',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '12px 24px',
            borderRadius: '6px',
            fontWeight: 700,
            textDecoration: 'none',
            fontSize: '0.875rem',
          }}>
            Explore Events
          </Link>
        </div>
      </div>
    </div>
  );
}
