import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import useAuthStore from "../../store/useAuthStore";

const TASK_COLORS = {
  yellow: "#FACC15",
  green: "#22C55E",
  blue: "#3B82F6",
  red: "#EF4444",
};

export default function TaskCard({ task, onUpdate, onDelete }) {
  const { isDarkMode } = useAuthStore();
  const borderColor = TASK_COLORS[task.color] || "#6B7280";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`
        relative
        rounded-xl p-4 border-2 cursor-grab
        overflow-visible
        shadow-[4px_4px_0px_#1e293b]
        bg-white text-gray-900
      `}
      style={{
        borderColor: borderColor,
        boxShadow: "4px 4px 0px #1e293b",
      }}
    >

      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-base truncate">{task.title}</h4>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onUpdate(task)}
            className="p-1 rounded-md hover:bg-gray-200"
          >
            <Edit size={16} />
          </button>

          <button
            onClick={() => onDelete(task)}
            className="p-1 rounded-md hover:bg-red-100"
          >
            <Trash2 size={16} className="text-red-500" />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-sm opacity-80 mb-3 leading-snug line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="text-xs flex justify-between items-center opacity-70">
        <span>{task.assignedTo?.name || "Unassigned"}</span>

        <div className="flex items-center gap-1">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: borderColor }}
          ></span>
          <span className="capitalize">{task.color}</span>
        </div>
      </div>
    </motion.div>
  );
}
