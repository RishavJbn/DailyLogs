import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import LogList from "../components/LogList.jsx";
import Editor from "../components/Editor.jsx";
import { getAllLogs } from "../api/dailylogapi.js";

export default function Home() {
  const [logs, setLogs] = useState([]);
  const [activeLog, setActiveLog] = useState(null);
  const [sidebarWidth, setSidebarWidth] = useState(288); // 72 * 4 = 288px (w-72 in tailwind)
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const res = await getAllLogs();
    setLogs(res.data);
  };

  const startResizing = () => {
    setIsResizing(true);
  };

  const stopResizing = () => {
    setIsResizing(false);
  };

  const resize = (e) => {
    if (isResizing) {
      const newWidth = e.clientX;
      if (newWidth >= 200 && newWidth <= 600) {
        setSidebarWidth(newWidth);
      }
    }
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResizing);
    } else {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    }

    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing]);

  return (
    <div className="app-bg app-text h-screen flex flex-col scan-line">
      <Header />

      <div className="flex flex-1 overflow-hidden" onMouseMove={resize}>
        <div
          className="border-r-2 app-border p-4 overflow-y-auto"
          style={{ width: `${sidebarWidth}px` }}
        >
          <div className="mb-3 text-xs app-text-dim">
            // LOG ARCHIVE [{logs?.length || 0}]
          </div>
          <LogList logs={logs} onSelect={setActiveLog} activeLog={activeLog} />
        </div>

        {/* Resizable Divider */}
        <div
          className="w-1 bg-transparent hover:bg-green-500 hover:bg-opacity-30 cursor-col-resize transition-colors relative group"
          onMouseDown={startResizing}
        >
          <div className="absolute inset-0 w-3 -left-1" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="text-xs app-accent">⋮</div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <Editor activeLog={activeLog} refreshLogs={fetchLogs} />
        </div>
      </div>
    </div>
  );
}
