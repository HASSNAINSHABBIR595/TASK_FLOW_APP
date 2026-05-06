import { IoSparklesSharp } from "react-icons/io5";

import TodoItem from "./TodoItem";
const TodoList = ({
  todos,
  editingId,
  editText,
  onToggle,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  onEditTextChange,
  onEditKeyPress,
}) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-15 backdrop-blur-2xl bg-white/5  rounded-2xl border border-white/0 ">
        <div
          className="w-16 h-16 
        
        rounded-2xl  flex justify-center items-center mx-auto mb-3
        bg-linear-to-br from-violet-500/20 to-fuchsia-500/20 border-emerald-400 shadow-lg shadow-emerald-400/50
        "
        >
          <IoSparklesSharp size={32} className="text-violet-300 " />
        </div>
        <p className="text-white/90 text-base font-semibold mb-1">
          No Task Yet
        </p>
        <p className="text-white/50 text-sm">
          Create Your first task to Get Started
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-2">
      {todos.map(
        (
          todo,
          index, // Use () for implicit return or add 'return'
        ) => (
          <TodoItem
            key={todo.id || index} // Use unique ID
            todo={todo}
            index={index}
            editText={editText}
            editingId={editingId}
            onToggle={onToggle}
            onStartEdit={onStartEdit}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
            onDelete={onDelete}
            onEditTextChange={onEditTextChange}
            onEditKeyPress={onEditKeyPress}
          />
        ),
      )}
    </div>
  );
};
export default TodoList;
