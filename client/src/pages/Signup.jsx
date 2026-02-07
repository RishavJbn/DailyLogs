import { useState } from "react";
import { registerUser } from "../api/userapi";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSignup = async () => {
    await registerUser(form);
    navigate("/login");
  };

  return (
    <div className="app-bg app-text h-screen flex items-center justify-center">
      <div className="app-box p-6 w-[320px]">
        <div className="app-accent mb-6">signup</div>

        <input
          placeholder="name"
          className="bg-transparent border-b app-border w-full mb-3 outline-none"
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />

        <input
          placeholder="email"
          className="bg-transparent border-b app-border w-full mb-3 outline-none"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="username"
          className="bg-transparent border-b app-border w-full mb-3 outline-none"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="password"
          className="bg-transparent border-b app-border w-full mb-6 outline-none"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button onClick={handleSignup} className="app-accent">
          create
        </button>
      </div>
    </div>
  );
}
