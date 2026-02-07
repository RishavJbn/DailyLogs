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
    <div className="app-box px-4 py-2 flex justify-between text-sm">
      <div className="app-accent">daily-logs</div>

      <div className="opacity-70">
        {now.toDateString()} · {now.toLocaleTimeString()}
      </div>

      <div className="flex gap-4 items-center">
        <button onClick={handleLogout}>logout</button>

        <div className="flex gap-2 text-xs">
          <button onClick={() => setTheme("terminal")}>T</button>
          <button onClick={() => setTheme("blue")}>B</button>
          <button onClick={() => setTheme("light")}>L</button>
        </div>
      </div>
    </div>
  );
}
