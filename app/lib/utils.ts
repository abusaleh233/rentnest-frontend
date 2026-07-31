import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Classname Generator Helper
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// BDT Price Formatter
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('bn-BD', {
    style: 'currency',
    currency: 'BDT',
    maximumFractionDigits: 0,
  }).format(amount);
}