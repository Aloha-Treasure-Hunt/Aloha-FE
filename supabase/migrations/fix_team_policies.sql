-- First, drop all existing team policies to start clean
drop policy if exists "Teams are viewable by all authenticated users" on public.teams;
drop policy if exists "Teams can be created by authenticated users" on public.teams;
drop policy if exists "Teams can be updated by team members" on public.teams;
drop policy if exists "Anyone can create teams during registration" on public.teams;
drop policy if exists "Teams are viewable by all" on public.teams;
drop policy if exists "Team members can update their team" on public.teams;
drop policy if exists "Users can create teams during registration" on public.teams;

-- Create simplified policies
create policy "teams_select_policy" 
  on public.teams for select 
  using (true);  -- Anyone can view teams

create policy "teams_insert_policy" 
  on public.teams for insert 
  with check (true);  -- Anyone authenticated can create teams

create policy "teams_update_policy" 
  on public.teams for update 
  using (
    auth.uid() = created_by or  -- Team creator can update
    exists (
      select 1 from public.profiles
      where profiles.team_id = teams.id
      and profiles.id = auth.uid()
    )  -- Team members can update
  ); 