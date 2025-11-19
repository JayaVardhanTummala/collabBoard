import React, { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import BoardModal from "../components/board/BoardModal";
import useAuthStore from "../store/useAuthStore";
import useBoardStore from "../store/useBoardStore";
import apiService from "../utils/apiService";
import { useNavigate } from "react-router-dom";
import InviteBell from "../components/notifications/InviteBell";
import InviteModal from "../components/notifications/InviteModal";
import ConfirmModal from "../components/ui/ConfirmModal";

export default function Dashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    id: null,
    title: ""
  });

  const { boards, setBoards } = useBoardStore();
  const navigate = useNavigate();

  const fetchBoards = async () => {
    setLoading(true);
    try {
      const data = await apiService.getBoards();
      setBoards(data || []);
    } catch (error) {
      toast.error(error.message || "Failed to fetch boards.");
      setBoards([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleDelete = async (id, title) => {
    try {
      await apiService.deleteBoard(id);
      toast.success(`Board "${title}" deleted.`);
      fetchBoards();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="relative min-h-screen p-10 
      bg-gradient-to-b from-[#eef1ff] via-[#e7eaff] to-[#dce1ff] pointer-events-auto
      overflow-x-hidden flex justify-center"
    >
      {/* WIDER GLASS PANEL */}
      <div
        className="
        w-full max-w-[88rem]
        mx-auto relative z-20 
        rounded-3xl px-14 py-14
        bg-white/30 backdrop-blur-[2px]
        border border-white/40
        shadow-[0_0_60px_rgba(0,0,0,0.04)]
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-5xl font-black text-gray-900 tracking-tight">
            Your Boards
          </h1>

          <div className="flex items-center gap-4">
            <InviteBell onClick={() => setShowInviteModal(true)} />

            <Button
              onClick={() => setIsCreateModalOpen(true)}
              variant="none"
              className="bg-[var(--color-accent-yellow)] hover:bg-[#eab308]
      text-gray-900 font-bold border-4 border-[var(--color-shadow)]
      shadow-[6px_6px_0px_#1e293b] px-6 py-3 rounded-xl cursor-pointer"
            >
              <Plus size={20} />
            </Button>
          </div>
        </div>

        <InviteModal
          isOpen={showInviteModal}
          onClose={() => setShowInviteModal(false)}
        />

        {/* Subtext */}
        <p className="text-gray-600 mb-8">
          Manage, organize and track your team’s workflow. Click any board to open it.
        </p>

        {/* CONTENT */}
        {loading ? (
          <div className="text-center text-gray-500 mt-20 text-lg">
            Loading boards…
          </div>
        ) : boards.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-10 border-4 border-gray-900 rounded-2xl shadow-[10px_10px_0px_#1e293b] text-center max-w-lg mx-auto"
          >
            <h3 className="text-xl font-bold mb-3">
              No boards yet 👀
            </h3>
            <p className="text-gray-600 mb-5">
              Create your first workspace and start collaborating.
            </p>

            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="!bg-[var(--color-primary)] hover:!bg-[var(--color-primary-dark)]
              border-4 border-gray-900 shadow-[6px_6px_0px_#1e293b] px-5 py-2 cursor-pointer"
            >
              Create Board
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 pt-6">
            <AnimatePresence>
              {boards.map((board) => (
                <motion.div
                  key={board._id}
                  initial={{ opacity: 0, y: 20, rotate: -1 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  whileHover={{
                    y: -6,
                    rotate: -1.2,
                    transition: { type: "spring", stiffness: 200, damping: 12 },
                  }}
                  className="cursor-pointer"
                >
                  <div
                    onClick={() => navigate(`/board/${board._id}`)}
                    className="
                      bg-white p-8 rounded-2xl border-4 border-gray-900 
                      shadow-[10px_10px_0px_#1e293b] transition-all 
                      hover:shadow-[14px_14px_0px_#0f172a] 
                      relative"
                  >
                    <h3 className="text-2xl font-black mb-2 text-gray-900 truncate">
                      {board.title}
                    </h3>

                    <p className="text-sm text-gray-500 mb-4">
                      Owner: {board.owner?.name || "Unknown"}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmDelete({
                          open: true,
                          id: board._id,
                          title: board.title
                        });
                      }}
                      className="absolute bottom-4 right-4 bg-red-500 text-white p-2 
                        rounded-lg border-2 border-gray-900 shadow-[4px_4px_0px_#1e293b]
                        hover:bg-red-600 cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* MODAL */}
        <BoardModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fetchBoards={fetchBoards}
        />
        <ConfirmModal
          isOpen={confirmDelete.open}
          title="Delete Board?"
          message={`Are you sure you want to delete "${confirmDelete.title}" permanently?`}
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onClose={() =>
            setConfirmDelete({ open: false, id: null, title: "" })
          }
          onConfirm={() => {
            handleDelete(confirmDelete.id, confirmDelete.title);
            setConfirmDelete({ open: false, id: null, title: "" });
          }}
        />
      </div>
    </div>
  );
}
