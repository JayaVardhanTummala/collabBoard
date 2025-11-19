import React, { useState } from "react";
import { Home, Settings, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from "../../store/useAuthStore";
import useBoardStore from "../../store/useBoardStore";
import { useNavigate, useLocation } from "react-router-dom";
import UserAvatar from "./UserAvatar";

export default function Sidebar({ isOpen, setIsOpen }) {
  const { user, logout } = useAuthStore();
  const { boards } = useBoardStore();

  const navigate = useNavigate();
  const location = useLocation();

  const [showLogout, setShowLogout] = useState(false);
  const BOARD_COLORS = [
    "bg-yellow-400",
    "bg-blue-500",
    "bg-indigo-600",
    "bg-sky-400",
  ];

  const navItem = (path, label, Icon) => {
    const active = location.pathname === path;

    return (
      <div
        onClick={() => navigate(path)}
        className={`
          flex items-center gap-4 px-5 py-4 rounded-xl cursor-pointer
          text-base font-semibold transition-all 
          ${active ? "bg-blue-100 text-blue-700 shadow-inner" : "hover:bg-gray-100"}
        `}
      >
        <Icon size={20} />
        {label}
      </div>
    );
  };

  return (
    <>
      <div
        className="fixed left-0 top-0 w-[6px] h-full z-40 cursor-pointer"
        onMouseEnter={() => setIsOpen(true)}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-110%" }}
            animate={{ x: 0 }}
            exit={{ x: "-110%" }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
            className="
              fixed left-0 top-0 h-full w-64 z-50 
              bg-white/90 backdrop-blur-xl
              shadow-[8px_8px_0px_#0B0F19]
              rounded-r-3xl p-6 flex flex-col
            "
            onMouseLeave={() => setIsOpen(false)}
          >
            <div className="text-2xl font-black mb-8">
              <span className="text-black">Collab</span>
              <span className="text-blue-600">Board</span>
            </div>

            <div className="space-y-2">
              {navItem("/dashboard", "Dashboard", Home)}
              {navItem("/settings", "Settings", Settings)}
            </div>

            <div className="mt-8">
              <p className="text-xs font-bold uppercase mb-2 text-gray-500">
                My Boards
              </p>

              <div className="space-y-1">
                {boards.map((b, idx) => (
                  <div
                    key={b._id}
                    onClick={() => navigate(`/board/${b._id}`)}
                    className="
                      flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer
                      hover:bg-gray-100 text-sm font-medium
                    "
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${BOARD_COLORS[idx % BOARD_COLORS.length]}`}
                    />
                    <p className="truncate">{b.title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-4 border-t">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => setShowLogout(!showLogout)}
              >
                <UserAvatar name={user.name} />
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">{user.name}</span>
                  <span className="text-xs text-gray-500">{user.email}</span>
                </div>
                <ChevronDown size={16} />
              </div>

              {showLogout && (
                <div
                  onClick={logout}
                  className="
                    mt-3 px-4 py-2 rounded-lg text-center font-bold 
                    bg-red-500 text-white cursor-pointer
                    shadow-[4px_4px_0px_#0B0F19]
                  "
                >
                  Logout
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
