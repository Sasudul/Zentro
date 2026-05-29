import { create } from 'zustand';

interface UiState {
  searchOpen: boolean;
  mapExpanded: boolean;
  activeEventId: string | null;
  
  setSearchOpen: (open: boolean) => void;
  toggleSearch: () => void;
  setMapExpanded: (expanded: boolean) => void;
  toggleMap: () => void;
  setActiveEventId: (eventId: string | null) => void;
}

export const useUiStore = create<UiState>((set) => ({
  searchOpen: false,
  mapExpanded: true, // Default to showing map panel in split view
  activeEventId: null,

  setSearchOpen: (open) => set({ searchOpen: open }),
  
  toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),
  
  setMapExpanded: (expanded) => set({ mapExpanded: expanded }),
  
  toggleMap: () => set((state) => ({ mapExpanded: !state.mapExpanded })),
  
  setActiveEventId: (eventId) => set({ activeEventId: eventId }),
}));
