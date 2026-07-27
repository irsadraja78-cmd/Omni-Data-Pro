"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function FilesPage() {

  const [files, setFiles] = useState([]);

  useEffect(() => {
    loadFiles();
  }, []);


  async function loadFiles() {

    const { data, error } = await supabase
      .storage
      .from("omni-work-files")
      .list();


    if (!error) {
      setFiles(data);
    }

  }


  async function openFile(name) {

    const { data } = await supabase
      .storage
      .from("omni-work-files")
      .createSignedUrl(name, 3600);


    if (data?.signedUrl) {
      window.open(data.signedUrl, "_blank");
    }

  }


  return (
    <div>

      <h1>
        My Files
      </h1>


      {
        files.length === 0 ? (

          <p>
            No Files Found
          </p>

        ) : (

          files.map((file)=>(
            
            <div key={file.name}>

              <h3>
                {file.name}
              </h3>

              <button onClick={()=>openFile(file.name)}>
                Open File
              </button>

            </div>

          ))

        )
      }


    </div>
  );
}
