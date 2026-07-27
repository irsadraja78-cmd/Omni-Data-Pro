"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAdmin();
  }, []);


  async function checkAdmin() {

    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      window.location.href = "/login";
      return;
    }

    setUser(data.user);

  }


  return (
    <div>

      <h1>
        Omni Data Pro Admin Panel
      </h1>

      {
        user && (
          <p>
            Admin: {user.email}
          </p>
        )
      }


      <div>

        <h2>
          Management
        </h2>

        <ul>
          <li>
            Freelancer Management
          </li>

          <li>
            Work Management
          </li>

          <li>
            Subscription Management
          </li>

          <li>
            Payment Account
          </li>

          <li>
            Security Logs
          </li>
        </ul>

      </div>

    </div>
  );
}
