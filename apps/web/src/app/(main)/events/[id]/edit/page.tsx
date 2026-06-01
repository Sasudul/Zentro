import { api } from '@/lib/api';
import { EventCreateForm } from '@/components/events/EventCreateForm';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface Props {
  params: { id: string };
}

export const metadata = {
  title: 'Edit Event | Zentro',
};

export default async function EditEventPage({ params }: Props) {
  try {
    const event = await api.events.get(params.id);

    return (
      <div className="container mx-auto px-4">
        <EventCreateForm initialEvent={event} mode="edit" />
      </div>
    );
  } catch (error: any) {
    if (error.status === 404) {
      notFound();
    }

    return (
      <div style={{ padding: 'var(--space-96) var(--space-24)', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--color-text-primary)' }}>Error loading event</h1>
        <p className="text-secondary" style={{ marginTop: 'var(--space-8)' }}>Please try again later.</p>
      </div>
    );
  }
}
