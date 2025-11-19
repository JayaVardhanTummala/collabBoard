import React from "react";
import { motion } from "framer-motion";
import MockupBoard from "./MockupBoard";

export default function HeroSection() {
  return (
    <section className="relative z-20 bg-[#f6f8ff] pt-24 pb-44">

      {/* Decorative Sparkles */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-pink-400 rounded-full blur-[2px] opacity-70"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-blue-400 rounded-full blur-[1px] opacity-70"></div>
      <div className="absolute top-10 right-1/2 w-2 h-2 bg-yellow-400 rounded-full opacity-70"></div>

      {/* CENTER TEXT BLOCK */}
      <div className="max-w-7xl mx-auto px-6 text-center relative z-30">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-block px-4 py-1 text-sm font-semibold rounded-full 
          border-2 border-gray-900 bg-white shadow-[4px_4px_0px_#000]"
        >
          Built for teams that want to move fast ⚡
        </motion.div>

        {/* HERO HEADLINE */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-8xl font-black leading-[1.05] mt-6"
        >
          Collaborate.
          <br />
          <span className="text-blue-700">Create.</span>
          <br />
          Conquer.
        </motion.h1>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 text-xl max-w-2xl mx-auto mt-6"
        >
          Real-time boards, docs, and task workflows — your entire team organized
          in one blazing fast space.
        </motion.p>

        {/* Extra spacing since CTA buttons are removed */}
        <div className="h-20"></div>
      </div>

      {/* BOTTOM BOARD MOCKUP */}
      {/* BOTTOM BOARD MOCKUP WITH ANIMATION */}
      <motion.div
        initial={{ opacity: 0, y: 80, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{
          duration: 1,
          ease: "easeOut",
          delay: 0.4,
        }}
        className="
    absolute left-1/2 -translate-x-1/2 
    bottom-[-60px] md:bottom-[-80px] lg:bottom-[-100px]
    w-[90%] md:w-[70%] z-10
  "
      >
        {/* Subtle floating bob animation */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          }}
        >
          <MockupBoard />
        </motion.div>
      </motion.div>
    </section>
  );
}
