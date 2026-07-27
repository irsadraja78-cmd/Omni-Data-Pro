"use client";

import { useState } from "react";

export default function SubscriptionPage() {

  const [plan, setPlan] = useState("");
  const [amount, setAmount] = useState(0);

  function choosePlan(selectedPlan, price) {
    setPlan(selectedPlan);
    setAmount(price);
  }

  async function startPayment() {

    const response = await fetch("/api/create-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount,
        plan
      })
    });

    const data = await response.json();

    console.log(data);
  }

  return (
    <div>

      <h1>Choose Subscription Plan</h1>

      <div>

        <button onClick={() => choosePlan("Basic", 499)}>
          Basic ₹499
        </button>

        <button onClick={() => choosePlan("Premium", 999)}>
          Premium ₹999
        </button>

        <button onClick={() => choosePlan("Pro", 1999)}>
          Pro ₹1999
        </button>

      </div>

      {plan && (
        <div>

          <h2>Selected: {plan}</h2>

          <h3>Amount: ₹{amount}</h3>

          <button onClick={startPayment}>
            Continue Payment
          </button>

        </div>
      )}

    </div>
  );
}
