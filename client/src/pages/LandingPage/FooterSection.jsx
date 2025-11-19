import React from "react";
import { motion } from "framer-motion";

export default function FooterSection() {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-20 pb-10 border-t-[4px] border-gray-700">
      
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* LOGO */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-black mb-6"
        >
          Collab<span className="text-blue-500">Board</span>
        </motion.h2>

        {/* TAGLINE */}
        <p className="text-gray-400 max-w-xl mx-auto mb-10">
          The all-in-one tool for fast-moving teams who want power, clarity,
          and a workspace that feels damn good to use.
        </p>

        {/* LINKS */}
        <div className="flex justify-center gap-10 text-gray-300 font-semibold mb-12">
          <button className="hover:text-white transition">Home</button>
          <button className="hover:text-white transition">Features</button>
          <button className="hover:text-white transition">Login</button>
          <button className="hover:text-white transition">Register</button>
        </div>

        {/* COPYRIGHT */}
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} CollabBoard. Built with ❤️, caffeine, and chaos by J.
        </p>

      </div>
    </footer>
  );
}
