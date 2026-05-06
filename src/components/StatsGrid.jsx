import { FiZap } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { ImRadioUnchecked } from "react-icons/im";

const StatsGrid = ({ total, active, completed }) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-3 mb-4 stats-grid">
        {/* three tabs here */}
        {/* 1 */}
        <div
          className="bg-linear-to-br from-violet-500/20  to-purple-500/20 rounded-2xl border border-violet-400/30 p-4 hover:scale-105 transition-transform duration-300
        cursor-pointer backdrop:blur-2xl"
        >
          <div className="flex items-center gap-2 mb-1 ">
            <FiZap size={16} className="text-violet-400" />
            <span className="text-violet-300 text-xs font-semibold ">
              Total
            </span>
          </div>
          <div className="text-2xl font-black text-white">{total}</div>
        </div>
        {/* 2 */}
        <div
          className=" backdrop:blur-2xl bg-linear-to-br  from-blue-500/20  to-cyan-500/20 rounded-2xl border border-blue-400/30 p-4 hover:scale-105 transition-transform duration-300
        cursor-pointer"
        >
          <div className="flex items-center gap-2 mb-1 ">
            <ImRadioUnchecked size={16} className="text-blue-400" />

            <span className="text-violet-300 text-xs font-semibold ">
              Active
            </span>
          </div>
          <div className="text-2xl font-black text-white">{active}</div>
        </div>
        {/* 3 */}
        <div
          className="bg-linear-to-br from-emerald-500/20  to-teal-500/20 rounded-2xl border border-emerald-400/30 p-4 hover:scale-105 transition-transform duration-300
        cursor-pointer"
        >
          <div className="flex items-center gap-2 mb-1 ">
            <FaCheckCircle size={16} className="text-emerald-400" />
            <span className="text-emerald-300 text-xs font-semibold ">
              Complete
            </span>
          </div>
          <div className="text-2xl font-black text-white">{completed}</div>
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;
