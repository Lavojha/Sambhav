import { z } from "zod";

export const profileResponseSchema = z.object({
  id: z.string().uuid(),
  full_name: z.string(),
  email: z.string().email(),
  role: z.enum(["student", "admin"]),
  status: z.enum(["active", "suspended"]),
  avatar_url: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string()
});

export const profileApiResponseSchema = z.object({
  success: z.literal(true),
  data: profileResponseSchema
});

export type ProfileResponse = z.infer<typeof profileResponseSchema>;
