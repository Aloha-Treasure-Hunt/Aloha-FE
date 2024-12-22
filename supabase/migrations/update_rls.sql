-- Drop existing profile policies
drop policy if exists "Users can insert their own profile" on public.profiles;
drop policy if exists "Users can view their own profile" on public.profiles;
drop policy if exists "Users can view team members' profiles" on public.profiles;

-- Updated profile policies
create policy "Users can insert their own profile during registration"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

create policy "Users can view their own profile"
  on public.profiles for select
  to authenticated
  using (
    id = auth.uid() OR
    team_id in (
      select team_id from public.profiles
      where id = auth.uid() AND team_id is not null
    )
  );

-- Update teams policies to allow joining during registration
create policy "Users can join teams during registration"
  on public.teams for select
  to authenticated
  using (true);

-- Allow service role to bypass RLS
alter table public.profiles enable row level security;
alter table public.teams enable row level security;
alter table public.scores enable row level security;

grant all privileges on all tables in schema public to service_role; 

-- Drop existing team policies
drop policy if exists "Teams are viewable by all authenticated users" on public.teams;
drop policy if exists "Teams can be created by authenticated users" on public.teams;
drop policy if exists "Teams can be updated by team members" on public.teams;

-- Create new team policies
create policy "Anyone can create teams during registration"
  on public.teams for insert
  to authenticated
  with check (true);

create policy "Teams are viewable by all"
  on public.teams for select
  using (true);

create policy "Team members can update their team"
  on public.teams for update
  using (
    exists (
      select 1 from public.profiles
      where profiles.team_id = teams.id
      and profiles.id = auth.uid()
    )
  );

-- Update profile policies
drop policy if exists "Users can insert their own profile" on public.profiles;

create policy "Users can create their profile during registration"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

create policy "Users can view profiles"
  on public.profiles for select
  using (true);