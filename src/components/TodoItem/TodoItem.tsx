import React, { useState, useEffect } from "react";
import type { KeyboardEvent } from "react";
import Button from "@/components/common/Button";
import type { TodoItemProps } from "./TodoItem.types";
import { PRIORITY_COLORS } from "@/utils/constants";
import styles from "./TodoItem.module.css";

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  isEditing,
  onToggle,
  onDelete,
  onEdit,
  onSave,
  onCancelEdit,
}) => {
  const [editText, setEditText] = useState<string>(todo.text);

  // Reset edit text when editing starts
  useEffect(() => {
    if (isEditing) {
      setEditText(todo.text);
    }
  }, [isEditing, todo.text]);

  const handleSave = (): void => {
    if (editText.trim()) {
      onSave(todo.id, editText.trim());
    } else {
      onCancelEdit();
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      onCancelEdit();
    }
  };

  const handleToggle = (): void => {
    onToggle(todo.id);
  };

  const handleDelete = (): void => {
    onDelete(todo.id);
  };

  const handleEdit = (): void => {
    onEdit(todo.id);
  };

  const priorityColor = PRIORITY_COLORS[todo.priority];

  return (
    <div
      className={`${styles.todoItem} ${todo.completed ? styles.completed : ""}`}
      style={{ borderLeftColor: priorityColor }}
    >
      <div className={styles.content}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className={styles.checkbox}
          aria-label={`Mark "${todo.text}" as ${todo.completed ? "incomplete" : "complete"}`}
        />

        <span
          className={styles.priority}
          style={{ backgroundColor: priorityColor }}
          title={`Priority: ${todo.priority}`}
        >
          {todo.priority.charAt(0).toUpperCase()}
        </span>

        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            onBlur={handleSave}
            autoFocus
            className={styles.editInput}
            aria-label="Edit todo text"
          />
        ) : (
          <span
            className={`${styles.text} ${todo.completed ? styles.textCompleted : ""}`}
            onDoubleClick={handleEdit}
            title="Double-click to edit"
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className={styles.actions}>
        {isEditing ? (
          <>
            <Button
              onClick={handleSave}
              variant="success"
              size="small"
              aria-label="Save changes"
            >
              Save
            </Button>
            <Button
              onClick={onCancelEdit}
              variant="secondary"
              size="small"
              aria-label="Cancel editing"
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            onClick={handleDelete}
            variant="danger"
            size="small"
            aria-label={`Delete "${todo.text}"`}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
