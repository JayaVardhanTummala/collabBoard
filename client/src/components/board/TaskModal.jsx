import React, { useState, useEffect } from 'react';
import { Check, Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Button from '../ui/Button';
import FormInput from '../ui/FormInput';
import Modal from '../ui/Modal';
import apiService from '../../utils/apiService';

const TASK_COLORS = {
  blue: { bg: 'bg-blue-500' },
  green: { bg: 'bg-green-500' },
  yellow: { bg: 'bg-yellow-500' },
  red: { bg: 'bg-red-500' },
};
const TASK_STATUSES = ['To-Do', 'Doing', 'Done'];

const TaskModal = ({ isOpen, onClose, boardId, taskToEdit, fetchBoard, initialStatus }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(Object.keys(TASK_COLORS)[0]);
  const [status, setStatus] = useState(initialStatus || 'To-Do');
  const [loading, setLoading] = useState(false);
  const isEdit = !!taskToEdit;

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || '');
      setDescription(taskToEdit.description || '');
      setColor(taskToEdit.color || Object.keys(TASK_COLORS)[0]);
      setStatus(taskToEdit.status || 'To-Do');
    } else {
      setTitle('');
      setDescription('');
      setColor(Object.keys(TASK_COLORS)[0]);
      setStatus(initialStatus || 'To-Do');
    }
  }, [taskToEdit, isOpen, initialStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const taskData = { boardId, title, description, color, status };

    try {
      if (isEdit) {
        await apiService.updateTask(taskToEdit._id, taskData);
        toast.success('Task updated!');
      } else {
        await apiService.createTask(taskData);
        toast.success('Task created!');
      }
      await fetchBoard();
      onClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit Task' : 'Create Task'}>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title..."
          id="taskTitle"
        />

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="
              w-full p-3 rounded-xl border-2 border-gray-900 
              bg-white text-gray-800 
              shadow-[4px_4px_0px_#1e293b]
              focus:ring-2 focus:ring-blue-400 focus:border-blue-400
            "
            placeholder="Detailed notes..."
          />
        </div>

        {isEdit && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              {TASK_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Color Tag</label>
          <div className="flex space-x-3">
            {Object.entries(TASK_COLORS).map(([key, val]) => (
              <button
                type="button"
                key={key}
                onClick={() => setColor(key)}
                className={`w-8 h-8 rounded-full transition-all duration-150 shadow-sm ${val.bg} ${color === key ? 'ring-4 ring-offset-2 ring-indigo-500' : ''}`}
              />
            ))}
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading || title.trim() === ""}
          className="w-full mt-4"
        >
          {loading ? (
            "Saving..."
          ) : isEdit ? (
            <span className="flex items-center gap-2 justify-center">
              <Check size={18} /> Save Changes
            </span>
          ) : (
            <span className="flex items-center gap-2 justify-center">
              <Plus size={18} /> Create Task
            </span>
          )}
        </Button>

      </form>
    </Modal>
  );
};

export default TaskModal;
