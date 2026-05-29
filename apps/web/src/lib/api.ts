import type { EventFilters, Event, PaginatedResponse, User } from '@pulse/shared';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Custom API error representing backend JSON failures
export class ApiClientError extends Error {
  constructor(public status: number, message: string, public details?: any) {
    super(message);
    this.name = 'ApiClientError';
  }
}

// Request helper that forces session credentials
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const headers = new Headers(options.headers);

  if (options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // Important to pass Express session cookies
  });

  if (!response.ok) {
    let errorMessage = 'An error occurred';
    let details;
    
    try {
      const errorJson = await response.json() as any;
      errorMessage = errorJson.error || errorMessage;
      details = errorJson.details;
    } catch {
      // Body was not JSON
    }

    throw new ApiClientError(response.status, errorMessage, details);
  }

  return response.json() as Promise<T>;
}

export const api = {
  events: {
    list: async (filters: Partial<EventFilters> = {}): Promise<PaginatedResponse<Event>> => {
      const searchParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          searchParams.set(key, String(val));
        }
      });

      const queryString = searchParams.toString();
      const path = `/api/events${queryString ? `?${queryString}` : ''}`;
      
      const response = await request<{ data: Event[]; pagination: any }>(path);
      return {
        data: response.data,
        pagination: response.pagination,
      };
    },

    get: async (id: string): Promise<Event> => {
      const response = await request<{ data: Event }>(`/api/events/${id}`);
      return response.data;
    },

    create: async (eventData: any): Promise<Event> => {
      const response = await request<{ data: Event }>('/api/events', {
        method: 'POST',
        body: JSON.stringify(eventData),
      });
      return response.data;
    },
  },

  auth: {
    getMe: async (): Promise<User> => {
      const response = await request<{ data: User }>('/api/auth/me');
      return response.data;
    },
    logout: async (): Promise<{ success: boolean }> => {
      return request<{ success: boolean }>('/api/auth/logout', {
        method: 'POST',
      });
    },
  },
};
