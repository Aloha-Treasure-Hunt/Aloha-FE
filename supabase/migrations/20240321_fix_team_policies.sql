-- Drop existing policies
drop policy if exists "Teams are viewable by all authenticated users" on public.teams;

-- Create new policies
create policy "allow_read_teams"
  on public.teams for select
  to authenticated
  using (true);

create policy "allow_create_teams"
  on public.teams for insert
  to authenticated
  with check (auth.uid() = created_by);

-- Enable RLS if not already enabled
alter table public.teams enable row level security;

-- Grant necessary permissions
grant select on public.teams to authenticated;
grant insert on public.teams to authenticated; 