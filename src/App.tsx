import React, { useState, useEffect } from "react";
import { useTodos } from "@/hooks/useTodos";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList/TodoList";
import TodoFilters from "@/components/TodoFilters";
import TodoStats from "@/components/TodoStats";
import ErrorMessage from "@/components/common/ErrorMessage";
import type { Priority, Filter } from "@/types";
import "./App.css";

const App: React.FC = () => {
  const {
    filteredTodos,
    filter,
    editingId,
    remainingCount,
    priorityStats,
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    clearAllTodos,
    setFilter,
    setEditingId,
  } = useTodos();

  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Clear errors after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleAddTodo = async (
    text: string,
    priority: Priority
  ): Promise<void> => {
    try {
      setIsLoading(true);
      addTodo(text, priority);
      setError("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTodo = async (id: number, text: string): Promise<void> => {
    try {
      editTodo(id, text);
      setError("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };

  const handleFilterChange = (newFilter: Filter): void => {
    setFilter(newFilter);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Enhanced React Todo App</h1>
        <p>TypeScript • Priority • Validation • Persistence • Editing</p>
      </header>

      <main className="app-main">
        {error && (
          <ErrorMessage message={error} onDismiss={() => setError("")} />
        )}

        <TodoForm
          onAddTodo={handleAddTodo}
          error={error}
          disabled={isLoading}
        />

        <TodoFilters
          currentFilter={filter}
          onFilterChange={handleFilterChange}
          priorityStats={priorityStats}
        />

        <TodoList
          todos={filteredTodos}
          editingId={editingId}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={setEditingId}
          onSave={handleEditTodo}
          onCancelEdit={() => setEditingId(null)}
          filter={filter}
        />

        <TodoStats
          remainingCount={remainingCount}
          totalCount={todos.length}
          onClearCompleted={clearCompleted}
          onClearAll={clearAllTodos}
        />
      </main>
    </div>
  );
};

export default App;
