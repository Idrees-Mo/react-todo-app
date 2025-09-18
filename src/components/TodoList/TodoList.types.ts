import type { Todo, Filter } from "@/types";

export interface TodoListProps {
  todos: Todo[];
  editingId: number | null;
  filter: Filter;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onSave: (id: number, text: string) => void;
  onCancelEdit: () => void;
}
