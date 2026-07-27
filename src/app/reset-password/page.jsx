"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleUpdate(e) {
    e.preventDefault();

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Password successfully updated.");
  }

  return (
    <div>
      <h1>Omni Data Pro</h1>
      <h2>Reset Password</h2>

      <form onSubmit={handleUpdate}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Update Password
        </button>
      </form>

      <p>{message}</p>

      <a href="/login">
        Go to Login
      </a>
    </div>
  );
}
