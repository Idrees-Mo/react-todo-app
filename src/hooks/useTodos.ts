import { useState, useCallback } from "react";
import type { Todo, Priority, Filter, PriorityStats } from "@/types";
import { useLocalStorage } from "./useLocalStorage";
import {
  generateId,
  filterTodos,
  getPriorityStats,
  sortTodosByPriority,
} from "@/utils/helpers";
import { validateTodo } from "@/utils/validation";
import { STORAGE_KEY, PRIORITIES, FILTERS } from "@/utils/constants";

const initialTodos: Todo[] = [
  {
    id: 1,
    text: "Bursh up on React",
    completed: false,
    priority: PRIORITIES.HIGH,
    createdAt: new Date(),
  },
  {
    id: 2,
    text: "Learn TypeScript",
    completed: true,
    priority: PRIORITIES.MEDIUM,
    createdAt: new Date(),
  },
];

interface UseTodosReturn {
  // State
  todos: Todo[];
  filteredTodos: Todo[];
  filter: Filter;
  editingId: number | null;
  remainingCount: number;
  priorityStats: PriorityStats;

  // Actions
  addTodo: (text: string, priority?: Priority) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newText: string) => void;
  clearCompleted: () => void;
  clearAllTodos: () => void;

  // UI State
  setFilter: (filter: Filter) => void;
  setEditingId: (id: number | null) => void;
}

export const useTodos = (): UseTodosReturn => {
  const {
    storedValue: todos,
    setValue: setTodos,
    removeValue: clearTodos,
  } = useLocalStorage<Todo[]>(STORAGE_KEY, initialTodos);

  const [filter, setFilter] = useState<Filter>(FILTERS.ALL);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Add todo
  const addTodo = useCallback(
    (text: string, priority: Priority = PRIORITIES.MEDIUM) => {
      const validation = validateTodo(text, priority, todos);
      if (!validation.isValid) {
        throw new Error(Object.values(validation.errors)[0]);
      }

      const newTodo: Todo = {
        id: generateId(),
        text: text.trim(),
        completed: false,
        priority,
        createdAt: new Date(),
      };

      setTodos((prevTodos) => [...prevTodos, newTodo]);
    },
    [todos, setTodos]
  );

  // Toggle todo completion
  const toggleTodo = useCallback(
    (id: number) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id
            ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
            : todo
        )
      );
    },
    [setTodos]
  );

  // Delete todo
  const deleteTodo = useCallback(
    (id: number) => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      if (editingId === id) {
        setEditingId(null);
      }
    },
    [setTodos, editingId]
  );

  // Edit todo
  const editTodo = useCallback(
    (id: number, newText: string) => {
      const validation = validateTodo(newText, PRIORITIES.MEDIUM, todos, id);
      if (!validation.isValid) {
        throw new Error(Object.values(validation.errors)[0]);
      }

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id
            ? { ...todo, text: newText.trim(), updatedAt: new Date() }
            : todo
        )
      );
      setEditingId(null);
    },
    [todos, setTodos]
  );

  // Clear completed todos
  const clearCompleted = useCallback(() => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  }, [setTodos]);

  // Computed values
  const sortedTodos = sortTodosByPriority(todos);
  const filteredTodos = filterTodos(sortedTodos, filter);
  const remainingCount = todos.filter((todo) => !todo.completed).length;
  const priorityStats = getPriorityStats(todos);

  return {
    // State
    todos: sortedTodos,
    filteredTodos,
    filter,
    editingId,
    remainingCount,
    priorityStats,

    // Actions
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    clearAllTodos: clearTodos,

    // UI State
    setFilter,
    setEditingId,
  };
};
