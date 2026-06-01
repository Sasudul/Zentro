'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateEventSchema, type CreateEvent, type Event } from '@zentro/shared';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

interface EventCreateFormProps {
  initialEvent?: Event;
  mode?: 'create' | 'edit';
}

function toDateTimeLocal(value?: string | null) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}

export function EventCreateForm({ initialEvent, mode = 'create' }: EventCreateFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [tagsText, setTagsText] = useState(initialEvent?.tags?.join(', ') || '');
  const router = useRouter();
  const isEditing = mode === 'edit' && initialEvent;

  const form = useForm<CreateEvent>({
    resolver: zodResolver(CreateEventSchema),
    defaultValues: {
      title: initialEvent?.title || '',
      description: initialEvent?.description || '',
      category: initialEvent?.category || 'conference',
      format: initialEvent?.format || 'in-person',
      start_time: toDateTimeLocal(initialEvent?.start_time),
      end_time: toDateTimeLocal(initialEvent?.end_time),
      location_name: initialEvent?.location_name || '',
      location_city: initialEvent?.location_city || 'Colombo',
      location_country: initialEvent?.location_country || 'Sri Lanka',
      url: initialEvent?.url || '',
      image_url: initialEvent?.image_url || '',
      tags: initialEvent?.tags || [],
    },
    mode: 'onTouched',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const imageUrl = watch('image_url');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size exceeds the 5MB limit.');
      return;
    }

    try {
      setUploadingImage(true);
      const base64Str = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Str }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Upload failed');
      }

      const data = await response.json();
      setValue('image_url', data.url, { shouldValidate: true, shouldDirty: true });
    } catch (err: any) {
      alert(`Failed to upload image: ${err.message || err}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = async (data: CreateEvent) => {
    try {
      setIsSubmitting(true);
      const payload = {
        ...data,
        tags: tagsText
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean)
          .slice(0, 10),
      };

      const savedEvent = isEditing
        ? await api.events.update(initialEvent.id, payload)
        : await api.events.create(payload);

      router.push(`/events/${savedEvent.id}`);
      router.refresh();
    } catch (err: any) {
      alert(`Failed to ${isEditing ? 'update' : 'create'} event: ${err.message || err}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-event-page" style={{ maxWidth: '760px', margin: '0 auto', padding: 'var(--space-32) 0' }}>
      <div className="create-header">
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 'var(--space-8)' }}>
          {isEditing ? 'Edit Event' : 'Create Event'}
        </h1>
        <p className="text-secondary" style={{ margin: 0 }}>
          {isEditing ? 'Update your event details and keep attendees informed.' : 'Publish a tech event for the Zentro community.'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="create-form-section" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: 'var(--space-24)' }}>
        <div className="form-group">
          <label className="form-label">Event Title</label>
          <input {...register('title')} className="input-field" placeholder="Colombo AI Meetup" />
          {errors.title && <p className="form-error">{errors.title.message}</p>}
        </div>

        <div className="create-field-row">
          <div className="form-group">
            <label className="form-label">Category</label>
            <select {...register('category')} className="input-field">
              <option value="conference">Conference</option>
              <option value="meetup">Meetup</option>
              <option value="hackathon">Hackathon</option>
              <option value="workshop">Workshop</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Format</label>
            <select {...register('format')} className="input-field">
              <option value="in-person">In Person</option>
              <option value="virtual">Virtual</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea {...register('description')} className="input-field" rows={7} placeholder="Describe the agenda, speakers, audience, and what attendees will learn." />
          {errors.description && <p className="form-error">{errors.description.message}</p>}
        </div>

        <div className="create-field-row">
          <div className="form-group">
            <label className="form-label">Start Date and Time</label>
            <input type="datetime-local" {...register('start_time')} className="input-field" />
            {errors.start_time && <p className="form-error">{errors.start_time.message}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">End Date and Time</label>
            <input type="datetime-local" {...register('end_time')} className="input-field" />
            {errors.end_time && <p className="form-error">{errors.end_time.message}</p>}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Venue Name</label>
          <input {...register('location_name')} className="input-field" placeholder="Hatch Coworking Space" />
        </div>

        <div className="create-field-row">
          <div className="form-group">
            <label className="form-label">City</label>
            <input {...register('location_city')} className="input-field" placeholder="Colombo" />
          </div>
          <div className="form-group">
            <label className="form-label">Country</label>
            <input {...register('location_country')} className="input-field" placeholder="Sri Lanka" />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Tags</label>
          <input
            value={tagsText}
            onChange={(e) => setTagsText(e.target.value)}
            className="input-field"
            placeholder="AI, React, Startups"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Event Website</label>
          <input {...register('url')} className="input-field" placeholder="https://example.com/event" />
          {errors.url && <p className="form-error">{errors.url.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Banner Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="input-field" />
          <input {...register('image_url')} className="input-field" placeholder="https://images.example.com/banner.jpg" style={{ marginTop: 'var(--space-8)' }} />
          {uploadingImage && <p className="text-secondary text-sm">Uploading image...</p>}
          {errors.image_url && <p className="form-error">{errors.image_url.message}</p>}
          {imageUrl && (
            <div style={{ marginTop: 'var(--space-12)', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
              <img src={imageUrl} alt="Event banner preview" style={{ display: 'block', width: '100%', maxHeight: '260px', objectFit: 'cover' }} />
            </div>
          )}
        </div>

        {Object.keys(errors).length > 0 && (
          <div className="form-error" style={{ padding: 'var(--space-12)', border: '1px solid #FCA5A5', borderRadius: '8px' }}>
            Please correct the highlighted fields before publishing.
          </div>
        )}

        <div className="create-form-footer" style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting || uploadingImage}>
            {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Publish Event'}
          </Button>
        </div>
      </form>
    </div>
  );
}
