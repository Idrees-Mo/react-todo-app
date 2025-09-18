import type { Todo, ValidationResult, Priority } from "@/types";
import { PRIORITIES, VALIDATION_RULES } from "./constants";

export const validateTodoText = (
  text: string,
  todos: Todo[] = [],
  excludeId: number | null = null
): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!text.trim()) {
    errors.text = "Todo text is required";
  } else if (text.trim().length < VALIDATION_RULES.MIN_LENGTH) {
    errors.text = `Todo must be at least ${VALIDATION_RULES.MIN_LENGTH} characters long`;
  } else if (text.trim().length > VALIDATION_RULES.MAX_LENGTH) {
    errors.text = `Todo must be less than ${VALIDATION_RULES.MAX_LENGTH} characters`;
  }

  // Check for duplicates
  if (
    text.trim() &&
    todos.some(
      (todo) =>
        todo.id !== excludeId &&
        todo.text.toLowerCase() === text.trim().toLowerCase()
    )
  ) {
    errors.text = "This todo already exists";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validatePriority = (priority: string): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!priority) {
    errors.priority = "Priority is required";
  } else if (!Object.values(PRIORITIES).includes(priority as Priority)) {
    errors.priority = "Invalid priority value";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateTodo = (
  text: string,
  priority: string,
  todos: Todo[] = [],
  excludeId: number | null = null
): ValidationResult => {
  const textValidation = validateTodoText(text, todos, excludeId);
  const priorityValidation = validatePriority(priority);

  return {
    isValid: textValidation.isValid && priorityValidation.isValid,
    errors: {
      ...textValidation.errors,
      ...priorityValidation.errors,
    },
  };
};
