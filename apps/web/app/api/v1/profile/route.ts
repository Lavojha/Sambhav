import { NextResponse } from "next/server";
import { profileApiResponseSchema } from "@sambhav/api-contracts";
import { profileUpdateSchema } from "@sambhav/validation";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase.from("profiles").select("*").eq("id", authData.user.id).single();
  if (error || !data) return NextResponse.json({ success: false, error: "Profile not found" }, { status: 404 });

  const parsed = profileApiResponseSchema.safeParse({ success: true, data });
  if (!parsed.success) return NextResponse.json({ success: false, error: "Invalid profile response" }, { status: 500 });
  return NextResponse.json(parsed.data);
}

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 }); }

  const parsed = profileUpdateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ success: false, error: parsed.error.issues[0]?.message ?? "Invalid profile data" }, { status: 422 });

  const { data, error } = await supabase.rpc("update_my_profile", {
    p_full_name: parsed.data.fullName,
    p_avatar_url: parsed.data.avatarUrl || null
  });
  if (error || !data) return NextResponse.json({ success: false, error: error?.message ?? "Unable to update profile" }, { status: 500 });

  const response = profileApiResponseSchema.safeParse({ success: true, data });
  if (!response.success) return NextResponse.json({ success: false, error: "Invalid profile response" }, { status: 500 });
  return NextResponse.json(response.data);
}
