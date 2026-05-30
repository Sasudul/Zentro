'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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

  const { register, handleSubmit, formState: { errors }, watch, setValue } = form;

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
    <div className="create-event-page">
      <div className="create-header">
        <h1>Create Event</h1>
        <div className="create-steps">
          <div className={`create-step-bar ${step >= 1 ? 'active' : ''}`} />
          <div className={`create-step-bar ${step >= 2 ? 'active' : ''}`} />
          <div className={`create-step-bar ${step >= 3 ? 'active' : ''}`} />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <div className="create-form-section">
            <h2 className="create-section-title">Basic Details</h2>

            <div className="create-fields">
              <div className="form-group">
                <label className="form-label">Event Title</label>
                <input
                  {...register('title')}
                  className="input-field"
                  placeholder="e.g., Tech Startup Mixer"
                />
                {errors.title && <p className="form-error">{errors.title.message}</p>}
              </div>

              <div className="create-field-row">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select {...register('category')} className="input-field">
                    <option value="conference">Conference</option>
                    <option value="meetup">Meetup</option>
                    <option value="workshop">Workshop</option>
                    <option value="hackathon">Hackathon</option>
                    <option value="social">Social</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Format</label>
                  <select {...register('format')} className="input-field">
                    <option value="in-person">In Person</option>
                    <option value="online">Online</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <EditorContent editor={editor} />
                {errors.description && <p className="form-error">{errors.description.message}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Image URL</label>
                <input
                  {...register('image_url')}
                  className="input-field"
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
            <h2 className="create-section-title">Location &amp; Time</h2>

            <div className="create-fields">
              <div className="create-field-row">
                <div className="form-group">
                  <label className="form-label">Start Date &amp; Time</label>
                  <input type="datetime-local" {...register('start_time')} className="input-field" />
                  {errors.start_time && <p className="form-error">{errors.start_time.message}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label">End Date &amp; Time</label>
                  <input type="datetime-local" {...register('end_time')} className="input-field" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Venue Name</label>
                <input {...register('location_name')} className="input-field" placeholder="e.g., Moscone Center" />
              </div>

              <div className="create-field-row">
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input {...register('location_city')} className="input-field" placeholder="San Francisco" />
                </div>
                <div className="form-group">
                  <label className="form-label">Country</label>
                  <input {...register('location_country')} className="input-field" placeholder="USA" />
                </div>
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
            <h2 className="create-section-title">Review &amp; Publish</h2>

            <div className="create-preview">
              <h3>{currentValues.title || 'Untitled Event'}</h3>
              <p className="create-preview-meta">
                {currentValues.start_time ? new Date(currentValues.start_time).toLocaleString() : 'No date set'}
                {' · '}
                {currentValues.location_name || currentValues.location_city || 'Online'}
              </p>
              <div
                className="create-preview-body"
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
