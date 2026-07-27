"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    country: "",
    skills: "",
    experience: "",
    bio: ""
  });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setProfile({
        full_name: data.full_name || "",
        phone: data.phone || "",
        country: data.country || "",
        skills: data.skills || "",
        experience: data.experience || "",
        bio: data.bio || ""
      });
    }
  }

  async function saveProfile() {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        ...profile
      });

    alert("Profile Saved Successfully");
  }

  return (
    <div>

      <h1>My Profile</h1>

      <input
        placeholder="Full Name"
        value={profile.full_name}
        onChange={(e)=>setProfile({...profile, full_name:e.target.value})}
      />

      <input
        placeholder="Phone Number"
        value={profile.phone}
        onChange={(e)=>setProfile({...profile, phone:e.target.value})}
      />

      <input
        placeholder="Country"
        value={profile.country}
        onChange={(e)=>setProfile({...profile, country:e.target.value})}
      />

      <input
        placeholder="Skills"
        value={profile.skills}
        onChange={(e)=>setProfile({...profile, skills:e.target.value})}
      />

      <input
        placeholder="Experience"
        value={profile.experience}
        onChange={(e)=>setProfile({...profile, experience:e.target.value})}
      />

      <textarea
        placeholder="About Yourself"
        value={profile.bio}
        onChange={(e)=>setProfile({...profile, bio:e.target.value})}
      />

      <button onClick={saveProfile}>
        Save Profile
      </button>

    </div>
  );
}
