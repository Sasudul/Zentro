import React from 'react';
import Link from 'next/link';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-page">
      <div className="auth-content">
        <div className="auth-form-container">
          <Link href="/" className="text-2xl font-serif tracking-tight block mb-12">
            PULSE.
          </Link>
          {children}
        </div>
      </div>
      <div className="auth-sidebar relative overflow-hidden">
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <div className="text-sm tracking-widest uppercase mb-4 opacity-70">Curated Events</div>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              Discover the moments that shape our culture.
            </h2>
          </div>
          <div className="text-lg opacity-70 max-w-md">
            "PULSE is where the community gathers to share ideas, build connections, and create the future together."
          </div>
        </div>
        
        {/* Abstract background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-foreground to-[#222]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full opacity-10 blur-3xl transform translate-x-1/2 translate-y-1/3" />
      </div>
    </div>
  );
}
