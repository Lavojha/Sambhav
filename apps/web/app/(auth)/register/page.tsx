"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerSchema } from "@sambhav/validation";
import { createClient } from "@/lib/supabase/browser";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const parsed = registerSchema.safeParse({ fullName, email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form.");
      return;
    }
    setLoading(true);
    const { data, error: authError } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: { data: { full_name: parsed.data.fullName } }
    });
    setLoading(false);
    if (authError) {
      setError(authError.message);
      return;
    }
    if (data.session) {
      router.replace("/dashboard");
      router.refresh();
      return;
    }
    router.replace("/login?registered=1");
  }

  return (
    <main className="auth-page">
      <section className="card auth-card">
        <span className="eyebrow">SAMBHAV UPSC</span>
        <h1>Create account</h1>
        <p className="muted">Start your UPSC preparation workspace.</p>
        <form onSubmit={handleSubmit} className="form-stack">
          <label>Full name<input value={fullName} onChange={(e) => setFullName(e.target.value)} autoComplete="name" /></label>
          <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" /></label>
          <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" /></label>
          {error && <p className="error">{error}</p>}
          <button className="button" type="submit" disabled={loading}>{loading ? "Creating…" : "Create account"}</button>
        </form>
        <div className="auth-links"><Link href="/login">Already have an account?</Link></div>
      </section>
    </main>
  );
}
