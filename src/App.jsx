import AnimateBg from "./components/AnimateBg";
import Notification from "./components/Notification";
import Navbar from "./components/Navbar";
import StatsGrid from "./components/StatsGrid";
import Input from "./components/Input";
import TodoList from "./components/TodoList";
import ClearButton from "./components/ClearButton";
import { useEffect, useState } from "react";
import { playSound } from "./components/PlaySound";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [notification, setNotification] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [hasLoaded, setHasLoaded] = useState(false);
  const totalTodos = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = totalTodos - completedCount;
  const progress = todos.length > 0 ? (completedCount / todos.length) * 100 : 0;

  // save to localStorage //
  const STORAGE_KEY = "todos";
  useEffect(() => {
    if (!hasLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.log("Error saving to localStorage", error);
    }
  }, [todos, hasLoaded]);

  // get from localStorage //
  useEffect(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        setTodos(JSON.parse(data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  // show notification //
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  // function add todo //
  const handleAddTodo = () => {
    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos([newTodo, ...todos]);
    setInput("");
    playSound("add");
    showNotification("✨ Task Added Successfully!");
  };
  // StartEditing function //
  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
    console.log("editing started", id, text);
  };
  // update todo logic //
  const saveEdit = (id) => {
    if (!editText.trim()) return;
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editText } : todo,
      ),
    );
    setEditText("");
    setEditingId(null);
    playSound("update");
    showNotification("Task Updated Successfully!");
  };
  // cancel edit function here //
  const cancelEdit = () => {
    setEditText("");
    setEditingId(null);
  };
  // handle edit text change here //

  const handleEditTextChange = (e) => {
    setEditText(e.target.value);
  };
  // handleedit key press here //

  const handleEditKeyPress = (e, id) => {
    if (e.key === "Enter") {
      saveEdit(id);
    } else if (e.key === "Escape") {
      setEditingId(null);
    }
  };

  // delete todo logic //
  const deleteTodo = (id) => {
    setTodos(todos.filter((todos) => todos.id !== id));
    playSound("delete");
    showNotification("🗑️ Task Deleted", "info");
  };

  // handle toggle here //
  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
    const todo = todos.find((t) => t.id === id);
    if (!todo.completed) {
      playSound("complete");
      showNotification("🎉 Great Job! Task Completed");
    }
  };

  // clear all completed task //
  const clearCompleted = () => {
    setTodos(todos.filter((t) => !t.completed));
    playSound("delete");
    showNotification("🗑️ Task Deleted", "info");
  };

  return (
    <div
      className="w-full h-screen overflow-auto
    bg-linear-to-br from-indigo-950 via-purple-950 to-pink-950  
    p-3 sm:p-6 relative  "
    >
      <AnimateBg />
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
          onChange={(e) => setInput(e.target.value)}
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
      <style>
        {`
          @keyframes slideIn {
            from {
              ocapity: 0;
              transform:translateY(20px)
            }
            to {
              opacity:1;
              transform:translateY(0)
            }
          }
          @keyframes float{
            0%,100% {transform:translateY(0px) translateX(0px);}
            50%{transform:translateY(-20px) translateX(10px);}
          }
          @keyframes shimmer {
            0%{ transform:translateX(-100%);}
            100% {transform :translateX(100%);}
          }
          .animate-shimmer{
            Animation : shimmer 2s infinite
          }`}
      </style>
    </div>
  );
};

export default App;
