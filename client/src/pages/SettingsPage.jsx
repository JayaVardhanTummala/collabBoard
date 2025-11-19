import React from "react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import useAuthStore from "../store/useAuthStore";
import AnimatedPage from "../components/layout/AnimatedPage";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const { isDarkMode, toggleDarkMode, user, logout } = useAuthStore();

  return (
    <AnimatedPage>
      <div
        className="
      relative min-h-screen p-8 
      bg-gradient-to-b from-[#eef1ff] via-[#e7eaff] to-[#dce1ff]
      overflow-hidden"
      >
        <div className="absolute -top-10 left-10 w-48 h-48 bg-blue-200 opacity-20 blur-2xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-purple-200 opacity-20 blur-[90px] rounded-full"></div>

        <div className="max-w-3xl mx-auto relative z-20">
          <h2 className="text-4xl font-black mb-8 tracking-tight">
            Settings
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              bg-white p-6 rounded-xl border-[3px] border-gray-900 
              shadow-[8px_8px_0px_#1e293b] mb-8"
          >
            <h3 className="text-xl font-black mb-4 text-gray-900">
              Account Details
            </h3>

            <div className="space-y-3 text-base">
              <p>
                <span className="font-semibold">Name: </span>
                {user?.name}
              </p>
              <p>
                <span className="font-semibold">Email: </span>
                {user?.email}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              bg-white p-6 rounded-xl border-[3px] border-gray-900 
              shadow-[8px_8px_0px_#1e293b] mb-8"
          >
            <h3 className="text-xl font-black mb-4 text-gray-900">
              Appearance
            </h3>

            <div className="flex justify-between items-center 
              bg-[#f7f9ff] p-3 rounded-lg border-2 border-gray-900">
              <span className="font-semibold text-base">Dark Mode</span>

              <label className="relative inline-flex cursor-pointer select-none scale-90">
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                  className="sr-only peer"
                />
                <div
                  className="
                    w-12 h-6 bg-gray-300 
                    rounded-full border-2 border-gray-900
                    peer-checked:bg-[var(--color-primary)]
                    transition-colors duration-300
                  "
                ></div>

                <div
                  className="
                    absolute top-[3px] left-[3px] h-4 w-4 bg-white 
                    rounded-full border-2 border-gray-900
                    transition-transform duration-300
                    peer-checked:translate-x-6
                  "
                ></div>
              </label>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              bg-white p-6 rounded-xl border-[3px] border-gray-900 
              shadow-[8px_8px_0px_#1e293b]"
          >
            <h3 className="text-xl font-black mb-4 text-red-600">
              Danger Zone
            </h3>

            <Button
              variant="pink"
              onClick={() => {
                if (window.confirm("Are you sure you want to logout?")) {
                  logout();
                }
              }}
              className="w-full text-base"
            >
              Logout
            </Button>
          </motion.div>

        </div>
      </div>
    </AnimatedPage>
  );
}
