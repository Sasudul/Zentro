import { Metadata } from 'next';
import { api } from '@/lib/api';
import { EventDetail } from '@/components/events/EventDetail';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const event = await api.events.get(params.id);
    return {
      title: `${event.title} | PULSE`,
      description: (event.description || '').replace(/<[^>]*>?/gm, '').substring(0, 160),
    };
  } catch (error) {
    return {
      title: 'Event Not Found | PULSE',
    };
  }
}

export default async function EventPage({ params }: Props) {
  try {
    const event = await api.events.get(params.id);
    return (
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <EventDetail event={event} />
      </main>
    );
  } catch (error: any) {
    if (error.status === 404) {
      notFound();
    }
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-serif text-foreground">Error loading event</h1>
        <p className="text-muted-foreground mt-2">Please try again later.</p>
      </div>
    );
  }
}
