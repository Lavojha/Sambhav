import Link from "next/link";
import { requireProfile } from "@/lib/auth/server";

const modules = [
  ["PYQ Practice", "Practice previous-year questions.", "/pyq"],
  ["Mains Answer Writing", "Write structured UPSC Mains answers.", "/mains"],
  ["Prelims", "Build objective-question practice.", "/prelims"],
  ["CSAT", "Practice aptitude and comprehension.", "/csat"],
  ["Current Affairs", "Keep your preparation organised.", "/current-affairs"],
  ["Revision", "Turn preparation into repeatable revision.", "/revision"]
] as const;

export default async function DashboardPage() {
  const profile = await requireProfile();
  return (
    <section>
      <div className="page-header">
        <div><span className="eyebrow">Student workspace</span><h1>Dashboard</h1><p className="muted">Welcome back, {profile.full_name || profile.email}.</p></div>
      </div>
      <div className="grid cards-grid">
        {modules.map(([title, description, href]) => (
          <Link href={href} className="card module-card" key={href}>
            <h2>{title}</h2><p className="muted">{description}</p><span className="text-link">Open →</span>
          </Link>
        ))}
      </div>
      <section className="card phase-card">
        <h2>Phase 1 foundation is ready</h2>
        <p className="muted">Authentication, protected routes, profile management, API versioning, Supabase RLS hardening and the web application shell are in place.</p>
      </section>
    </section>
  );
}
