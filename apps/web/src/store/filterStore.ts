import { create } from 'zustand';
import type { EventFilters } from '@pulse/shared';

interface FilterState {
  filters: Partial<EventFilters>;
  setFilter: <K extends keyof EventFilters>(key: K, value: EventFilters[K] | undefined) => void;
  setFilters: (filters: Partial<EventFilters>) => void;
  resetFilters: () => void;
}

const initialFilters: Partial<EventFilters> = {
  q: '',
  category: undefined,
  format: undefined,
  city: '',
  from: undefined,
  to: undefined,
  page: 1,
  limit: 20,
};

export const useFilterStore = create<FilterState>((set) => ({
  filters: initialFilters,
  
  setFilter: (key, value) =>
    set((state) => {
      const newFilters = {
        ...state.filters,
        [key]: value,
      };
      if (key !== 'page') {
        newFilters.page = 1;
      }
      return { filters: newFilters };
    }),

  setFilters: (newFilters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    })),

  resetFilters: () =>
    set({
      filters: initialFilters,
    }),
}));
