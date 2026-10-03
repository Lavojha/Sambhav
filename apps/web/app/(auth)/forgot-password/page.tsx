"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/browser";

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(""); setMessage(""); setLoading(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/confirm`
    });
    setLoading(false);
    if (resetError) { setError(resetError.message); return; }
    setMessage("If an account exists for this email, a password reset link has been sent.");
  }

  return
   <main className="auth-page">
   <section className="card auth-card">
   <h1>Reset password</h1>
   <p className="muted">Enter your account email and we’ll send a reset link.</p>
   <form onSubmit={handleSubmit} className="form-stack">
   <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
   </label>{error && <p className="error">{error}</p>
   }{message && 
   <p className="success">{message}</p>}
   <button className="button" type="submit" disabled={loading}>{loading ? "Sending…" : "Send reset link"}</button>
   </form>
   <div className="auth-links">
   <Link href="/login">Back to login</Link>
   </div>
   </section>
   </main>;
}
