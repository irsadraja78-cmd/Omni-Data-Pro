"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function FreelancersPage() {

  const [freelancers, setFreelancers] = useState([]);

  useEffect(() => {
    getFreelancers();
  }, []);


  async function getFreelancers() {

    const { data, error } = await supabase
      .from("profiles")
      .select("*");


    if (!error) {
      setFreelancers(data);
    }

  }


  return (
    <div>

      <h1>
        Freelancer Management
      </h1>


      {
        freelancers.map((user) => (

          <div key={user.id}>

            <h3>
              {user.full_name}
            </h3>

            <p>
              Status: {user.status}
            </p>

            <p>
              Role: {user.role_id}
            </p>

          </div>

        ))
      }


    </div>
  );
}
