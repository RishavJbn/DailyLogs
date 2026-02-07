import { useState } from "react";
import { registerUser } from "../api/userapi.js";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setError("");
      await registerUser(form);
      alert("Account created successfully! Please login.");
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create account. Please try again.",
      );
    }
  };

  return (
    <div className="app-bg app-text h-screen flex items-center justify-center scan-line">
      <div className="app-box p-8 w-[500px]">
        <div className="terminal-title app-accent text-center mb-8">
          ◈ NEW USER REGISTRATION ◈
        </div>

        {error && <div className="terminal-error mb-6">[ERROR] {error}</div>}

        <div className="mb-5">
          <div className="text-xs app-text-dim mb-1">// FULL NAME</div>
          <input
            placeholder="John Doe"
            className="terminal-input w-full"
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
        </div>

        <div className="mb-5">
          <div className="text-xs app-text-dim mb-1">// EMAIL ADDRESS</div>
          <input
            placeholder="user@system.net"
            type="email"
            className="terminal-input w-full"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="mb-5">
          <div className="text-xs app-text-dim mb-1">// USERNAME</div>
          <input
            placeholder="user_name"
            className="terminal-input w-full"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>

        <div className="mb-8">
          <div className="text-xs app-text-dim mb-1">// PASSWORD</div>
          <input
            type="password"
            placeholder="••••••••"
            className="terminal-input w-full"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            onKeyPress={(e) => e.key === "Enter" && handleSignup()}
          />
        </div>

        <div className="flex justify-center mb-6">
          <button onClick={handleSignup} className="terminal-button w-full">
            [ CREATE ACCOUNT ]
          </button>
        </div>

        <div className="text-center text-xs">
          <Link to="/login" className="terminal-link">
            already_registered? login_here
          </Link>
        </div>

        <div className="mt-8 text-center text-xs app-text-dim">
          <div>█▓▒░ ENCRYPTION ENABLED ░▒▓█</div>
        </div>
      </div>
    </div>
  );
}
