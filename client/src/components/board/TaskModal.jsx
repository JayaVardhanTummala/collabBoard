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

const TaskModal = ({ isOpen, onClose, boardId, taskToEdit, fetchBoard }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(Object.keys(TASK_COLORS)[0]);
  const [status, setStatus] = useState('To-Do');
  const [loading, setLoading] = useState(false);
  const isEdit = !!taskToEdit;

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setColor(taskToEdit.color);
      setStatus(taskToEdit.status);
    } else {
      setTitle('');
      setDescription('');
      setColor(Object.keys(TASK_COLORS)[0]);
      setStatus('To-Do');
    }
  }, [taskToEdit, isOpen]);

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
        <FormInput label="Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title..." />
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="w-full p-3 border rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Detailed notes..."
          />
        </div>

        {isEdit && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
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
                className={`w-8 h-8 rounded-full transition-all duration-150 shadow-md ${val.bg} ${
                  color === key ? 'ring-4 ring-offset-2 ring-indigo-500 dark:ring-offset-gray-800' : ''
                }`}
              />
            ))}
          </div>
        </div>

        <Button type="submit" disabled={loading || title.trim() === ''} className="w-full mt-4">
          {loading ? 'Saving...' : isEdit ? <><Check size={20} /> Save Changes</> : <><Plus size={20} /> Create Task</>}
        </Button>
      </form>
    </Modal>
  );
};

export default TaskModal;
