import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <main>
      <h1>Dashboard</h1>

      <p>
        Welcome, {user?.user_metadata?.full_name ?? user?.email}
      </p>
    </main>
  );
}
