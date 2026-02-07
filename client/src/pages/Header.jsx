import { useEffect, useState } from "react";
import { setTheme } from "../utils/theme";

export default function Header({ isLoggedIn, onLogout }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const dateStr = now.toDateString();
  const timeStr = now.toLocaleTimeString();

  return (
    <div className="app-box px-4 py-2 flex items-center justify-between text-sm">
      {/* LEFT */}
      <div className="app-accent">daily-logs</div>

      {/* CENTER */}
      <div className="opacity-70">
        {dateStr} · {timeStr}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <button onClick={onLogout} className="hover:opacity-70">
            logout
          </button>
        ) : (
          <span className="opacity-50">guest</span>
        )}

        <div className="flex gap-2 text-xs">
          <button onClick={() => setTheme("terminal")}>T</button>
          <button onClick={() => setTheme("blue")}>B</button>
          <button onClick={() => setTheme("light")}>L</button>
        </div>
      </div>
    </div>
  );
}
