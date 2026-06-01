import { Metadata } from 'next';
import { api } from '@/lib/api';
import { EventDetail } from '@/components/events/EventDetail';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const event = await api.events.get(params.id);
    return {
      title: `${event.title} | Zentro`,
      description: (event.description || '').replace(/<[^>]*>?/gm, '').substring(0, 160),
    };
  } catch (error) {
    return {
      title: 'Event Not Found | Zentro',
    };
  }
}

export default async function EventPage({ params }: Props) {
  try {
    const event = await api.events.get(params.id);
    return (
      <main style={{ padding: 'var(--space-48) 0' }}>
        <EventDetail event={event} />
      </main>
    );
  } catch (error: any) {
    if (error.status === 404) {
      notFound();
    }
    return (
      <div style={{ padding: 'var(--space-96) var(--space-24)', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-text-primary)' }}>Error loading event</h1>
        <p className="text-secondary" style={{ marginTop: 'var(--space-8)' }}>Please try again later.</p>
      </div>
    );
  }
}
