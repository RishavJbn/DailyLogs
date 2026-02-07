import { useState } from "react";
import { loginUser } from "../api/userapi.js";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setError("");
      // Send as username if no @ symbol, otherwise as email
      const loginData = usernameOrEmail.includes("@")
        ? { email: usernameOrEmail, password }
        : { username: usernameOrEmail, password };

      console.log("Attempting login with:", loginData);
      const response = await loginUser(loginData);
      console.log("Login response:", response);
      if (response.success) {
        login(response.data);
        navigate("/");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || "Invalid credentials. Please try again.",
      );
    }
  };

  return (
    <div className="app-bg app-text h-screen flex items-center justify-center scan-line">
      <div className="app-box p-8 w-[450px]">
        <div className="terminal-title app-accent text-center mb-8">
          ◈ SYSTEM LOGIN ◈
        </div>

        {error && <div className="terminal-error mb-6">[ERROR] {error}</div>}

        <div className="mb-6">
          <div className="text-xs app-text-dim mb-1">// USERNAME OR EMAIL</div>
          <input
            placeholder="username or email"
            className="terminal-input w-full"
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className="mb-8">
          <div className="text-xs app-text-dim mb-1">// ENTER PASSWORD</div>
          <input
            type="password"
            placeholder="••••••••"
            className="terminal-input w-full"
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            autoComplete="current-password"
          />
        </div>

        <div className="flex justify-center mb-6">
          <button onClick={handleLogin} className="terminal-button w-full">
            [ CONNECT ]
          </button>
        </div>

        <div className="flex justify-between text-xs">
          <Link to="/forgot-password" className="terminal-link">
            reset_password
          </Link>
          <Link to="/signup" className="terminal-link">
            new_account
          </Link>
        </div>

        <div className="mt-8 text-center text-xs app-text-dim">
          <div>█▓▒░ SECURE CONNECTION ACTIVE ░▒▓█</div>
        </div>
      </div>
    </div>
  );
}
