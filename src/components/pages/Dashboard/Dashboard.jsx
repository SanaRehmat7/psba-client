import React from "react";

export default function Dashboard({ user }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100">
      <h1 className="text-3xl font-bold text-green-800">Welcome, {user?.username || "User"} 🎉</h1>
    </div>
  );
}
