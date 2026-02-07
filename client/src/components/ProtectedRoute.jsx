import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="app-bg app-text h-screen flex items-center justify-center">
        <div className="app-accent text-center">
          <div className="terminal-title mb-4">◈ SYSTEM ◈</div>
          <div className="text-sm">[ AUTHENTICATING... ]</div>
          <div className="mt-4 text-xs app-text-dim">▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
