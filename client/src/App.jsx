// /src/App.jsx
import { Routes, Route, Navigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const { user } = useContext(AuthContext); // access auth state

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route 
        path="/feed"
        element={
          <ProtectedRoute isAuthenticated={!!user}> 
            <Feed />
          </ProtectedRoute>
        }
      />

      {/* Redirect root to /feed */}
      <Route path="/" element={<Navigate to="/feed" />} />
    </Routes>
  );
}
