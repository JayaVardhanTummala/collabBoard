// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./store/useAuthStore";
import AuthInitializer from "./components/layout/AuthInitializer";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BoardDetail from "./pages/BoardDetail";
import SettingsPage from "./pages/SettingsPage";
import LandingPage from "./pages/LandingPage/LandingPage";

export default function App() {
  // IMPORTANT: subscribe to the boolean directly (not destructuring an object)
  const isDarkMode = useAuthStore((s) => s.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      console.log("isDarkMode ->", isDarkMode);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <AuthInitializer>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/board/:id"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <BoardDetail />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <SettingsPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthInitializer>
  );
}
