"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NotificationsPage() {

  const [notifications, setNotifications] = useState([]);


  useEffect(() => {
    loadNotifications();
  }, []);


  async function loadNotifications() {

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false });


    if (!error) {
      setNotifications(data);
    }

  }


  return (
    <div>

      <h1>
        Notifications
      </h1>


      {
        notifications.length === 0 ? (

          <p>
            No Notifications
          </p>

        ) : (

          notifications.map((item)=>(

            <div key={item.id}>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.message}
              </p>

            </div>

          ))

        )
      }


    </div>
  );
}
