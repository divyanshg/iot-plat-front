import { ClassValue, clsx } from 'clsx';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomColor(): string {
  // Generate random values for red, green, and blue components
  const red = Math.floor(Math.random() * 256); // Random integer between 0 and 255
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Construct the color string in hexadecimal format
  const color = `#${red.toString(16).padStart(2, "0")}${green
    .toString(16)
    .padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;

  return color;
}

export function clickToCopy(text: string) {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard!");
}

export function readableTime(time: string) {
  return new Date(time).toLocaleString();
}