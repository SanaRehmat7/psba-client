import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      setMessage("User registered successfully!");
      setForm({ username: "", email: "", password: "" });
    } catch (err) {
      setMessage(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-700">Register</h2>
      {message && <p className="text-blue-600 mb-2">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="Username" required className="w-full px-4 py-2 border rounded" />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required className="w-full px-4 py-2 border rounded" />
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required className="w-full px-4 py-2 border rounded" />
        <button type="submit" className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800">Register</button>
      </form>
    </div>
  );
}
