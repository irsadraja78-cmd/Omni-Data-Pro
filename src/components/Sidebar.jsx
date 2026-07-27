"use client";

import { supabase } from "@/lib/supabase";

export default function Sidebar() {

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <aside>
      <h2>Omni Data Pro</h2>

      <nav>
        <ul>
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>

          <li>
            <a href="/workspace">My Workspace</a>
          </li>

          <li>
            <a href="/files">My Files</a>
          </li>

          <li>
            <a href="/data-entry">Data Entry Work</a>
          </li>

          <li>
            <a href="/subscription">Subscription</a>
          </li>

          <li>
            <a href="/profile">Profile</a>
          </li>

          <li>
            <a href="/settings">Settings</a>
          </li>

          <li>
            <button onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
