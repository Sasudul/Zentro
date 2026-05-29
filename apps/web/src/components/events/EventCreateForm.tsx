'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateEventSchema, type CreateEvent } from '@pulse/shared';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export function EventCreateForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<CreateEvent>({
    resolver: zodResolver(CreateEventSchema),
    defaultValues: {
      title: '',
      description: '',
      category: 'conference',
      format: 'in-person',
      tags: [],
    },
    mode: 'onTouched'
  });

  const { register, handleSubmit, control, formState: { errors }, watch, setValue } = form;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Describe your event...' })
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setValue('description', editor.getHTML(), { shouldValidate: true });
    },
  });

  const onSubmit = async (data: CreateEvent) => {
    try {
      setIsSubmitting(true);
      const newEvent = await api.events.create(data);
      router.push(`/events/${newEvent.id}`);
    } catch (err) {
      console.error(err);
      alert('Failed to create event');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentValues = watch();

  return (
    <div className="create-event-page py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-foreground">Create Event</h1>
        <div className="flex gap-2 mt-4">
          <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-accent' : 'bg-muted'}`} />
          <div className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-accent' : 'bg-muted'}`} />
          <div className={`h-2 flex-1 rounded-full ${step >= 3 ? 'bg-accent' : 'bg-muted'}`} />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <div className="create-form-section">
            <h2 className="text-xl font-medium mb-6">Basic Details</h2>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Event Title</label>
                <input 
                  {...register('title')} 
                  className="w-full p-2 border rounded-md bg-transparent" 
                  placeholder="e.g., Tech Startup Mixer"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select {...register('category')} className="w-full p-2 border rounded-md bg-transparent">
                    <option value="conference">Conference</option>
                    <option value="meetup">Meetup</option>
                    <option value="workshop">Workshop</option>
                    <option value="hackathon">Hackathon</option>
                    <option value="social">Social</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Format</label>
                  <select {...register('format')} className="w-full p-2 border rounded-md bg-transparent">
                    <option value="in-person">In Person</option>
                    <option value="online">Online</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <EditorContent editor={editor} />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input 
                  {...register('image_url')} 
                  className="w-full p-2 border rounded-md bg-transparent" 
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="create-form-footer">
                <Button type="button" onClick={() => setStep(2)}>Next Step</Button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="create-form-section">
            <h2 className="text-xl font-medium mb-6">Location & Time</h2>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Start Date & Time</label>
                <input 
                  type="datetime-local" 
                  {...register('start_time')} 
                  className="w-full p-2 border rounded-md bg-transparent" 
                />
                {errors.start_time && <p className="text-red-500 text-sm mt-1">{errors.start_time.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">End Date & Time</label>
                <input 
                  type="datetime-local" 
                  {...register('end_time')} 
                  className="w-full p-2 border rounded-md bg-transparent" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Location Name</label>
                <input 
                  {...register('location_name')} 
                  className="w-full p-2 border rounded-md bg-transparent" 
                  placeholder="e.g., Moscone Center"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input 
                  {...register('location_city')} 
                  className="w-full p-2 border rounded-md bg-transparent" 
                  placeholder="San Francisco"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Country</label>
                <input 
                  {...register('location_country')} 
                  className="w-full p-2 border rounded-md bg-transparent" 
                  placeholder="USA"
                />
              </div>

              <div className="create-form-footer">
                <Button type="button" variant="secondary" onClick={() => setStep(1)}>Back</Button>
                <Button type="button" onClick={() => setStep(3)}>Review</Button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="create-form-section">
            <h2 className="text-xl font-medium mb-6">Review & Publish</h2>
            
            <div className="p-6 border rounded-xl bg-surface/50 mb-6">
              <h3 className="text-2xl font-serif mb-2">{currentValues.title || 'Untitled Event'}</h3>
              <p className="text-muted-foreground mb-4">
                {currentValues.start_time ? new Date(currentValues.start_time).toLocaleString() : 'No date set'}
                {' • '}
                {currentValues.location_name || currentValues.location_city || 'Online'}
              </p>
              <div 
                className="prose prose-sm prose-p:text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: currentValues.description || 'No description provided.' }} 
              />
            </div>

            <div className="create-form-footer">
              <Button type="button" variant="secondary" onClick={() => setStep(2)}>Back</Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? 'Publishing...' : 'Publish Event'}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
