'use client';

import { useFilterStore } from '@/store/filterStore';
import { X } from 'lucide-react';

export default function EventFilters() {
  const { filters, setFilter, resetFilters } = useFilterStore();

  const categories: { label: string; value: string | undefined }[] = [
    { label: 'All', value: undefined },
    { label: 'Conferences', value: 'conference' },
    { label: 'Meetups', value: 'meetup' },
    { label: 'Hackathons', value: 'hackathon' },
    { label: 'Workshops', value: 'workshop' },
  ];

  const formats: { label: string; value: string | undefined }[] = [
    { label: 'Any Format', value: undefined },
    { label: 'In Person', value: 'in-person' },
    { label: 'Virtual', value: 'virtual' },
    { label: 'Hybrid', value: 'hybrid' },
  ];

  const handleCategoryChange = (val: string | undefined) => {
    setFilter('category', val as any);
  };

  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setFilter('format', val ? (val as any) : undefined);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter('city', e.target.value || undefined);
  };

  const hasActiveFilters =
    filters.category !== undefined ||
    filters.format !== undefined ||
    (filters.city !== undefined && filters.city !== '');

  return (
    <div className="filter-container">
      <div className="filter-row">
        <div className="filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => handleCategoryChange(cat.value)}
              className={`filter-tab ${filters.category === cat.value ? 'active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="filter-actions">
          <input
            type="text"
            value={filters.city || ''}
            onChange={handleCityChange}
            placeholder="Filter by city..."
            className="input-field"
            style={{ width: '160px', height: '36px', borderRadius: 'var(--radius-full)', fontSize: '0.8125rem' }}
          />

          <select
            value={filters.format || ''}
            onChange={handleFormatChange}
            className="input-field"
            style={{ width: '140px', height: '36px', borderRadius: 'var(--radius-full)', fontSize: '0.8125rem' }}
          >
            {formats.map((f) => (
              <option key={f.label} value={f.value || ''}>{f.label}</option>
            ))}
          </select>
        </div>
      </div>

      {hasActiveFilters ? (
        <div className="active-chips">
          {filters.category ? (
            <div className="filter-chip">
              <span>Category: {filters.category}</span>
              <button onClick={() => setFilter('category', undefined)} className="filter-chip-remove">
                <X style={{ width: '12px', height: '12px' }} />
              </button>
            </div>
          ) : null}

          {filters.format ? (
            <div className="filter-chip">
              <span>Format: {filters.format}</span>
              <button onClick={() => setFilter('format', undefined)} className="filter-chip-remove">
                <X style={{ width: '12px', height: '12px' }} />
              </button>
            </div>
          ) : null}

          {filters.city ? (
            <div className="filter-chip">
              <span>City: {filters.city}</span>
              <button onClick={() => setFilter('city', '')} className="filter-chip-remove">
                <X style={{ width: '12px', height: '12px' }} />
              </button>
            </div>
          ) : null}

          <button onClick={resetFilters} className="btn btn-ghost btn-sm" style={{ cursor: 'pointer' }}>
            Clear All
          </button>
        </div>
      ) : null}
    </div>
  );
}
