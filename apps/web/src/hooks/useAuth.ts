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

  const loginMutation = useMutation({
    mutationFn: api.auth.login,
    onSuccess: (user) => {
      queryClient.setQueryData(['auth-user'], user);
      queryClient.invalidateQueries();
    },
  });

  const registerMutation = useMutation({
    mutationFn: api.auth.register,
    onSuccess: (user) => {
      queryClient.setQueryData(['auth-user'], user);
      queryClient.invalidateQueries();
    },
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
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,
  };
}
