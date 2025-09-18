import type { Filter, PriorityStats } from "@/types";

export interface TodoFiltersProps {
  currentFilter: Filter;
  priorityStats: PriorityStats;
  onFilterChange: (filter: Filter) => void;
}

export interface FilterOption {
  key: Filter;
  label: string;
  count?: number;
}
