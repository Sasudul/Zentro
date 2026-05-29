import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Event } from '@pulse/shared';

export function useBookmarks() {
  return useQuery({
    queryKey: ['bookmarks'],
    queryFn: () => api.bookmarks.list(),
  });
}

export function useBookmarkMutation() {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (eventId: string) => api.bookmarks.add(eventId),
    onSuccess: (_, eventId) => {
      // Optimistically update
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      // We might also want to invalidate specific event queries if they include is_bookmarked state
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (eventId: string) => api.bookmarks.remove(eventId),
    onSuccess: (_, eventId) => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  return {
    addBookmark: addMutation.mutateAsync,
    removeBookmark: removeMutation.mutateAsync,
    isAdding: addMutation.isPending,
    isRemoving: removeMutation.isPending,
  };
}
