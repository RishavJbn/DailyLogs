import { useState } from "react";
import { requestPasswordReset } from "../api/userapi.js";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setError("");
      setMessage("");
      setLoading(true);
      const response = await requestPasswordReset({ email });
      if (response.success) {
        setMessage("Password reset link sent to your email.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-bg app-text h-screen flex items-center justify-center scan-line">
      <div className="app-box p-8 w-[450px]">
        <div className="terminal-title app-accent text-center mb-8">
          ◈ PASSWORD RECOVERY ◈
        </div>

        <p className="text-sm mb-6 app-text-dim text-center">
          // Enter your registered email address
          <br />
          // System will send reset instructions
        </p>

        {error && <div className="terminal-error mb-6">[ERROR] {error}</div>}

        {message && (
          <div className="border border-green-500 bg-green-500 bg-opacity-10 p-3 mb-6 text-sm text-center">
            [SUCCESS] {message}
          </div>
        )}

        <div className="mb-8">
          <div className="text-xs app-text-dim mb-1">// EMAIL ADDRESS</div>
          <input
            placeholder="user@system.net"
            className="terminal-input w-full"
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="terminal-button flex-1"
          >
            {loading ? "[ PROCESSING... ]" : "[ SEND RESET LINK ]"}
          </button>
        </div>

        <div className="text-center text-xs">
          <Link to="/login" className="terminal-link">
            return_to_login
          </Link>
        </div>
      </div>
    </div>
  );
}
