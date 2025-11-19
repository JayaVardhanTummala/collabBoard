import React from "react";
import { motion } from "framer-motion";
import HeroShowcaseBoard from "./HeroShowcaseBoard";

export default function NewBoardShowcaseSection() {
    return (
        <section className="relative py-36 bg-[#f6f8ff] overflow-hidden">

            {/* Sparkles */}
            <div className="absolute top-20 left-24 w-3 h-3 bg-pink-300 rounded-full blur-sm opacity-70"></div>
            <div className="absolute bottom-24 right-32 w-4 h-4 bg-blue-300 rounded-full blur-sm opacity-75"></div>

            <div className="max-w-7xl mx-auto px-6 text-center relative z-20">

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-black text-gray-900 mb-4"
                >
                    See Your Workflow Come Alive
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    viewport={{ once: true }}
                    className="text-gray-600 text-lg max-w-2xl mx-auto mb-20"
                >
                    A minimal, beautiful board that keeps your team aligned, productive,
                    and focused — without the chaos.
                </motion.p>

                {/* Animated Board */}
                <motion.div
                    initial={{ opacity: 0, y: 70, rotate: -2 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="mx-auto w-[95%] md:w-[85%] lg:w-[80%]"
                >
                    <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                            repeat: Infinity,
                            duration: 5,
                            ease: "easeInOut",
                        }}
                    >
                        <HeroShowcaseBoard />
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}
