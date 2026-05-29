import type { Metadata } from 'next';
import { Lora, Plus_Jakarta_Sans, Space_Mono } from 'next/font/google';
import Providers from '@/components/providers/Providers';
import Navbar from '@/components/layout/Navbar';
import './globals.css';

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PULSE — Discover Premium Tech Events',
  description: 'Curated technical conferences, meetups, hackathons, and workshops globally with live weather and mapping details.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${plusJakartaSans.variable} ${spaceMono.variable}`}
      data-theme="light"
    >
      <body>
        <Providers>
          <Navbar />
          <main className="main-content">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
