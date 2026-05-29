import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

// Query hook to fetch and keep session user profile state
export function useAuth() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['auth-user'],
    queryFn: api.auth.getMe,
    retry: false, // Do not retry if unauthorized (401 is clean)
    staleTime: 10 * 60 * 1000, // 10 minutes cache
  });

  const logoutMutation = useMutation({
    mutationFn: api.auth.logout,
    onSuccess: () => {
      // Clear all cache states on logout
      queryClient.setQueryData(['auth-user'], null);
      queryClient.invalidateQueries();
    },
  });

  return {
    user: query.data ?? null,
    isLoading: query.isLoading,
    isAuthenticated: !!query.data,
    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,
  };
}
