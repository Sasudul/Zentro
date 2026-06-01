'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Github, Instagram, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--color-navbar)',
      borderTop: '1px solid var(--color-navbar-border)',
      padding: 'var(--space-48) var(--space-24) var(--space-24) var(--space-24)',
      marginTop: 'var(--space-64)',
      fontFamily: 'var(--font-sans)',
      transition: 'background-color 200ms ease, border-color 200ms ease'
    }}>
      <div style={{
        maxWidth: '1320px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 'var(--space-40)',
        paddingBottom: 'var(--space-32)'
      }}>
        {/* Brand Block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <div style={{ width: '28px', height: '28px', position: 'relative', borderRadius: '4px', overflow: 'hidden' }}>
              <Image src="/logo.png" alt="Zentro Logo" fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-navbar-logo-text)', letterSpacing: '0.05em' }}>ZENTRO</span>
              <span style={{ fontSize: '0.5rem', fontWeight: 700, color: 'var(--color-green-brand)', letterSpacing: '0.15em' }}>EVENT BOOKINGS</span>
            </div>
          </Link>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0, maxWidth: '200px' }}>
            Sri Lanka's premium and most robust ticketing and event discovery platform.
          </p>
        </div>

        {/* Column 1 - Discover */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Discover</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>
              <Link href="/#explore" style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color 150ms ease' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-green-brand)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
                Explore Events
              </Link>
            </li>
            <li>
              <Link href="/saved" style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color 150ms ease' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-green-brand)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
                Bookmarks
              </Link>
            </li>
            <li>
              <Link href="/events/create" style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color 150ms ease' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-green-brand)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
                Create Event
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2 - Legal */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Platform</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>
              <Link href="/#explore" style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link href="/#explore" style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <a href="mailto:support@zentro.com" style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
                Customer Support
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 - Connect */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Connect</h4>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '4px' }}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-secondary)', transition: 'color 150ms ease' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-green-brand)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
              <Github size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-secondary)', transition: 'color 150ms ease' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-green-brand)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
              <Linkedin size={18} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-secondary)', transition: 'color 150ms ease' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-green-brand)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
              <Facebook size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-secondary)', transition: 'color 150ms ease' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-green-brand)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
              <Twitter size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-secondary)', transition: 'color 150ms ease' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-green-brand)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}>
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--color-navbar-border)', margin: '0 0 var(--space-24) 0' }} />

      {/* Bottom Copyright Row */}
      <div style={{
        maxWidth: '1320px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        fontSize: '0.75rem',
        color: 'var(--color-text-secondary)'
      }}>
        <span>&copy; {new Date().getFullYear()} Zentro Event Bookings. All rights reserved.</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>Crafted with</span>
          <Heart size={10} style={{ color: 'var(--color-green-brand)', fill: 'var(--color-green-brand)' }} />
          <span>in Sri Lanka.</span>
        </div>
      </div>
    </footer>
  );
}
