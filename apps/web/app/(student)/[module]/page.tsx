import { notFound } from "next/navigation";
import { requireProfile } from "@/lib/auth/server";

const modules: Record<string, { title: string; description: string }> = {
  pyq: { title: "PYQ Practice", description: "Previous-year question practice will be implemented in the next feature phase." },
  mains: { title: "Mains Answer Writing", description: "Answer writing and handwritten evaluation will be implemented in the next feature phase." },
  prelims: { title: "Prelims", description: "Prelims test engine will be implemented in the next feature phase." },
  csat: { title: "CSAT", description: "CSAT practice will be implemented in the next feature phase." },
  "current-affairs": { title: "Current Affairs", description: "Current affairs workflows will be implemented in the next feature phase." },
  "study-material": { title: "Study Material", description: "Study material library will be implemented in the next feature phase." },
  revision: { title: "Revision", description: "Revision workflows will be implemented in the next feature phase." },
  performance: { title: "Performance", description: "Performance analytics will be implemented in the next feature phase." },
  groups: { title: "Groups", description: "Study groups will be implemented in the next feature phase." },
  leaderboard: { title: "Leaderboard", description: "Leaderboard will be implemented in the next feature phase." },
  notifications: { title: "Notifications", description: "Notifications will be implemented in the next feature phase." }
};

export default async function StudentModulePage({ params }: { params: Promise<{ module: string }> }) {
  await requireProfile();
  const { module } = await params;
  const item = modules[module];
  if (!item) notFound();

  return <section><div className="card phase-card"><span className="eyebrow">Web Phase 1</span><h1>{item.title}</h1><p className="muted">{item.description}</p><p>This route is wired now so navigation and the API architecture are ready for feature implementation.</p></div></section>;
}
