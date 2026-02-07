export default function LogList({ logs, onSelect, activeLog }) {
  return (
    <div className="space-y-1 text-sm">
      {logs?.map((log, index) => (
        <div
          key={log._id}
          className={`cursor-pointer p-2 border app-border transition-all animate-slide-in ${
            activeLog?._id === log._id
              ? "bg-green-500 bg-opacity-10 text-white border-l-4"
              : "hover:bg-green-500 hover:bg-opacity-5 border-l-2"
          }`}
          style={{ animationDelay: `${index * 0.05}s` }}
          onClick={() => onSelect(log)}
        >
          <div className="flex items-center gap-2">
            <span className="app-accent">
              {activeLog?._id === log._id ? "▶" : "►"}
            </span>
            <span className="font-mono">{log.date?.slice(0, 10)}</span>
          </div>
          <div className="text-xs app-text-dim truncate ml-5 mt-1">
            {log.title || "untitled"}
          </div>
          {activeLog?._id === log._id && (
            <div className="text-xs app-accent ml-5 mt-1 animate-pulse">
              [ ACTIVE ]
            </div>
          )}
        </div>
      ))}
      {(!logs || logs.length === 0) && (
        <div className="app-text-dim text-xs p-2 text-center mt-4">
          // NO LOGS FOUND
          <div className="mt-2 text-[10px]">CREATE YOUR FIRST LOG</div>
        </div>
      )}
    </div>
  );
}
