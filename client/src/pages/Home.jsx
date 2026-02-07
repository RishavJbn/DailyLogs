import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import LogList from "../components/LogList.jsx";
import Editor from "../components/Editor.jsx";
import { getAllLogs } from "../api/dailylogapi.js";

export default function Home() {
  const [logs, setLogs] = useState([]);
  const [activeLog, setActiveLog] = useState(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const res = await getAllLogs();
    setLogs(res.data);
  };

  return (
    <div className="app-bg app-text h-screen flex flex-col">
      <Header />

      <div className="flex flex-1">
        <div className="w-65 border-r app-border p-4">
          <LogList logs={logs} onSelect={setActiveLog} />
        </div>

        <div className="flex-1">
          <Editor activeLog={activeLog} refreshLogs={fetchLogs} />
        </div>
      </div>
    </div>
  );
}
