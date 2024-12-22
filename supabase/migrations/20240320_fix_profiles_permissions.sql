-- First, drop all existing profile policies
drop policy if exists "profiles_insert_policy" on public.profiles;
drop policy if exists "profiles_select_policy" on public.profiles;
drop policy if exists "profiles_update_policy" on public.profiles;
drop policy if exists "allow_insert_own_profile" on public.profiles;
drop policy if exists "allow_read_own_and_team_profiles" on public.profiles;
drop policy if exists "allow_update_own_profile" on public.profiles;

-- Temporarily disable RLS to clean up any inconsistencies
alter table public.profiles disable row level security;

-- Ensure proper relationship with auth.users
alter table public.profiles
drop constraint if exists profiles_id_fkey,
add constraint profiles_id_fkey
  foreign key (id)
  references auth.users(id)
  on delete cascade;

-- Create new RLS policies
create policy "enable_insert_for_registration"
  on public.profiles for insert
  to authenticated
  with check (
    auth.uid() = id and  -- User can only insert their own profile
    exists (             -- Ensure user exists in auth.users
      select 1
      from auth.users
      where auth.users.id = profiles.id
    )
  );

create policy "enable_select_for_user_and_team"
  on public.profiles for select
  to authenticated
  using (
    auth.uid() = id or                    -- User can read own profile
    exists (                              -- User can read team members' profiles
      select 1
      from public.profiles as p
      where p.id = auth.uid()
      and p.team_id is not null
      and p.team_id = profiles.team_id
    )
  );

create policy "enable_update_for_own_profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Re-enable RLS
alter table public.profiles enable row level security;

-- Revoke and grant proper permissions
revoke all on public.profiles from anon;
revoke all on public.profiles from authenticated;

grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;

-- Create index for performance
create index if not exists profiles_auth_id_idx on public.profiles(id);
create index if not exists profiles_team_lookup_idx on public.profiles(team_id) where team_id is not null; 