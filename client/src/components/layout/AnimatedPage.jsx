import React from 'react';
import { motion } from 'framer-motion';

/**
 * Wrap any page or section with <AnimatedPage> to get smooth fade + slide transitions.
 * Example:
 *   <AnimatedPage>
 *     <Dashboard />
 *   </AnimatedPage>
 */
const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="flex-grow"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
