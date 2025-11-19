import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MockupBoard from "./MockupBoard";

export default function BoardShowcaseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="relative py-40 bg-[#f2f4ff] overflow-hidden">
      
      {/* Decorative shapes */}
      <div className="absolute top-16 left-20 w-5 h-5 bg-pink-300 rounded-full blur-md opacity-70"></div>
      <div className="absolute bottom-20 right-32 w-4 h-4 bg-yellow-300 rounded-full blur-sm opacity-80"></div>
      <div className="absolute top-10 right-60 w-3 h-3 bg-blue-300 rounded-full opacity-70"></div>

      <div className="max-w-6xl mx-auto px-6 text-center">
        
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
          See Your Workflow Come Alive
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-20">
          A minimal, beautiful board that keeps your team aligned, productive, 
          and focused — without the chaos.
        </p>

        {/* Scroll-reveal Board */}
        <motion.div
          ref={ref}
          initial={{ scale: 0.7, rotate: 0, opacity: 0, y: 80 }}
          animate={
            isInView
              ? { scale: 1, rotate: 1.5, opacity: 1, y: 0 }
              : {}
          }
          transition={{
            type: "spring",
            stiffness: 70,
            damping: 12,
            duration: 0.9,
          }}
          className="mx-auto"
          style={{ width: "90%", maxWidth: "1100px" }}
        >
          <MockupBoard />
        </motion.div>
      </div>

    </section>
  );
}
