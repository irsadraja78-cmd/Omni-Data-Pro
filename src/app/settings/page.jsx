"use client";

import { useState } from "react";

export default function SettingsPage() {

  const [notifications, setNotifications] = useState(true);


  return (
    <div>

      <h1>
        Account Settings
      </h1>


      <div>

        <h2>
          Preferences
        </h2>


        <label>

          <input
            type="checkbox"
            checked={notifications}
            onChange={(e)=>setNotifications(e.target.checked)}
          />

          Enable Notifications

        </label>


      </div>


      <div>

        <h2>
          Security
        </h2>

        <button>
          Change Password
        </button>

      </div>


      <div>

        <h2>
          Account
        </h2>

        <button>
          Logout
        </button>

      </div>


    </div>
  );
}
