import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await axios.post("/users/login", { email, password });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="app-bg app-text h-screen flex items-center justify-center">
      <div className="app-box p-6 w-[320px]">
        <div className="app-accent mb-6">login</div>

        <input
          placeholder="email"
          className="bg-transparent border-b app-border w-full mb-4 outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          className="bg-transparent border-b app-border w-full mb-6 outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} className="app-accent">
          enter
        </button>
      </div>
    </div>
  );
}
