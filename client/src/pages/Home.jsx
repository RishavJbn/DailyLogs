// FIXED: Added useCallback import to prevent infinite loop
import { useEffect, useState, useCallback } from "react";
import { getAllLogs, getLogByDate } from "../api/dailylogapi.js";
import Editor from "../components/Editor.jsx";

const Home = () => {
  const [logs, setLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);
  // FIXED: Use current date dynamically instead of hardcoded "2026-02-04"
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  // FIXED: Wrapped in useCallback to prevent infinite loop when used in useEffect dependency
  const fetchLogs = useCallback(async () => {
    try {
      const res = await getAllLogs();
      setLogs(res.data);
    } catch (err) {
      console.error("Failed to fetch logs", err);
    }
  }, []); // Empty deps because getAllLogs and setLogs are stable

  // FIXED: fetchLogs is now stable (memoized), so this won't cause infinite loops
  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  // When clicking a log card
  const handleSelectLog = (log) => {
    setSelectedLog(log);
    setSelectedDate(log.date);
  };

  // New entry
  const handleNewEntry = () => {
    setSelectedLog(null);
    // FIXED: Reset to current date when creating new entry
    setSelectedDate(new Date().toISOString().split("T")[0]);
  };

  // After save → refresh logs
  const handleSaved = async (date) => {
    await fetchLogs();

    const res = await getLogByDate(date);
    setSelectedLog(res.data);
  };

  return (
    <div className="h-screen bg-[#f6f6f6] p-4">
      <div className="h-full flex gap-4">
        {/* LEFT PANEL */}
        <div className="w-[40%] bg-white border rounded-2xl p-4 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold">Daily Logs</h1>
            <div className="w-8 h-8 bg-blue-400 rounded-full" />
          </div>

          {/* Logs list */}
          <div className="flex-1 space-y-3 overflow-y-auto">
            {logs.map((log) => (
              <div
                key={log._id}
                onClick={() => handleSelectLog(log)}
                className={`p-3 rounded-xl cursor-pointer border ${
                  selectedLog?._id === log._id ? "bg-blue-100" : "bg-gray-100"
                }`}
              >
                <div className="font-medium text-sm">
                  {log.title || "Untitled"}
                </div>
                <div className="text-xs text-gray-500">{log.date}</div>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="mt-4 flex gap-3">
            <div className="flex-1 h-40 bg-green-200 rounded-xl flex items-center justify-center">
              Calendar (v1 later)
            </div>

            <div className="flex flex-col justify-end">
              <button
                onClick={handleNewEntry}
                className="border px-4 py-2 rounded-lg"
              >
                New Entry
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 bg-white border rounded-2xl p-6">
          <Editor
            selectedLog={selectedLog}
            selectedDate={selectedDate}
            onSaved={handleSaved}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
