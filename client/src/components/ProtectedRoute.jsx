import { Navigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
