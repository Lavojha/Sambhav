"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";
import type { Profile } from "@sambhav/types";

const studentLinks = [
  ["Dashboard", "/dashboard"],["PYQ", "/pyq"],["Mains", "/mains"],["Prelims", "/prelims"],
  ["CSAT", "/csat"],["Current Affairs", "/current-affairs"],["Study Material", "/study-material"],
  ["Revision", "/revision"],["Performance", "/performance"],["Profile", "/profile"]
] as const;

export function AppShell({ profile, children }: { profile: Profile; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link href="/dashboard" className="brand">SAMBHAV UPSC</Link>
        <div className="topbar-user">
          <span>{profile.full_name || profile.email}</span>
          <button onClick={logout} className="button secondary">Logout</button>
        </div>
      </header>
      <div className="app-body">
        <aside className="sidebar">
          <nav>
            {studentLinks.map(([label, href]) => (
              <Link key={href} href={href} className={pathname === href ? "nav-link active" : "nav-link"}>{label}</Link>
            ))}
            {profile.role === "admin" && (
              <Link href="/admin/dashboard" className={pathname.startsWith("/admin") ? "nav-link active" : "nav-link"}>Admin</Link>
            )}
          </nav>
        </aside>
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
