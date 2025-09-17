import type { Priority, Filter } from "@/types";

export const PRIORITIES: Record<string, Priority> = {
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
} as const;

export const PRIORITY_COLORS: Record<Priority, string> = {
  high: "#ff6b6b",
  medium: "#ffa726",
  low: "#66bb6a",
} as const;

export const FILTERS: Record<string, Filter> = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
} as const;

export const STORAGE_KEY = "react-todos" as const;

export const VALIDATION_RULES = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 100,
} as const;

// Priority order for sorting
export const PRIORITY_ORDER: Record<Priority, number> = {
  high: 3,
  medium: 2,
  low: 1,
} as const;
