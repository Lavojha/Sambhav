import Link from "next/link";

const cards = [
  ["Users", "/admin/users", "User administration foundation."],
  ["PYQ", "/admin/pyq", "PYQ content administration foundation."],
  ["Materials", "/admin/materials", "Study material administration foundation."],
  ["Current Affairs", "/admin/current-affairs", "Current affairs administration foundation."]
] as const;

export default function AdminDashboardPage() {
  return <section><div className="page-header"><div><span className="eyebrow">Admin</span><h1>Admin dashboard</h1><p className="muted">Admin-only routes are protected server-side.</p></div></div><div className="grid cards-grid">{cards.map(([title,href,description])=><Link key={href} href={href} className="card module-card"><h2>{title}</h2><p className="muted">{description}</p></Link>)}</div></section>;
}
