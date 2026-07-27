"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PaymentsPage() {

  const [account, setAccount] = useState(null);


  useEffect(() => {
    getAccount();
  }, []);


  async function getAccount() {

    const { data, error } = await supabase
      .from("admin_bank_account")
      .select("*")
      .single();


    if (!error) {
      setAccount(data);
    }

  }


  return (
    <div>

      <h1>
        Payment Account
      </h1>


      {
        account && (
          <div>

            <p>
              Account Name: {account.account_name}
            </p>

            <p>
              Bank: {account.bank_name}
            </p>

            <p>
              UPI: {account.upi_id}
            </p>

          </div>
        )
      }


    </div>
  );
}
