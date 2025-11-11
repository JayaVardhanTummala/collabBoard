import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Users } from 'lucide-react';
import io from 'socket.io-client';
import Button from '../components/ui/Button';
import KanbanColumn from '../components/board/KanbanColumn';
import TaskModal from '../components/board/TaskModal';
import Modal from '../components/ui/Modal';
import useBoardStore from '../store/useBoardStore';
import useAuthStore from '../store/useAuthStore';
import apiService from '../utils/apiService';
import AnimatedPage from '../components/layout/AnimatedPage';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const BoardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentBoard, setCurrentBoard, updateTaskStatusOptimistic } = useBoardStore();
  const { user } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [newTaskStatus, setNewTaskStatus] = useState('To-Do');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const fetchBoard = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiService.getBoardDetail(id);
      setCurrentBoard(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [id, setCurrentBoard]);

  useEffect(() => {
    if (id) fetchBoard();
  }, [id, fetchBoard]);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    newSocket.emit('joinBoard', id);

    newSocket.on('taskUpdated', fetchBoard);
    newSocket.on('boardRefetch', fetchBoard);

    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, [id, fetchBoard]);

  const handleTaskDrop = async (taskId, newStatus) => {
    const currentTask = currentBoard.tasks.find((t) => t._id === taskId);
    if (currentTask.status === newStatus) return;

    try {
      updateTaskStatusOptimistic(taskId, newStatus);
      await apiService.updateTask(taskId, { status: newStatus });
      socket?.emit('taskUpdate', id, { taskId, newStatus });
      toast.success(`Task moved to ${newStatus}`);
    } catch (err) {
      toast.error(err.message);
      fetchBoard();
    }
  };

  const handleNewTaskClick = (status) => {
    setNewTaskStatus(status);
    setTaskToEdit(null);
    setIsTaskModalOpen(true);
  };

  const handleTaskClick = (task) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };

  const handleTaskDelete = async (task) => {
    if (!window.confirm(`Delete task "${task.title}"?`)) return;
    try {
      await apiService.deleteTask(task._id);
      socket?.emit('boardUpdate', id, 'task deleted');
      toast.success(`Task "${task.title}" deleted.`);
      fetchBoard();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    try {
      await apiService.inviteCollaborator(id, inviteEmail);
      toast.success('Collaborator invited!');
      setInviteEmail('');
      setIsInviteModalOpen(false);
      fetchBoard();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading || !currentBoard) {
    return <div className="p-10 text-center text-xl dark:text-white">Loading board details...</div>;
  }

  const boardTasks = currentBoard.tasks.reduce((acc, t) => {
    acc[t.status] = acc[t.status] || [];
    acc[t.status].push(t);
    return acc;
  }, {});

  const isOwner = currentBoard.owner._id === user?._id;

  return (
    <AnimatedPage>
      <div className="p-6 md:p-10 flex-grow overflow-x-auto">
        <header className="mb-8 border-b pb-4 border-gray-200 dark:border-gray-700">
          <h1 className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">
            {currentBoard.title}
          </h1>
          <p className="text-sm opacity-70 mb-4">
            Owner: {currentBoard.owner.name} | Collaborators: {currentBoard.collaborators.map((c) => c.name).join(', ') || 'None'}
          </p>
          <div className="flex space-x-3">
            {isOwner && (
              <Button onClick={() => setIsInviteModalOpen(true)} variant="secondary" className="text-sm">
                <Users size={16} /> Invite
              </Button>
            )}
            <Button onClick={() => navigate('/dashboard')} variant="secondary" className="text-sm">
              Back to Dashboard
            </Button>
          </div>
        </header>

        <div className="flex space-x-6 pb-4 min-w-full items-start">
          {['To-Do', 'Doing', 'Done'].map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              tasks={boardTasks[status] || []}
              onTaskDrop={handleTaskDrop}
              onNewTaskClick={handleNewTaskClick}
              onTaskClick={handleTaskClick}
              onTaskDelete={handleTaskDelete}
            />
          ))}
        </div>

        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          boardId={id}
          taskToEdit={taskToEdit}
          fetchBoard={fetchBoard}
        />

        <Modal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} title="Invite Collaborator">
          <form onSubmit={handleInvite}>
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="Enter collaborator email"
              required
              className="w-full p-3 mb-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            />
            <Button type="submit" className="w-full">Send Invite</Button>
          </form>
        </Modal>
      </div>
    </AnimatedPage>
  );
};

export default BoardDetail;
