import { FaPlus } from "react-icons/fa6";

// Fix 1: Added curly braces {} for destructuring props
const Input = ({ value, onChange, onAdd }) => {
  // Fix 2: Added logic to handle "Enter" key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onAdd();
    }
  };

  return (
    <div className="bg-white/5 rounded-2xl border border-white/10 p-3 mb-4 shadow-2xl hover:bg-white/10 transition-all duration-300">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={onChange} // Fix 3: Corrected casing to match props
          onKeyDown={handleKeyDown} // Fix 4: Linked the function
          placeholder="What's in your mind?"
          className="flex-1 px-4 py-3 bg-white/10 text-white placeholder-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 font-medium text-sm border border-white/5 backdrop-blur-xl transition-all"
        />
        <button
          onClick={onAdd}
          className="px-6 py-3 rounded-xl text-white bg-linear-to-br from-violet-500 via-purple-500 to-fuchsia-500 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-2 font-bold hover:scale-105 text-sm active:scale-105"
        >
          <FaPlus size={18} />
          ADD
        </button>
      </div>
    </div>
  );
};

export default Input;
