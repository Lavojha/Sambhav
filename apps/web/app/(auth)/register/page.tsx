"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name
        }
      }
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/login");
  }

  return (
    <main>
      <h1>Create Account</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Full name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength={8}
          required
        />

        {error && <p>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
    </main>
  );
}
