"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/browser";

export default function ResetPasswordPage() {
  const supabase = createClient();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setMessage("");
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (updateError) { setError(updateError.message); return; }
    setMessage("Password updated successfully. You can now log in.");
  }

  return <main className="auth-page"><section className="card auth-card"><h1>Choose a new password</h1><form onSubmit={handleSubmit} className="form-stack"><label>New password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" /></label>{error && <p className="error">{error}</p>}{message && <p className="success">{message}</p>}<button className="button" type="submit" disabled={loading}>{loading ? "Updating…" : "Update password"}</button></form><div className="auth-links"><Link href="/login">Go to login</Link></div></section></main>;
}
