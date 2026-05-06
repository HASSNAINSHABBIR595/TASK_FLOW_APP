import { FaCheckCircle } from "react-icons/fa";
import { IoAlertCircle } from "react-icons/io5";
import { ImCross } from "react-icons/im";

// Hum props destructure kar rahe hain: { notification, onClose }
const Notification = ({ notification, onClose }) => {
  // Agar notification null ya undefined ho, toh kuch render mat karo
  if (!notification) return null;

  return (
    <div>
      <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-5">
        <div
          className={`flex items-center gap-3 px-3 py-3 rounded-2xl shadow-2xl backdrop-blur-2xl border
            ${
              notification.type === "success"
                ? "bg-emerald-500/90 border-emerald-400/50 text-white"
                : notification.type === "error"
                  ? "bg-rose-500/50 border-rose-400/50 text-white"
                  : "bg-blue-500/90 border-blue-400/50 text-white"
            }`}
        >
          {notification.type === "success" && <FaCheckCircle size={18} />}
          {notification.type === "error" && <IoAlertCircle size={18} />}

          <span className="font-semibold text-sm ">{notification.message}</span>

          <button
            onClick={onClose} // Corrected: matching the variable name
            className="hover:opacity-100 opacity-80 transition-opacity"
          >
            <ImCross size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
