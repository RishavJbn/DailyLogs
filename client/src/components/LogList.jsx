import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function LogList() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const res = await axios.get("/dailylog");
    setLogs(res.data.data);
  };

  return (
    <div className="text-sm space-y-2">
      {logs.map((log) => (
        <div key={log._id} className="cursor-pointer hover:opacity-70">
          {log.date?.slice(0, 10)}
        </div>
      ))}
    </div>
  );
}
