'use client';

import Link from 'next/link';
import { Bookmark, Plus, Search } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-logo">
          P U L S E<span className="text-accent">.</span>
        </Link>

        <div className="navbar-search">
          <Search className="navbar-search-icon" style={{ width: '14px', height: '14px' }} />
          <input
            type="text"
            placeholder="Search events... (Ctrl+K)"
            className="input-field"
            readOnly
          />
        </div>

        <div className="navbar-actions">
          <ThemeToggle />

          <Link href="/saved" className="btn-bookmark" aria-label="Bookmarks">
            <Bookmark style={{ width: '16px', height: '16px' }} />
          </Link>

          <Link href="/events/create" className="btn btn-secondary navbar-create-btn">
            <Plus style={{ width: '14px', height: '14px' }} />
            <span>Create Event</span>
          </Link>

          {isAuthenticated && user ? (
            <div className="navbar-user">
              <div className="event-card-organizer-avatar">
                {user.avatar_url ? (
                  <Image src={user.avatar_url} alt={user.name} width={24} height={24} />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 700,
                    backgroundColor: 'var(--color-accent-light)',
                    color: 'var(--color-accent)',
                  }}>
                    {user.name[0].toUpperCase()}
                  </div>
                )}
              </div>
              <button onClick={() => logout()} className="btn btn-ghost btn-sm" style={{ cursor: 'pointer' }}>
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
