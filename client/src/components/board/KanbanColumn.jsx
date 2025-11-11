import React from 'react';
import Button from '../ui/Button';
import TaskCard from './TaskCard';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../../store/useAuthStore';

const KanbanColumn = ({ status, tasks, onTaskDrop, onNewTaskClick, onTaskClick, onTaskDelete }) => {
  const statusTitle = status.replace('-', ' ');
  const { isDarkMode } = useAuthStore();
  const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-gray-100';

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) onTaskDrop(taskId, status);
  };

  return (
    <div
      className={`flex flex-col w-full md:w-80 min-h-[300px] p-4 rounded-xl shadow-lg ${bgColor}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h3 className="text-xl font-bold mb-4 capitalize flex justify-between items-center">
        {statusTitle}
        <span className="text-sm px-2 py-0.5 rounded-full bg-indigo-500 text-white">{tasks.length}</span>
      </h3>

      <Button onClick={() => onNewTaskClick(status)} variant="secondary" className="w-full mb-4 text-sm">
        <Plus size={16} /> Add Task
      </Button>

      <motion.div layout className="flex flex-col space-y-3 overflow-y-auto">
        <AnimatePresence>
          {tasks.map((task) => (
            <div key={task._id} draggable onDragStart={(e) => e.dataTransfer.setData('taskId', task._id)}>
              <TaskCard task={task} onUpdate={onTaskClick} onDelete={onTaskDelete} />
            </div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default KanbanColumn;
