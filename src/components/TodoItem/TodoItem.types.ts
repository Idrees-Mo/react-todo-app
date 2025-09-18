import type { Todo } from "@/types";

export interface TodoItemProps {
  todo: Todo;
  isEditing: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onSave: (id: number, text: string) => void;
  onCancelEdit: () => void;
}
