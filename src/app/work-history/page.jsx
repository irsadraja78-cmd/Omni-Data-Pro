"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function WorkHistoryPage() {

  const [works, setWorks] = useState([]);

  useEffect(() => {
    getWorkHistory();
  }, []);


  async function getWorkHistory() {

    const { data, error } = await supabase
      .from("work_history")
      .select("*")
      .order("created_at", { ascending: false });


    if (!error) {
      setWorks(data);
    }

  }


  return (
    <div>

      <h1>
        Work History
      </h1>


      {works.length === 0 ? (

        <p>
          No work history found
        </p>

      ) : (

        works.map((work) => (

          <div key={work.id}>

            <h3>
              {work.work_type}
            </h3>

            <p>
              Status: {work.status}
            </p>

            <p>
              Date: {work.created_at}
            </p>

          </div>

        ))

      )}

    </div>
  );
}
