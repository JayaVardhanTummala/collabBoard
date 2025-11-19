import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import FormInput from "../components/ui/FormInput";
import apiService from "../utils/apiService";
import useAuthStore from "../store/useAuthStore";
import { motion } from "framer-motion";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiService.register({ name, email, password });
      if (response) {
        login(response, response.token);
        toast.success(`Welcome aboard, ${response.name}!`);
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden
      bg-gradient-to-b from-[#eef1ff] via-[#e0e5ff] to-[#d7dcff]"
    >
      {/* Background Dots (Enhanced) */}
      <div className="absolute top-120 left-24 w-5 h-5 bg-pink-300 rounded-full blur-md opacity-70"></div>
      <div className="absolute top-40 right-32 w-4 h-4 bg-blue-300 rounded-full blur-md opacity-60"></div>
      <div className="absolute top-100 left-1/3 w-3 h-3 bg-yellow-300 rounded-full blur-sm opacity-70"></div>
      <div className="absolute bottom-32 right-1/4 w-5 h-5 bg-blue-200 rounded-full blur-md opacity-70"></div>
      <div className="absolute bottom-120 right-40 w-4 h-4 bg-pink-200 rounded-full blur-md opacity-60"></div>
      <div className="absolute top-1/4 right-1/2 w-2 h-2 bg-violet-300 rounded-full blur-sm opacity-70"></div>

      {/* Soft Glow Blobs */}
      <div className="absolute -top-50 -left-10 w-72 h-72 bg-blue-200 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200 opacity-20 blur-[100px] rounded-full"></div>

      {/* Decorative Sparkles */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-pink-400 rounded-full blur-[2px] opacity-70"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-blue-400 rounded-full blur-[1px] opacity-70"></div>
      <div className="absolute top-10 right-1/2 w-2 h-2 bg-yellow-400 rounded-full opacity-70"></div>

      {/* Animated container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80 }}
        className="relative z-20 w-full max-w-md"
      >
        <Card className="p-10 shadow-[12px_12px_0px_#1e293b] border-4 border-gray-900">

          <h2 className="text-4xl font-black text-center mb-2">
            Create Account
          </h2>
          <p className="text-center text-gray-600 mb-8 text-sm">
            Start your journey with CollabBoard 🚀
          </p>

          <form onSubmit={handleSubmit}>
            <FormInput
              id="name"
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />

            <FormInput
              id="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />

            <FormInput
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-5 py-3 cursor-pointer !bg-[var(--color-primary)] hover:!bg-[var(--color-primary-dark)] 
              shadow-[6px_6px_0px_#1e293b] border-4 border-gray-900"
            >
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-bold text-[var(--color-primary)] hover:underline cursor-pointer"
            >
              Sign in now
            </button>
          </p>

        </Card>
      </motion.div>
    </div>
  );
}
