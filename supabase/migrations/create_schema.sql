-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create teams table
create table public.teams (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create profiles table (extends auth.users)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null unique,
  instagram_handle text,
  team_id uuid references public.teams(id),
  donation_amount decimal(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create scores table to track user/team progress
create table public.scores (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles(id) on delete cascade not null,
  team_id uuid references public.teams(id) on delete cascade,
  points integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(profile_id)
);

-- Create indexes
create index profiles_team_id_idx on public.profiles(team_id);
create index scores_profile_id_idx on public.scores(profile_id);
create index scores_team_id_idx on public.scores(team_id);

-- Update timestamps function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create updated_at triggers
create trigger handle_updated_at_teams
  before update on public.teams
  for each row
  execute function public.handle_updated_at();

create trigger handle_updated_at_profiles
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

create trigger handle_updated_at_scores
  before update on public.scores
  for each row
  execute function public.handle_updated_at();

-- Enable Row Level Security
alter table public.teams enable row level security;
alter table public.profiles enable row level security;
alter table public.scores enable row level security;

-- RLS Policies

-- Teams policies
create policy "Teams are viewable by all authenticated users"
  on public.teams for select
  to authenticated
  using (true);

create policy "Teams can be created by authenticated users"
  on public.teams for insert
  to authenticated
  with check (true);

create policy "Teams can be updated by team members"
  on public.teams for update
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.team_id = teams.id
      and profiles.id = auth.uid()
    )
  );

-- Profiles policies
create policy "Users can view their own profile"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

create policy "Users can view team members' profiles"
  on public.profiles for select
  to authenticated
  using (
    team_id in (
      select team_id from public.profiles
      where id = auth.uid()
    )
  );

create policy "Users can insert their own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id);

-- Scores policies
create policy "Scores are viewable by all authenticated users"
  on public.scores for select
  to authenticated
  using (true);

create policy "Users can insert their own scores"
  on public.scores for insert
  to authenticated
  with check (profile_id = auth.uid());

create policy "Users can update their own scores"
  on public.scores for update
  to authenticated
  using (profile_id = auth.uid());

-- Create storage bucket for user uploads
insert into storage.buckets (id, name, public) 
values ('user-content', 'user-content', false);

-- Storage bucket policy
create policy "User content is accessible by authenticated users"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'user-content');

create policy "Users can upload their own content"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'user-content' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Function to create initial score record
create or replace function public.handle_new_profile()
returns trigger as $$
begin
  insert into public.scores (profile_id, team_id)
  values (new.id, new.team_id);
  return new;
end;
$$ language plpgsql;

-- Trigger to create score record when profile is created
create trigger on_profile_created
  after insert on public.profiles
  for each row
  execute function public.handle_new_profile(); 