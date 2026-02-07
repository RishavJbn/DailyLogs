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
      <div className="app-box p-8 w-[500px]">
        {/* ASCII Art Header */}
        <pre className="text-[8px] app-accent text-center mb-4 leading-tight">
          {`
 ████████╗███████╗ ██████╗██╗  ██╗    ██╗      ██████╗  ██████╗ ███████╗
 ╚══██╔══╝██╔════╝██╔════╝██║  ██║    ██║     ██╔═══██╗██╔════╝ ██╔════╝
    ██║   █████╗  ██║     ███████║    ██║     ██║   ██║██║  ███╗███████╗
    ██║   ██╔══╝  ██║     ██╔══██║    ██║     ██║   ██║██║   ██║╚════██║
    ██║   ███████╗╚██████╗██║  ██║    ███████╗╚██████╔╝╚██████╔╝███████║
    ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝    ╚══════╝ ╚═════╝  ╚═════╝ ╚══════╝
`}
        </pre>

        <div className="terminal-title app-accent text-center mb-2">
          ◈ AUTHENTICATION PROTOCOL ◈
        </div>
        <div className="text-center text-[10px] app-text-dim mb-6">
          v2.0.1-alpha | BUILD 0x4A2F | PORT :8000 | SSL ENABLED
        </div>

        {error && (
          <div className="terminal-error mb-6">[ERR_CODE: 0x401] {error}</div>
        )}

        <div className="mb-6">
          <div className="text-xs app-text-dim mb-1">
            0x01 // INPUT: USERNAME || EMAIL
          </div>
          <input
            placeholder="root@techlog.sys"
            className="terminal-input w-full"
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className="mb-8">
          <div className="text-xs app-text-dim mb-1">
            0x02 // INPUT: PASSWORD (SHA-256)
          </div>
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
          <div>█▓▒░ AES-256 | TLS 1.3 | RSA-2048 ░▒▓█</div>
          <div className="mt-2 text-[8px]">
            STATUS: 0b01000001 | LATENCY: ~12ms | UPTIME: 99.9%
          </div>
        </div>
      </div>
    </div>
  );
}
