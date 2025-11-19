import React from "react";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="relative py-32 bg-[#eef2ff] overflow-hidden">
      
      {/* Decorative dots */}
      <div className="absolute left-20 top-16 w-4 h-4 bg-pink-300 rounded-full blur-sm opacity-80"></div>
      <div className="absolute right-24 bottom-20 w-5 h-5 bg-blue-300 rounded-full blur-md opacity-80"></div>

      <div className="max-w-5xl mx-auto px-6 text-center">

        {/* Outer Card */}
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.95 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="
            bg-white 
            p-14 
            rounded-3xl 
            border-[4px] 
            border-gray-900 
            shadow-[12px_12px_0px_#facc15]
          "
        >
          {/* Heading */}
          <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            Stop Juggling Tools.
            <br />
            Start <span className="text-blue-600">CollabBoarding.</span>
          </h3>

          {/* Subtitle */}
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
            Your entire workflow — streamlined, simplified, supercharged.
            Boards, notes, documents, tasks: all in one beautiful place.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center gap-6"
          >
            {/* Main Button */}
            <button
              className="
                px-10 py-4 
                bg-pink-500 
                text-white 
                font-bold 
                rounded-xl 
                text-lg 
                border-[4px] 
                border-gray-900 
                shadow-[10px_10px_0px_#be185d]
                hover:translate-y-[-4px]
                transition-all
              "
            >
              Start Free Trial
            </button>

            {/* Secondary Button */}
            <button
              className="
                px-10 py-4 
                bg-white 
                text-gray-900 
                font-bold 
                rounded-xl 
                text-lg 
                border-[4px] 
                border-gray-900 
                shadow-[10px_10px_0px_#1e293b]
                hover:translate-y-[-4px]
                transition-all
              "
            >
              Explore Features
            </button>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
