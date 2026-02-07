export default function LogList({ logs, onSelect }) {
  return (
    <div className="space-y-2 text-sm">
      {logs?.map((log) => (
        <div
          key={log._id}
          className="cursor-pointer hover:opacity-70"
          onClick={() => onSelect(log)}
        >
          {log.date?.slice(0, 10)}
        </div>
      ))}
    </div>
  );
}
