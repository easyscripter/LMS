import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFullName({ name, surname }: { name: string; surname: string }) {
  return `${name} ${surname}`;
}
