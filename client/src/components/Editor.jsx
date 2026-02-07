import { useEffect, useState } from "react";
import { createLog, updateLog } from "../api/dailylogapi";

export default function Editor({ activeLog, refreshLogs }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [id, setId] = useState(null);

  useEffect(() => {
    if (activeLog) {
      setTitle(activeLog.title || "");
      setContent(activeLog.content || "");
      setId(activeLog._id);
    }
  }, [activeLog]);

  const handleSave = async () => {
    if (id) {
      await updateLog(id, { title, content });
    } else {
      await createLog({
        date: new Date(),
        title,
        content,
      });
    }

    refreshLogs();
  };

  return (
    <div className="p-6 flex flex-col h-full">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="title"
        className="bg-transparent border-b app-border outline-none mb-4"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 bg-transparent outline-none resize-none"
      />

      <button onClick={handleSave} className="mt-4 app-accent">
        save
      </button>
    </div>
  );
}
