import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
}
export function getDurationShort(start: Date, end: Date): string {
  const diffMs = end.getTime() - start.getTime()
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  if (days > 0) return `${days}`
  if (hours > 0) return `${hours}h`
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
  return `${minutes}m`
}

export function calculateDaysLeft(endDate: Date): number {
  const end = new Date(endDate).getTime()
  const now = Date.now()
  const diff = end - now
  return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0)
}
export function truncateWords(text: string, count: number) {
  const words = text.trim().split(/\s+/)
  if (words.length <= count) return text
  return words.slice(0, count).join(" ") + "…"
}
export function formatDate (value?: string | Date): string  {
  if (!value) return "";
  const date = typeof value === "string"
    ? new Date(value)
    : value;

  if (isNaN(date.getTime())) {
    console.warn("formatDate: got invalid date value", value);
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
};
export function formatDateForInput(date: Date | string | null | undefined): string {
  if (!date) return "";

  const d = typeof date === "string" ? new Date(date) : date;

  if (isNaN(d.getTime())) return ""; // Invalid date

  return d.toISOString().split("T")[0]; // Format as YYYY-MM-DD
}


export const InvestmentStrategyRiskModifiers: Record<number, string> = {
  0.8:   'conservative',
  1.0:   'balanced',
  1.2:   'aggressive',
  0.9:   'income',
  1.1:   'growth',
  0.95:  'index',
  1.05:  'value',
  1.3:   'momentum',
};

export const RiskToleranceLevelModifier : Record<number, string> = {
    1 : 'low',
    2 : 'medium',
    3 : 'high',
}

