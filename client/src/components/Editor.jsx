import { useEffect, useState } from "react";
import { createLog, updateLog } from "../api/dailylogapi.js";

const Editor = ({ selectedLog, selectedDate, onSaved }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [logId, setLogId] = useState(null);

  useEffect(() => {
    if (selectedLog) {
      setTitle(selectedLog.title || "");
      setContent(selectedLog.content || "");
      setLogId(selectedLog._id);
    } else {
      setTitle("");
      setContent("");
      setLogId(null);
    }
  }, [selectedLog]);

  const handleSave = async () => {
    if (!content.trim()) return;

    try {
      if (logId) {
        await updateLog(logId, { title, content });
      } else {
        const res = await createLog({
          date: selectedDate,
          title,
          content,
        });
        setLogId(res.data._id);
      }

      onSaved(selectedDate);
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="text-sm text-gray-500">{selectedDate}</div>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border rounded-lg p-3"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 border rounded-lg p-4"
      />

      <div className="flex justify-center">
        <button
          onClick={handleSave}
          className="bg-green-300 px-8 py-2 rounded-full"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Editor;
