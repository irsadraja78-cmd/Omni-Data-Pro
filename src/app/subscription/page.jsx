"use client";

import { useState } from "react";

export default function SubscriptionPage() {
  const [plan, setPlan] = useState("");

  function choosePlan(selectedPlan) {
    setPlan(selectedPlan);
  }

  async function startPayment() {
    const response = await fetch(
      "/api/create-payment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: 999,
          plan: plan
        })
      }
    );

    const data = await response.json();
    console.log(data);
  }

  return (
    <div>
      <h1>
        Choose Subscription Plan
      </h1>

      <div>
        <button onClick={() => choosePlan("Basic")}>
          Basic Plan
        </button>

        <button onClick={() => choosePlan("Premium")}>
          Premium Plan
        </button>

        <button onClick={() => choosePlan("Pro")}>
          Pro Plan
        </button>
      </div>

      {
        plan && (
          <div>
            <h2>
              Selected: {plan}
            </h2>

            <button onClick={startPayment}>
              Continue Payment
            </button>
          </div>
        )
      }
    </div>
  );
}
