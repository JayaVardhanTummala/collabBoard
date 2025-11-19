import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // 👈 Import Link

export default function NavBar() {
  // Removed: const navigate = useNavigate(); since we're using Link for static navigation

  return (
    <header
      className="
        sticky top-0 z-50 
        backdrop-blur-[10px]
        bg-white/80
        border-b-[3px] 
        border-gray-900
        shadow-[0px_6px_0px_#00000015]
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO - Now uses Link component */}
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          // Using Link here for the logo instead of motion.div + onClick
        >
          <Link to="/" className="flex items-center cursor-pointer">
            <h1 className="text-3xl font-black">
              Collab
              <span className="text-blue-700">Board</span>
            </h1>
          </Link>
        </motion.div>

        {/* CENTER LINKS (optional later) - Updated to use Link */}
        <nav className="hidden md:flex gap-8 font-semibold text-gray-700">
          <Link
            to="/"
            className="text-sm font-medium hover:text-blue-600 transition"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="text-sm font-medium hover:text-blue-600 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-sm font-medium hover:text-blue-600 transition"
          >
            Register
          </Link>
        </nav>

        {/* RIGHT CTA BUTTON - Uses Link instead of motion.button + onClick */}
        <Link to="/register">
          <motion.button
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 12 }}
            className="
              hidden md:block 
              px-6 py-2
              bg-yellow-400
              text-gray-900
              font-bold
              rounded-xl
              border-[3px] border-gray-900
              shadow-[6px_6px_0px_#1e293b]
            "
          >
            Get Started
          </motion.button>
        </Link>

        {/* Mobile Menu Placeholder */}
        <div className="md:hidden font-bold text-lg">
          ☰
        </div>
      </div>
    </header>
  );
}