import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../../store/useAuthStore';

const Modal = ({ isOpen, onClose, title, children }) => {
  const { isDarkMode } = useAuthStore();
  if (!isOpen) return null;

  const modalBg = "bg-black/40";  // universal backdrop
  const contentBg = "bg-[var(--cb-card)] text-[var(--cb-text)] border border-[var(--cb-border)]";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-50 flex items-center justify-center ${modalBg}`}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            className={`
              max-w-md w-full p-6 rounded-xl shadow-2xl 
              ${contentBg}
              transition-colors duration-300
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
              <h3 className="text-xl font-bold">{title}</h3>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-600">
                <X size={20} />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
