import { AppShell } from "@/components/layout/app-shell";
import { requireProfile } from "@/lib/auth/server";

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const profile = await requireProfile();
  if (profile.status !== "active") {
    return <main className="auth-page"><section className="card narrow"><h1>Account suspended</h1><p>Your account is currently suspended. Please contact the administrator.</p></section></main>;
  }
  return <AppShell profile={profile}>{children}</AppShell>;
}
