"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const { data } = await supabase.auth.getUser();

    if (data.user) {
      setEmail(data.user.email);
    }
  }

  return (
    <header>
      <div>
        <h2>Omni Data Pro</h2>
      </div>

      <div>
        <span>
          {email}
        </span>

        <button>
          🔔
        </button>

        <button>
          Account
        </button>
      </div>
    </header>
  );
}
