import React from 'react';
import Link from 'next/link';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-page">
      <div className="auth-content">
        <div className="auth-form-container">
          <Link href="/" className="auth-logo">
            P U L S E<span className="text-accent">.</span>
          </Link>
          {children}
        </div>
      </div>
      <div className="auth-sidebar">
        <div className="auth-sidebar-bg" />
        <div className="auth-sidebar-orb" />
        <div>
          <div className="auth-sidebar-label">Curated Events</div>
          <h2 className="auth-sidebar-headline">
            Discover the moments that shape our culture.
          </h2>
        </div>
        <div className="auth-sidebar-quote">
          &ldquo;PULSE is where the community gathers to share ideas, build connections, and create the future together.&rdquo;
        </div>
      </div>
    </div>
  );
}
