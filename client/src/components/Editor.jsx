export default function Editor() {
  return (
    <div className="p-6 flex flex-col h-full">
      <input
        placeholder="title"
        className="bg-transparent border-b app-border outline-none mb-4 pb-1"
      />

      <textarea
        placeholder="write..."
        className="flex-1 bg-transparent outline-none resize-none"
      />

      <button className="mt-4 app-accent text-sm self-start">save</button>
    </div>
  );
}
