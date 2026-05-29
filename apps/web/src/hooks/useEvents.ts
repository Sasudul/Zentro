import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { EventFilters } from '@/types/index';

// Query hook to fetch paginated and filtered events list
export function useEvents(filters: Partial<EventFilters> = {}) {
  return useQuery({
    queryKey: ['events', filters],
    queryFn: () => api.events.list(filters),
    placeholderData: (prev) => prev, // Keeps old grid visible during next page load
  });
}

// Query hook to fetch a single event detail profile by ID
export function useEvent(id: string | undefined) {
  return useQuery({
    queryKey: ['event', id],
    queryFn: () => api.events.get(id!),
    enabled: !!id,
  });
}
