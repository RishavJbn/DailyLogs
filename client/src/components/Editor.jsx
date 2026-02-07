import { useEffect, useState } from "react";
import { createLog, updateLog, deleteLog } from "../api/dailylogapi.js";

export default function Editor({ activeLog, refreshLogs }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [id, setId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (activeLog) {
      setTitle(activeLog.title || "");
      setContent(activeLog.content || "");
      setId(activeLog._id);
      setLastSaved(activeLog.updatedAt);
    } else {
      setTitle("");
      setContent("");
      setId(null);
      setLastSaved(null);
    }
  }, [activeLog]);

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    const chars = content.length;
    setWordCount(words);
    setCharCount(chars);
  }, [content]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (id) {
        await updateLog(id, { title, content });
      } else {
        await createLog({
          date: new Date().toISOString(),
          title,
          content,
        });
      }
      setLastSaved(new Date());
      await refreshLogs();
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (id) {
      await deleteLog(id);
      setTitle("");
      setContent("");
      setId(null);
      setShowDeleteConfirm(false);
      await refreshLogs();
    }
  };

  const handleNew = () => {
    setTitle("");
    setContent("");
    setId(null);
    setLastSaved(null);
  };

  const insertMarkdown = (syntax) => {
    const textarea = document.querySelector("textarea");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    let newText = content;
    let newCursorPos = start;

    switch (syntax) {
      case "bold":
        newText =
          content.substring(0, start) +
          `**${selectedText || "bold text"}**` +
          content.substring(end);
        newCursorPos = start + 2;
        break;
      case "italic":
        newText =
          content.substring(0, start) +
          `*${selectedText || "italic text"}*` +
          content.substring(end);
        newCursorPos = start + 1;
        break;
      case "code":
        newText =
          content.substring(0, start) +
          `\`${selectedText || "code"}\`` +
          content.substring(end);
        newCursorPos = start + 1;
        break;
      case "heading":
        newText =
          content.substring(0, start) +
          `## ${selectedText || "Heading"}` +
          content.substring(end);
        newCursorPos = start + 3;
        break;
    }

    setContent(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <div className="p-6 flex flex-col h-full animate-fade-in">
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button
            onClick={handleNew}
            className="text-xs app-accent hover:opacity-70 transition-opacity border app-border px-3 py-1"
            title="New Log"
          >
            + NEW
          </button>
          {id && (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="text-xs text-red-500 hover:opacity-70 transition-opacity border border-red-500 px-3 py-1"
              title="Delete Log"
            >
              DELETE
            </button>
          )}
        </div>
        <div className="text-xs app-text-dim">
          {isSaving && <span className="animate-pulse">[ SAVING... ]</span>}
          {!isSaving && lastSaved && <span>[ SAVED ]</span>}
        </div>
      </div>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="mb-4 border-2 border-red-500 p-4 bg-red-500 bg-opacity-10 animate-slide-in">
          <div className="text-sm mb-3">
            [ WARNING ] Delete this log permanently?
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              className="text-xs text-red-500 border border-red-500 px-4 py-1 hover:bg-red-500 hover:bg-opacity-20"
            >
              CONFIRM DELETE
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="text-xs app-accent border app-border px-4 py-1 hover:bg-green-500 hover:bg-opacity-10"
            >
              CANCEL
            </button>
          </div>
        </div>
      )}

      {/* Title */}
      <div className="mb-6">
        <div className="text-xs app-text-dim mb-2">// ENTRY TITLE</div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="untitled_log.txt"
          className="terminal-input w-full text-base font-bold"
        />
      </div>

      {/* Markdown Toolbar */}
      <div className="mb-3 flex gap-2 text-xs">
        <div className="app-text-dim mr-2">// MARKDOWN:</div>
        <button
          onClick={() => insertMarkdown("bold")}
          className="app-accent hover:opacity-70"
          title="Bold"
        >
          **B**
        </button>
        <button
          onClick={() => insertMarkdown("italic")}
          className="app-accent hover:opacity-70"
          title="Italic"
        >
          *I*
        </button>
        <button
          onClick={() => insertMarkdown("code")}
          className="app-accent hover:opacity-70"
          title="Code"
        >
          `C`
        </button>
        <button
          onClick={() => insertMarkdown("heading")}
          className="app-accent hover:opacity-70"
          title="Heading"
        >
          ## H
        </button>
      </div>

      {/* Content Editor */}
      <div className="flex-1 flex flex-col mb-4">
        <div className="text-xs app-text-dim mb-2">// CONTENT</div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="> Start typing your log entry...\n> Supports markdown syntax\n> **bold** *italic* \`code\` ## heading"
          className="flex-1 bg-transparent outline-none resize-none app-text terminal-prompt leading-relaxed"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        />
      </div>

      {/* Stats Bar */}
      <div className="flex justify-between items-center mb-4 text-xs app-text-dim border-t app-border pt-3">
        <div className="flex gap-4">
          <span>[ WORDS: {wordCount} ]</span>
          <span>[ CHARS: {charCount} ]</span>
          <span>[ BYTES: {new Blob([content]).size} ]</span>
        </div>
        <div className="flex gap-2">
          {id && <span>[ 0x{id.slice(-6)} ]</span>}
          <span className="app-accent">[ ✓ UTF-8 ]</span>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="terminal-button self-end"
        disabled={isSaving}
      >
        {isSaving ? "[ SAVING... ]" : "[ SAVE LOG ]"}
      </button>
    </div>
  );
}
