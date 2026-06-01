import React from 'react';
import { EventCreateForm } from '@/components/events/EventCreateForm';

export const metadata = {
  title: 'Create Event | Zentro',
};

export default function CreateEventPage() {
  return (
    <div className="container mx-auto px-4">
      <EventCreateForm />
    </div>
  );
}
