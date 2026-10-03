import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth/server";

const sections: Record<string, string> = {
  users: "User administration foundation.",
  pyq: "PYQ content administration foundation.",
  materials: "Study material administration foundation.",
  "current-affairs": "Current affairs administration foundation.",
  groups: "Group administration foundation.",
  notifications: "Notification administration foundation.",
  tests: "Test administration foundation.",
  "ai-logs": "AI evaluation log administration foundation."
};

export default async function AdminSectionPage({ params }: { params: Promise<{ section: string }> }) {
  await requireAdmin();
  const { section } = await params;
  const description = sections[section];
  if (!description) notFound();
  return <section><div className="card phase-card"><span className="eyebrow">Admin module</span><h1>{section.replace(/-/g, " ")}</h1><p className="muted">{description}</p><p>Admin authorization is enforced server-side. CRUD workflows will be added in the corresponding feature phase.</p></div></section>;
}
