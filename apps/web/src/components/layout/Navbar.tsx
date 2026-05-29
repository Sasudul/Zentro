'use client';

import Link from 'next/link';
import { Bookmark, Plus, Search } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav style={{
      borderBottom: '1px solid var(--border)',
      backgroundColor: 'var(--bg-card)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 var(--space-24)',
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-16)',
      }}>
        {/* Editorial Logo */}
        <Link href="/" className="font-serif tracking-tight text-xl font-bold" style={{
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>
          P U L S E<span className="text-accent">.</span>
        </Link>

        {/* Global Search Box (Trigger Placeholder for Sprint 5 Cmd+K) */}
        <div style={{
          position: 'relative',
          maxWidth: '400px',
          width: '100%',
          display: 'none', // Handled responsively in media queries or layout
        }} className="md:block">
          <Search className="w-4 h-4 text-muted" style={{
            position: 'absolute',
            left: 'var(--space-16)',
            top: '50%',
            transform: 'translateY(-50%)',
          }} />
          <input
            type="text"
            placeholder="Search events, cities, topics... (Ctrl+K)"
            className="input-field text-sm"
            style={{
              paddingLeft: 'calc(var(--space-16) + 20px)',
              height: '38px',
            }}
            readOnly
            onClick={() => console.log('Search opened')}
          />
        </div>

        {/* Action Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-16)',
        }}>
          <ThemeToggle />

          <Link href="/saved" className="btn-bookmark" aria-label="Bookmarks">
            <Bookmark className="w-4 h-4" />
          </Link>

          {/* Plus Event CTA */}
          <Link href="/events/create" className="btn btn-secondary" style={{
            padding: 'var(--space-8) var(--space-16)',
            fontSize: '0.8125rem',
            height: '36px',
            borderRadius: 'var(--radius-full)',
          }}>
            <Plus className="w-3.5 h-3.5" />
            <span>Create Event</span>
          </Link>

          {/* User Profile / Access Trigger */}
          {isAuthenticated && user ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-12)',
            }}>
              <div className="event-card-organizer-avatar">
                {user.avatar_url ? (
                  <Image
                    src={user.avatar_url}
                    alt={user.name}
                    width={24}
                    height={24}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 700,
                    backgroundColor: 'var(--accent-glow)',
                    color: 'var(--accent)',
                  }}>
                    {user.name[0].toUpperCase()}
                  </div>
                )}
              </div>
              <button
                onClick={() => logout()}
                className="btn-ghost text-xs"
                style={{ cursor: 'pointer', padding: 0 }}
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn btn-primary" style={{
              padding: 'var(--space-8) var(--space-16)',
              fontSize: '0.8125rem',
              height: '36px',
              borderRadius: 'var(--radius-full)',
            }}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
