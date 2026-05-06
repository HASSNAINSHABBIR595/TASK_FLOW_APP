import Notification from "./components/Notification";
import Navbar from "./components/Navbar";
import StatsGrid from "./components/StatsGrid";
import Input from "./components/Input";
import TodoList from "./components/TodoList";
import ClearButton from "./components/ClearButton";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { playSound } from "./components/PlaySound";

const STORAGE_KEY = "todos";
const MAX_TODO_LENGTH = 160;
const AnimateBg = lazy(() => import("./components/AnimateBg"));

const isValidTodo = (todo) =>
  todo &&
  (typeof todo.id === "string" || typeof todo.id === "number") &&
  typeof todo.text === "string" &&
  typeof todo.completed === "boolean";

const parseStoredTodos = (storedValue) => {
  if (!storedValue) return [];
  const parsed = JSON.parse(storedValue);
  if (!Array.isArray(parsed)) return [];
  return parsed.filter(isValidTodo).map((todo) => ({
    ...todo,
    text: todo.text.slice(0, MAX_TODO_LENGTH),
  }));
};

const App = () => {
  const [todos, setTodos] = useState(() => {
    try {
      return parseStoredTodos(localStorage.getItem(STORAGE_KEY));
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [notification, setNotification] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [showDecorations, setShowDecorations] = useState(false);
  const notificationTimeoutRef = useRef(null);
  const totalTodos = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = totalTodos - completedCount;
  const progress = todos.length > 0 ? (completedCount / todos.length) * 100 : 0;

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // Ignore storage quota/private mode write errors.
    }
  }, [todos]);

  useEffect(
    () => () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const enableDecorations = () => setShowDecorations(true);
    const idleCallback =
      window.requestIdleCallback?.(enableDecorations, { timeout: 1500 }) ??
      window.setTimeout(enableDecorations, 200);

    return () => {
      if (window.cancelIdleCallback && typeof idleCallback === "number") {
        window.cancelIdleCallback(idleCallback);
      } else {
        clearTimeout(idleCallback);
      }
    };
  }, []);

  const showNotification = (message, type = "success") => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    setNotification({ message, type });
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleAddTodo = () => {
    const nextText = input.trim().slice(0, MAX_TODO_LENGTH);
    if (!nextText) return;

    const newTodo = {
      id: Date.now(),
      text: nextText,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos((prev) => [newTodo, ...prev]);
    setInput("");
    playSound("add");
    showNotification("✨ Task Added Successfully!");
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText((text ?? "").slice(0, MAX_TODO_LENGTH));
  };

  const saveEdit = (id) => {
    const nextText = editText.trim().slice(0, MAX_TODO_LENGTH);
    if (!nextText) return;

    setTodos(
      (prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, text: nextText } : todo,
        ),
    );
    setEditText("");
    setEditingId(null);
    playSound("update");
    showNotification("Task Updated Successfully!");
  };

  const cancelEdit = () => {
    setEditText("");
    setEditingId(null);
  };

  const handleEditTextChange = (e) => {
    setEditText(e.target.value.slice(0, MAX_TODO_LENGTH));
  };

  const handleEditKeyPress = (e, id) => {
    if (e.key === "Enter") {
      saveEdit(id);
    } else if (e.key === "Escape") {
      setEditingId(null);
    }
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    playSound("delete");
    showNotification("🗑️ Task Deleted", "info");
  };

  const handleToggle = (id) => {
    const targetTodo = todos.find((todo) => todo.id === id);
    setTodos(
      (prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
    );

    if (targetTodo && !targetTodo.completed) {
      playSound("complete");
      showNotification("🎉 Great Job! Task Completed");
    }
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
    playSound("delete");
    showNotification("🗑️ Completed Tasks Cleared", "info");
  };

  return (
    <div className="w-full h-screen overflow-auto bg-linear-to-br from-indigo-950 via-purple-950 to-pink-950 p-3 sm:p-6 relative">
      {showDecorations ? (
        <Suspense fallback={null}>
          <AnimateBg />
        </Suspense>
      ) : null}
      <Notification
        notification={notification}
        onClose={() => setNotification(null)}
      />
      <div className="max-w-3xl mx-auto relative z-10">
        <Navbar progress={progress} active={activeCount} />

        <StatsGrid
          total={totalTodos}
          completed={completedCount}
          active={activeCount}
        />

        <Input
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, MAX_TODO_LENGTH))}
          onAdd={handleAddTodo}
        />

        <TodoList
          todos={todos}
          onStartEdit={startEditing}
          onSaveEdit={saveEdit}
          onCancelEdit={cancelEdit}
          onToggle={handleToggle}
          onDelete={deleteTodo}
          editingId={editingId}
          editText={editText}
          onEditTextChange={handleEditTextChange}
          onEditKeyPress={handleEditKeyPress}
        />

        <ClearButton completedTodos={completedCount} onClick={clearCompleted} />
      </div>
    </div>
  );
};

export default App;
