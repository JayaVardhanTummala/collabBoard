import React from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "./TaskCard";
import useAuthStore from "../../store/useAuthStore";

const BG_LIGHT = "bg-white";
const BG_DARK = "bg-gray-800";

export default function KanbanColumn({
  status,
  tasks,
  onTaskDrop,
  onNewTaskClick,
  onTaskClick,
  onTaskDelete,
}) {
  const { isDarkMode } = useAuthStore();

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    if (taskId) onTaskDrop(taskId, status);
  };

  const canAddTask = status !== "Done";
  const statusLabel = status.replace("-", " ");

  return (
    <motion.div
      layout
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`
        w-[320px] min-w-[320px]
        rounded-2xl p-5 flex flex-col
        border-4 border-gray-900 
        shadow-[8px_8px_0px_#1e293b]
        ${BG_LIGHT}
      `}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-black text-xl tracking-tight">
          {statusLabel}
        </h3>

        <span
          className="
            text-xs font-extrabold px-2 py-1 rounded-full
            bg-[var(--color-accent-blue)] text-gray-900
            border-2 border-gray-900
            shadow-[3px_3px_0px_#1e293b]
          "
        >
          {tasks.length}
        </span>
      </div>

      {canAddTask && (
        <button
          onClick={() => onNewTaskClick(status)}
          className="
            mb-4 w-full flex items-center justify-center gap-2
            px-3 py-2 border-2 border-gray-900 rounded-lg font-semibold
            bg-[var(--color-accent-yellow)]
            shadow-[4px_4px_0px_#1e293b]
            transition-all
            hover:-translate-y-[2px]
            active:shadow-none
          "
        >
          <Plus size={16} />
          Add Task
        </button>
      )}

      <div className="flex flex-col gap-3 overflow-y-auto pb-4">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              key={task._id}
              draggable
              layout
              onDragStart={(e) => e.dataTransfer.setData("taskId", task._id)}
              whileHover={{ scale: 1.02 }}
            >
              <TaskCard
                task={task}
                onUpdate={onTaskClick}
                onDelete={onTaskDelete}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
