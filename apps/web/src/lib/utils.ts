import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO } from 'date-fns';

// Merges classnames safely
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formats API ISO dates into user-friendly display formats
export function formatDate(dateString: string, formatPattern: string = 'EEEE, MMM d'): string {
  try {
    return format(parseISO(dateString), formatPattern);
  } catch (error) {
    return dateString;
  }
}

// Formats start and end times together cleanly
export function formatTimeRange(startStr: string, endStr: string): string {
  try {
    const start = parseISO(startStr);
    const end = parseISO(endStr);
    
    const timeFormat = 'h:mm a';
    return `${format(start, timeFormat)} – ${format(end, timeFormat)}`;
  } catch (error) {
    return '';
  }
}
