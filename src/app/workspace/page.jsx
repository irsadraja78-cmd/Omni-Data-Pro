"use client";

export default function WorkspacePage() {

  const workCategories = [
    {
      name: "Basic Data Entry",
      description: "Basic data filling work"
    },
    {
      name: "Excel Data",
      description: "Excel sheet related work"
    },
    {
      name: "Typing Data",
      description: "Typing and document work"
    },
    {
      name: "Copy Paste",
      description: "Copy paste based tasks"
    },
    {
      name: "Medical Data",
      description: "Medical data processing work"
    },
    {
      name: "Other Data Work",
      description: "Other available tasks"
    }
  ];

  return (
    <div>
      <h1>
        Freelancer Workspace
      </h1>

      <p>
        Select your work category
      </p>

      <div>
        {workCategories.map((work, index) => (
          <div key={index}>

            <h2>
              {work.name}
            </h2>

            <p>
              {work.description}
            </p>

            <button>
              Open Work
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}
