import { requireProfile } from "@/lib/auth/server";
import { ProfileForm } from "@/components/profile/profile-form";

export default async function ProfilePage() {
  const profile = await requireProfile();
  return <section><div className="page-header"><div><span className="eyebrow">Account</span><h1>Profile</h1><p className="muted">Manage the fields that you are allowed to change.</p></div></div><ProfileForm profile={profile} /></section>;
}
