import { useEffect, useState } from "react";
import { setTheme } from "../utils/theme.js";
import { logoutUser } from "../api/userapi.js";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [now, setNow] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div className="app-box px-6 py-3 flex justify-between items-center text-sm">
      <div className="app-accent font-bold text-base">███ DAILY.LOGS.SYS</div>

      <div className="app-text-dim text-xs">
        [{now.toDateString()}] [{now.toLocaleTimeString()}]
      </div>

      <div className="flex gap-6 items-center">
        <button onClick={handleLogout} className="terminal-link text-xs">
          disconnect
        </button>
      </div>
    </div>
  );
}
