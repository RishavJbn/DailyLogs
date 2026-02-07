import Header from "../components/Header.jsx";
import LogList from "../components/LogList.jsx";
import Editor from "../components/Editor.jsx";

export default function Home() {
  return (
    <div className="app-bg app-text h-screen flex flex-col">
      <Header isLoggedIn={true} />

      <div className="flex flex-1">
        <div className="w-65 border-r app-border p-4">
          <LogList />
        </div>

        <div className="flex-1">
          <Editor />
        </div>
      </div>
    </div>
  );
}
