-- Phase 1 security hardening. Keep earlier migrations immutable.

create or replace function public.get_my_role()
returns public.user_role
language sql
security definer
stable
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

revoke all on function public.get_my_role() from public;
grant execute on function public.get_my_role() to authenticated;

drop policy if exists "admins can view profiles" on public.profiles;

create policy "admins can view profiles"
on public.profiles
for select
to authenticated
using (public.get_my_role() = 'admin');

create or replace function public.update_my_profile(
  p_full_name text,
  p_avatar_url text
)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_profile public.profiles;
begin
  if auth.uid() is null then
    raise exception 'Unauthorized';
  end if;

  update public.profiles
  set full_name = p_full_name,
      avatar_url = p_avatar_url,
      updated_at = now()
  where id = auth.uid()
  returning * into updated_profile;

  if updated_profile.id is null then
    raise exception 'Profile not found';
  end if;

  return updated_profile;
end;
$$;

revoke all on function public.update_my_profile(text, text) from public;
grant execute on function public.update_my_profile(text, text) to authenticated;

drop policy if exists "users can update own profile" on public.profiles;
