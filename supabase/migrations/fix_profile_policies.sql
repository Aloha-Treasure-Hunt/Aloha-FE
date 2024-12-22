-- First, drop existing profile policies
drop policy if exists "Users can insert their own profile" on public.profiles;
drop policy if exists "Users can insert their own profile during registration" on public.profiles;
drop policy if exists "Users can create their profile during registration" on public.profiles;
drop policy if exists "Users can view their own profile" on public.profiles;
drop policy if exists "Users can view team members' profiles" on public.profiles;
drop policy if exists "Users can view profiles" on public.profiles;

-- Create new profile policies
create policy "profiles_insert_policy" 
  on public.profiles for insert 
  with check (
    -- Allow service role or matching user id
    (auth.jwt()->>'role' = 'service_role') or
    (auth.uid() = id)
  );

create policy "profiles_select_policy" 
  on public.profiles for select 
  using (
    -- Allow service role, own profile, or team member profiles
    (auth.jwt()->>'role' = 'service_role') or
    (auth.uid() = id) or
    (team_id in (
      select team_id from public.profiles
      where id = auth.uid() and team_id is not null
    ))
  );

create policy "profiles_update_policy" 
  on public.profiles for update 
  using (
    -- Allow service role or own profile
    (auth.jwt()->>'role' = 'service_role') or
    (auth.uid() = id)
  );

-- Ensure RLS is enabled
alter table public.profiles enable row level security;

-- Grant necessary permissions to service role
grant all privileges on table public.profiles to service_role; 