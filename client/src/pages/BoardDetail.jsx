import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Users } from "lucide-react";
import io from "socket.io-client";

import Button from "../components/ui/Button";
import KanbanColumn from "../components/board/KanbanColumn";
import TaskModal from "../components/board/TaskModal";
import Modal from "../components/ui/Modal";

import useBoardStore from "../store/useBoardStore";
import useAuthStore from "../store/useAuthStore";
import apiService from "../utils/apiService";
import AnimatedPage from "../components/layout/AnimatedPage";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export default function BoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { currentBoard, setCurrentBoard, updateTaskStatusOptimistic } =
    useBoardStore();
  const { user } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [newTaskStatus, setNewTaskStatus] = useState("To-Do");

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  const [confirmTaskDelete, setConfirmTaskDelete] = useState({
    open: false,
    task: null
  });

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
    const s = io(SOCKET_URL);
    s.emit("joinBoard", id);

    s.on("taskUpdated", fetchBoard);
    s.on("boardRefetch", fetchBoard);

    setSocket(s);
    return () => s.disconnect();
  }, [id, fetchBoard]);

  const handleTaskDrop = async (taskId, newStatus) => {
    const currentTask = currentBoard.tasks.find((t) => t._id === taskId);
    if (currentTask.status === newStatus) return;

    try {
      updateTaskStatusOptimistic(taskId, newStatus);
      await apiService.updateTask(taskId, { status: newStatus });
      socket?.emit("taskUpdate", id, { taskId, newStatus });
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

  const handleTaskClick = (t) => {
    setTaskToEdit(t);
    setIsTaskModalOpen(true);
  };

  const handleTaskDelete = async (task) => {
    try {
      await apiService.deleteTask(task._id);
      socket?.emit("boardUpdate", id, "task deleted");
      toast.success("Task deleted!");
      fetchBoard();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    try {
      await apiService.inviteCollaborator(id, inviteEmail);
      toast.success("Collaborator invited!");
      setInviteEmail("");
      setIsInviteModalOpen(false);
      fetchBoard();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading || !currentBoard) {
    return (
      <div className="p-10 text-center text-xl">Loading board details...</div>
    );
  }

  const grouped = currentBoard.tasks.reduce((acc, t) => {
    acc[t.status] = acc[t.status] || [];
    acc[t.status].push(t);
    return acc;
  }, {});

  const isOwner = currentBoard.owner._id === user?._id;

  return (
    <AnimatedPage>
      <div
        className="
        w-full max-w-7xl mx-auto 
        p-6 md:p-10 
        flex-grow
      "
      >
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-black text-[var(--color-primary)] mb-2">
            {currentBoard.title}
          </h1>

          <p className="text-sm opacity-70 mb-4">
            Owner: {currentBoard.owner.name} | Collaborators:
            {" "}
            {currentBoard.collaborators.map((c) => c.name).join(", ") || "None"}
          </p>

          <div className="flex justify-center gap-3">
            {isOwner && (
              <Button
                variant="secondary"
                className="text-sm flex items-center gap-2"
                onClick={() => setIsInviteModalOpen(true)}
              >
                <Users size={16} /> Invite
              </Button>
            )}

            <Button
              variant="secondary"
              className="text-sm"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </Button>
          </div>
        </header>

        <div className="flex justify-center gap-6 pb-10 overflow-x-auto">
          {["To-Do", "Doing", "Done"].map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              tasks={grouped[status] || []}
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

        <Modal
          isOpen={isInviteModalOpen}
          onClose={() => setIsInviteModalOpen(false)}
          title="Invite Collaborator"
        >
          <form onSubmit={handleInvite}>
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="Email address"
              required
              className="w-full p-3 border rounded-lg mb-4"
            />
            <Button type="submit" className="w-full">
              Send Invite
            </Button>
          </form>
        </Modal>
      </div>

      <div className="w-full flex justify-center">
        <div className="max-w-6xl w-full px-6 md:px-8"></div>
      </div>
    </AnimatedPage>
  );
}
