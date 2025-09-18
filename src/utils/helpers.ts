import type { Todo, Filter, PriorityStats, Priority } from "@/types";
import { FILTERS, PRIORITIES, PRIORITY_ORDER } from "./constants";

export const generateId = (): number => Date.now();

export const filterTodos = (todos: Todo[], filter: Filter): Todo[] => {
  switch (filter) {
    case FILTERS.ACTIVE:
      return todos.filter((todo) => !todo.completed);
    case FILTERS.COMPLETED:
      return todos.filter((todo) => todo.completed);
    case FILTERS.HIGH:
    case FILTERS.MEDIUM:
    case FILTERS.LOW:
      return todos.filter((todo) => todo.priority === filter);
    default:
      return todos;
  }
};

export const sortTodosByPriority = (todos: Todo[]): Todo[] => {
  return [...todos].sort((a, b) => {
    // First sort by completion status (incomplete first)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    // Then sort by priority (high to low)
    return PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority];
  });
};

export const getPriorityStats = (todos: Todo[]): PriorityStats => {
  return {
    high: todos.filter((t) => t.priority === "high" && !t.completed).length,
    medium: todos.filter((t) => t.priority === "medium" && !t.completed).length,
    low: todos.filter((t) => t.priority === "low" && !t.completed).length,
  };
};

export const getTotalStats = (todos: Todo[]) => {
  const completed = todos.filter((t) => t.completed).length;
  const remaining = todos.length - completed;

  return {
    total: todos.length,
    completed,
    remaining,
    completionPercentage:
      todos.length > 0 ? Math.round((completed / todos.length) * 100) : 0,
  };
};

// Type guard to check if a string is a valid Priority
export const isPriority = (value: string): value is Priority => {
  return Object.values(PRIORITIES).includes(value as Priority);
};

// Type guard to check if a string is a valid Filter
export const isFilter = (value: string): value is Filter => {
  return Object.values(FILTERS).includes(value as Filter);
};
