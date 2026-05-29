import { QueryClient } from '@tanstack/react-query';

// Configure a singleton QueryClient instance with robust defaults
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error: any) => {
        // Do not retry on 404 or 401 errors
        if (error?.status === 404 || error?.status === 401) {
          return false;
        }
        return failureCount < 2;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes stale time
    },
  },
});
