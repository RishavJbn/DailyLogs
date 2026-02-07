import { useEffect, useState } from "react";
import { setTheme } from "../utils/theme.js";
import { logoutUser } from "../api/userapi.js";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [now, setNow] = useState(new Date());
  const [uptime, setUptime] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setNow(new Date());
      setUptime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div className="app-box px-6 py-3 flex justify-between items-center text-sm">
      <div className="flex items-center gap-4">
        <div className="app-accent font-bold text-base">
          ███ TECH.LOGS.SYS v2.0.1
        </div>
        <div className="text-[10px] app-text-dim">
          [PID: 1337] [MEM: {Math.floor(Math.random() * 20 + 40)}MB]
        </div>
      </div>

      <div className="app-text-dim text-xs flex gap-4">
        <span>[{now.toLocaleDateString()}]</span>
        <span>[{now.toLocaleTimeString()}]</span>
        <span className="app-accent">[UPTIME: {formatUptime(uptime)}]</span>
      </div>

      <div className="flex gap-6 items-center">
        <div className="text-[10px] app-text-dim">
          0x{now.getTime().toString(16).slice(-6).toUpperCase()}
        </div>
        <button onClick={handleLogout} className="terminal-link text-xs">
          logout_0xFF
        </button>
      </div>
    </div>
  );
}
