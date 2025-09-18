import React, { useState } from "react";
import type { FormEvent } from "react";
import Button from "../common/Button";
import type { TodoFormProps, TodoFormState } from "./TodoForm.types";
import { PRIORITIES } from "@/utils/constants";
import type { Priority } from "@/types";
import styles from "./TodoForm.module.css";

const TodoForm: React.FC<TodoFormProps> = ({
  onAddTodo,
  error,
  disabled = false,
}) => {
  const [formState, setFormState] = useState<TodoFormState>({
    text: "",
    priority: PRIORITIES.MEDIUM,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disabled) return;

    try {
      onAddTodo(formState.text, formState.priority);
      setFormState({
        text: "",
        priority: PRIORITIES.MEDIUM,
      });
    } catch (error) {
      // Error is handled by parent component
      console.error("Failed to add todo:", error);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      text: e.target.value,
    }));
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormState((prev) => ({
      ...prev,
      priority: e.target.value as Priority,
    }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={formState.text}
          onChange={handleTextChange}
          placeholder="What needs to be done? (min 3 chars)"
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          disabled={disabled}
          aria-label="Todo text"
          aria-describedby={error ? "todo-error" : undefined}
        />

        <select
          value={formState.priority}
          onChange={handlePriorityChange}
          className={styles.select}
          disabled={disabled}
          aria-label="Todo priority"
        >
          <option value={PRIORITIES.HIGH}>High</option>
          <option value={PRIORITIES.MEDIUM}>Medium</option>
          <option value={PRIORITIES.LOW}>Low</option>
        </select>

        <Button
          type="submit"
          variant="primary"
          disabled={disabled || !formState.text.trim()}
        >
          Add Todo
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;
