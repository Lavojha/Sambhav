"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginSchema } from "@sambhav/validation";
import { createClient } from "@/lib/supabase/browser";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please enter valid credentials.");
      return;
    }
    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword(parsed.data);
    setLoading(false);
    if (authError) {
      setError(authError.message);
      return;
    }
    router.replace("/dashboard");
    router.refresh();
  }

  return (
    <main className="auth-page">
      <section className="card auth-card">
        <span className="eyebrow">SAMBHAV UPSC</span>
        <h1>Welcome back</h1>
        <p className="muted">Login to continue your preparation.</p>
        <form onSubmit={handleSubmit} className="form-stack">
          <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" /></label>
          <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" /></label>
          {error && <p className="error">{error}</p>}
          <button className="button" type="submit" disabled={loading}>{loading ? "Logging in…" : "Login"}</button>
        </form>
        <div className="auth-links"><Link href="/forgot-password">Forgot password?</Link><Link href="/register">Create account</Link></div>
      </section>
    </main>
  );
}
