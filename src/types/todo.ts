export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: Priority;
  createdAt?: Date;
  updatedAt?: Date;
}

export type Priority = "high" | "medium" | "low";

export type Filter = "all" | "active" | "completed" | Priority;

export interface PriorityStats {
  high: number;
  medium: number;
  low: number;
}

export interface TodoFormData {
  text: string;
  priority: Priority;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}
