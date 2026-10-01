export type UserRole = "student" | "admin";

export type AccountStatus = "active" | "suspended";

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  status: AccountStatus;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}
