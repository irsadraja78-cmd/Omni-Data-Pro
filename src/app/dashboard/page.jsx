"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

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
      <Sidebar />

      <main>
        <Navbar />

        <section>
          <h1>
            Welcome to Omni Data Pro
          </h1>

          {user && (
            <p>
              Logged in: {user.email}
            </p>
          )}

          <div>
            <h2>Freelancer Workspace</h2>

            <p>
              Start your work from here.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}
