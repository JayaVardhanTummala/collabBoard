import React from "react";
import { Moon, Sun } from "lucide-react";
import useAuthStore from "../../store/useAuthStore";

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useAuthStore();

  return (
    <button
      onClick={toggleDarkMode}
      className="
        p-3 rounded-full border-2 border-[var(--cb-border)]
        bg-[var(--cb-card)] text-[var(--cb-text)]
        shadow-[4px_4px_0px_var(--cb-border)]
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-[6px_6px_0px_var(--cb-border)]
      "
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
