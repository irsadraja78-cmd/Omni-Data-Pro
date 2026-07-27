"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SecurityPage() {

  const [logs, setLogs] = useState([]);


  useEffect(() => {
    loadLogs();
  }, []);


  async function loadLogs() {

    const { data, error } = await supabase
      .from("security_logs")
      .select("*")
      .order("created_at", { ascending: false });


    if (!error) {
      setLogs(data);
    }

  }


  return (
    <div>

      <h1>
        Security Logs
      </h1>


      {
        logs.length === 0 ? (

          <p>
            No Activity Found
          </p>

        ) : (

          logs.map((log)=>(

            <div key={log.id}>

              <h3>
                {log.action}
              </h3>

              <p>
                User: {log.user_id}
              </p>

              <p>
                Date: {log.created_at}
              </p>

            </div>

          ))

        )
      }


    </div>
  );
}
