"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function FileUpload({ workType }) {

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  async function uploadFile() {

    if (!file) {
      setMessage("Please select a file");
      return;
    }

    const filePath = `${workType}/${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("omni-work-files")
      .upload(filePath, file);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("File uploaded successfully");
  }


  return (
    <div>

      <input
        type="file"
        onChange={(e)=>setFile(e.target.files[0])}
      />

      <button onClick={uploadFile}>
        Upload File
      </button>

      <p>
        {message}
      </p>

    </div>
  );
}
