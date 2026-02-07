import { useState } from "react";
import { resetPassword } from "../api/userapi.js";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async () => {
    try {
      setError("");

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }

      if (!token) {
        setError("Invalid or missing reset token.");
        return;
      }

      setLoading(true);
      const response = await resetPassword({ token, password });
      if (response.success) {
        alert(
          "Password reset successful! Please login with your new password.",
        );
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-bg app-text h-screen flex items-center justify-center scan-line">
      <div className="app-box p-8 w-[450px]">
        <div className="terminal-title app-accent text-center mb-8">
          ◈ RESET PASSWORD ◈
        </div>

        {error && <div className="terminal-error mb-6">[ERROR] {error}</div>}

        <div className="mb-5">
          <div className="text-xs app-text-dim mb-1">// NEW PASSWORD</div>
          <input
            type="password"
            placeholder="••••••••"
            className="terminal-input w-full"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-8">
          <div className="text-xs app-text-dim mb-1">// CONFIRM PASSWORD</div>
          <input
            type="password"
            placeholder="••••••••"
            className="terminal-input w-full"
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="terminal-button w-full"
        >
          {loading ? "[ UPDATING... ]" : "[ RESET PASSWORD ]"}
        </button>

        <div className="mt-8 text-center text-xs app-text-dim">
          <div>█▓▒░ MINIMUM 6 CHARACTERS ░▒▓█</div>
        </div>
      </div>
    </div>
  );
}
