import React from "react";
import TodoItem from "@/components/TodoItem/TodoItem";
import type { TodoListProps } from "./TodoList.types";
import styles from "./TodoList.module.css";

const TodoList: React.FC<TodoListProps> = ({
  todos,
  editingId,
  filter,
  onToggle,
  onDelete,
  onEdit,
  onSave,
  onCancelEdit,
}) => {
  if (todos.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📝</div>
        <p className={styles.emptyMessage}>
          {filter === "all" ? "No todos yet!" : `No ${filter} todos!`}
        </p>
        <p className={styles.emptyHint}>
          {filter === "all"
            ? "Add your first todo above to get started."
            : "Try a different filter to see more todos."}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.listHeader}>
        <p className={styles.hint}>💡 Double-click any todo to edit it</p>
      </div>

      <div className={styles.list} role="list">
        {todos.map((todo) => (
          <div key={todo.id} role="listitem">
            <TodoItem
              todo={todo}
              isEditing={editingId === todo.id}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
              onSave={onSave}
              onCancelEdit={onCancelEdit}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
