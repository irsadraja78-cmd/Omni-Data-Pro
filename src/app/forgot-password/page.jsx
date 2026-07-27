"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleReset(e) {
    e.preventDefault();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Password reset link email पर भेज दिया गया है.");
  }

  return (
    <div>
      <h1>Omni Data Pro</h1>
      <h2>Forgot Password</h2>

      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">
          Send Reset Link
        </button>
      </form>

      <p>{message}</p>

      <a href="/login">
        Back to Login
      </a>
    </div>
  );
}
