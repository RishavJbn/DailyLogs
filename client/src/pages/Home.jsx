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
    <div className="app-bg app-text h-screen flex flex-col scan-line">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <div className="w-72 border-r-2 app-border p-4 overflow-y-auto">
          <div className="mb-3 text-xs app-text-dim">// LOG ARCHIVE</div>
          <LogList logs={logs} onSelect={setActiveLog} activeLog={activeLog} />
        </div>

        <div className="flex-1 overflow-hidden">
          <Editor activeLog={activeLog} refreshLogs={fetchLogs} />
        </div>
      </div>
    </div>
  );
}
