"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SubscriptionPage() {

  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    getSubscriptions();
  }, []);


  async function getSubscriptions() {

    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .order("created_at", { ascending: false });


    if (!error) {
      setSubscriptions(data);
    }

  }


  return (
    <div>

      <h1>
        Subscription Management
      </h1>


      {
        subscriptions.map((sub) => (

          <div key={sub.id}>

            <h3>
              {sub.plan_name}
            </h3>

            <p>
              Status: {sub.status}
            </p>

            <p>
              Expiry: {sub.end_date}
            </p>

          </div>

        ))
      }

    </div>
  );
}
