create extension if not exists "pgcrypto";

create type public.user_role as enum (
  'student',
  'admin'
);

create type public.account_status as enum (
  'active',
  'suspended'
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,

  full_name text not null,
  email text not null,

  role public.user_role not null default 'student',
  status public.account_status not null default 'active',

  avatar_url text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);




create index profiles_role_idx
on public.profiles(role);

create index profiles_status_idx
on public.profiles(status);


create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

