"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      window.location.href = "/login";
      return;
    }

    setUser(data.user);
  }

  return (
    <div>
      <h1>Omni Data Pro Dashboard</h1>

      {user && (
        <p>
          Welcome {user.email}
        </p>
      )}

      <h2>Freelancer Workspace</h2>
    </div>
  );
}
