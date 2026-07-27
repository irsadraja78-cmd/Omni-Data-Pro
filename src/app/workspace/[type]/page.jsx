"use client";

import { useParams } from "next/navigation";

export default function WorksheetPage() {

  const params = useParams();

  const workType = params.type;

  return (
    <div>

      <h1>
        {workType} Worksheet
      </h1>

      <p>
        Freelancer Work Area
      </p>

      <div>
        <h2>
          Task Details
        </h2>

        <textarea
          placeholder="Enter your work data here..."
        />

      </div>

      <div>
        <h2>
          Upload File
        </h2>

        <input
          type="file"
        />
      </div>

      <button>
        Save Work
      </button>

    </div>
  );
}
