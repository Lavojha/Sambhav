"use client";

import { FormEvent, useState } from "react";
import type { Profile } from "@sambhav/types";
import { profileUpdateSchema } from "@sambhav/validation";

export function ProfileForm({ profile }: { profile: Profile }) {
  const [fullName, setFullName] = useState(profile.full_name);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url ?? "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(""); setError("");
    const parsed = profileUpdateSchema.safeParse({ fullName, avatarUrl });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Please check the form."); return; }

    setLoading(true);
    const response = await fetch("/api/v1/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data)
    });
    const result = await response.json();
    setLoading(false);

    if (!response.ok || !result.success) { setError(result.error ?? "Unable to update profile."); return; }
    setFullName(result.data.full_name);
    setAvatarUrl(result.data.avatar_url ?? "");
    setMessage("Profile updated successfully.");
  }

  return (
    <form onSubmit={handleSubmit} className="card form-stack">
      <label>Full name<input value={fullName} onChange={(e) => setFullName(e.target.value)} /></label>
      <label>Email<input value={profile.email} disabled /></label>
      <label>Avatar URL<input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://…" /></label>
      <div className="profile-meta"><span>Role: {profile.role}</span><span>Status: {profile.status}</span></div>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      <button className="button" type="submit" disabled={loading}>{loading ? "Saving…" : "Save changes"}</button>
    </form>
  );
}
