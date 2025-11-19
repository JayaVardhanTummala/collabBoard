// src/components/layout/MainLayout.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import useAuthStore from "../../store/useAuthStore";

export default function MainLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const { isAuthenticated, isDarkMode } = useAuthStore();

  // Auto-hide sidebar after login
  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => setIsOpen(false), 1200);
    }
  }, [isAuthenticated]);

  return (
    <div
      className={`
        flex relative min-h-screen w-full
        transition-colors duration-300
        ${isDarkMode
          ? "bg-[#0f1117] text-gray-100"
          : "bg-gradient-to-b from-[#eef1ff] via-[#e7eaff] to-[#dce1ff] text-gray-900"}
      `}
    >
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="flex-1 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
