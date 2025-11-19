import React from "react";
import { motion } from "framer-motion";
import { Users, FolderKanban, FileText, Zap } from "lucide-react";

const features = [
  {
    icon: FolderKanban,
    title: "Dynamic Task Boards",
    desc: "Manage projects with customizable Kanban boards, deadlines, and smooth drag-and-drop.",
    color: "bg-pink-100 text-pink-700",
  },
  {
    icon: Users,
    title: "Invite & Assign",
    desc: "Invite teammates, assign tasks instantly, and stay synced across the entire team.",
    color: "bg-blue-100 text-blue-700",
  },
  {
    icon: FileText,
    title: "Rich Docs",
    desc: "Attach specs and notes directly — no context switching, no clutter.",
    color: "bg-yellow-100 text-yellow-700",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative pt-64 pb-20 bg-[#f5f7ff]">
      
      {/* Sparkles */}
      <div className="absolute top-12 right-20 w-4 h-4 bg-blue-300 rounded-full blur-sm opacity-70"></div>
      <div className="absolute bottom-10 left-16 w-3 h-3 bg-pink-300 rounded-full blur-sm opacity-80"></div>

      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
          Built for Modern Teams
        </h2>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-20">
          Real-time sync, neat docs, and simple boards — everything your team needs without the noise.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03, translateY: -4 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="bg-white p-8 rounded-2xl border-4 border-gray-900 shadow-[10px_10px_0px_#1e293b]"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: -10, scale: 1.1 }}
                  className={`inline-flex mb-5 p-4 rounded-full border-4 border-gray-900 shadow-[4px_4px_0px_#1e293b] ${item.color}`}
                >
                  <Icon className="w-8 h-8" />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-black mb-2">{item.title}</h3>

                {/* Desc */}
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
