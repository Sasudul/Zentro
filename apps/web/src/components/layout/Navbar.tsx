'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bookmark, CalendarPlus, LogIn, LogOut, UserRound } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import ThemeToggle from '@/components/layout/ThemeToggle';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-brand" aria-label="Zentro home">
          <span className="navbar-brand-mark">
            <Image src="/logo.png" alt="" fill sizes="36px" style={{ objectFit: 'cover' }} priority />
          </span>
          <span className="navbar-brand-copy">
            <span className="navbar-brand-name">ZENTRO</span>
            <span className="navbar-brand-subtitle">Event Bookings</span>
          </span>
        </Link>

        <div className="navbar-links" aria-label="Primary navigation">
          <Link href="/#explore" className="navbar-link">
            Explore Events
          </Link>
          <Link href="/saved" className="navbar-link navbar-link-compact">
            Bookmarks
          </Link>
        </div>

        <div className="navbar-actions">
          {isAuthenticated && user ? (
            <div className="navbar-account">
              <span className="navbar-account-icon">
                <UserRound size={14} />
              </span>
              <span className="navbar-account-label">Signed in as</span>
              <span className="navbar-account-name">{user.name.split(' ')[0]}</span>
              <button type="button" onClick={() => logout()} className="navbar-logout" aria-label="Log out">
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <Link href="/login" className="navbar-link navbar-login">
              <LogIn size={15} />
              Sign In
            </Link>
          )}

          <Link href="/events/create" className="navbar-primary-action">
            <CalendarPlus size={16} />
            Create Event
          </Link>

          <Link href="/saved" className="navbar-icon-action" aria-label="Bookmarks">
            <Bookmark size={17} />
          </Link>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
