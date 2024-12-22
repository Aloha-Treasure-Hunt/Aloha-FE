-- First, temporarily disable RLS to fix any existing issues
alter table public.profiles disable row level security;

-- Drop all existing profile policies
drop policy if exists "profiles_insert_policy" on public.profiles;
drop policy if exists "profiles_select_policy" on public.profiles;
drop policy if exists "profiles_update_policy" on public.profiles;

-- Create new simplified policies
create policy "allow_insert_own_profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "allow_read_own_and_team_profiles"
  on public.profiles for select
  using (
    auth.uid() = id or  -- Can read own profile
    team_id in (        -- Can read team members' profiles
      select p.team_id 
      from public.profiles p 
      where p.id = auth.uid()
    )
  );

create policy "allow_update_own_profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Re-enable RLS
alter table public.profiles enable row level security;

-- Ensure public access is restricted
revoke all on public.profiles from anon;
revoke all on public.profiles from authenticated;

-- Grant specific permissions
grant select, insert, update on public.profiles to authenticated; 