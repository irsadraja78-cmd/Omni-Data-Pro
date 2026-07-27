"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AnalyticsPage() {

  const [stats, setStats] = useState({
    freelancers: 0,
    subscriptions: 0,
    payments: 0,
    works: 0
  });


  useEffect(() => {
    loadStats();
  }, []);


  async function loadStats() {


    const freelancers =
      await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });


    const subscriptions =
      await supabase
      .from("subscriptions")
      .select("*", { count: "exact", head: true });


    const payments =
      await supabase
      .from("payments")
      .select("*", { count: "exact", head: true });


    const works =
      await supabase
      .from("work_history")
      .select("*", { count: "exact", head: true });


    setStats({

      freelancers: freelancers.count || 0,

      subscriptions: subscriptions.count || 0,

      payments: payments.count || 0,

      works: works.count || 0

    });

  }


  return (
    <div>

      <h1>
        Admin Analytics
      </h1>


      <div>

        <h2>
          Freelancers
        </h2>

        <p>
          {stats.freelancers}
        </p>


        <h2>
          Subscriptions
        </h2>

        <p>
          {stats.subscriptions}
        </p>


        <h2>
          Payments
        </h2>

        <p>
          {stats.payments}
        </p>


        <h2>
          Work Records
        </h2>

        <p>
          {stats.works}
        </p>


      </div>


    </div>
  );
}
