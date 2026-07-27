"use client";

import { useState } from "react";

export default function SubscriptionPage() {

  const [plan, setPlan] = useState("");


  function choosePlan(selectedPlan) {
    setPlan(selectedPlan);
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

            <button>
              Continue Payment
            </button>

          </div>
        )
      }


    </div>
  );
}
