import type { Priority } from "@/types";

export interface TodoFormProps {
  onAddTodo: (text: string, priority: Priority) => void;
  error?: string;
  disabled?: boolean;
}

export interface TodoFormState {
  text: string;
  priority: Priority;
}
