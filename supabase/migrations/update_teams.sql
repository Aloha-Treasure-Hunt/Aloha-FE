-- Add created_by column to teams
alter table public.teams 
add column created_by uuid references auth.users(id);

-- Update teams policies
drop policy if exists "Anyone can create teams during registration" on public.teams;

create policy "Users can create teams during registration"
  on public.teams for insert
  to authenticated
  with check (created_by = auth.uid());

-- Ensure created_by is set for existing teams
update public.teams
set created_by = (
  select id 
  from profiles 
  where team_id = teams.id 
  limit 1
)
where created_by is null;

-- Make created_by not null for future entries
alter table public.teams
alter column created_by set not null; 