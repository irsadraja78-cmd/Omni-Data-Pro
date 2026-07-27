"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function MessagesPage() {

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");


  useEffect(() => {
    loadMessages();
  }, []);


  async function loadMessages() {

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: true });


    if (!error) {
      setMessages(data);
    }

  }


  async function sendMessage() {

    if (!text) return;


    const { data: { user } } =
      await supabase.auth.getUser();


    await supabase
      .from("messages")
      .insert({
        user_id: user.id,
        message: text,
        sender: "freelancer"
      });


    setText("");

    loadMessages();

  }


  return (
    <div>

      <h1>
        Messages
      </h1>


      {
        messages.map((msg)=>(
          
          <div key={msg.id}>

            <p>
              {msg.sender}: {msg.message}
            </p>

          </div>

        ))
      }


      <input
        value={text}
        onChange={(e)=>setText(e.target.value)}
        placeholder="Write message..."
      />


      <button onClick={sendMessage}>
        Send
      </button>


    </div>
  );
}
