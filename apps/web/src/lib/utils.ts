import { clsx, type ClassValue } from 'clsx';
import { format, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(dateString: string, formatPattern: string = 'EEEE, MMM d'): string {
  try {
    return format(parseISO(dateString), formatPattern);
  } catch (error) {
    return dateString;
  }
}

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
