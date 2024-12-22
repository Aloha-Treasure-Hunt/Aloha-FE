-- 1. First, ensure proper auth configuration
create or replace function public.handle_new_user()
returns trigger as $$
begin
  -- Only create profile if it doesn't exist
  if not exists (select 1 from public.profiles where id = new.id) then
    insert into public.profiles (
      id,
      email,
      name,
      instagram_handle,
      donation_amount
    )
    values (
      new.id,
      new.email,
      coalesce(new.raw_user_meta_data->>'name', 'Anonymous'),
      new.raw_user_meta_data->>'instagram_handle',
      coalesce((new.raw_user_meta_data->>'donation_amount')::decimal, 0.00)
    );
  end if;
  return new;
end;
$$ language plpgsql security definer;

-- Drop if exists and recreate the trigger
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. Storage bucket setup
-- Drop existing bucket if it exists
do $$
begin
  if exists (select from storage.buckets where id = 'user-content') then
    delete from storage.buckets where id = 'user-content';
  end if;
end $$;

-- Create storage bucket with proper configuration
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'user-content',
  'user-content',
  false,
  5242880, -- 5MB limit
  array['image/jpeg', 'image/png', 'image/gif']
);

-- 3. Fix permissions and policies

-- Drop ALL existing storage policies
do $$
declare
  policy_name text;
begin
  for policy_name in (
    select policyname from pg_policies 
    where tablename = 'objects' 
    and schemaname = 'storage'
  )
  loop
    execute format('drop policy if exists %I on storage.objects', policy_name);
  end loop;
end $$;

-- Create function to extract first path segment
create or replace function storage.get_path_segment(path text, segment_number integer)
returns text language sql as $$
  select split_part(path, '/', segment_number);
$$;

-- Create new storage policies
create policy "storage_select_policy_new"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'user-content' and
    (auth.uid() = owner or
     exists (
       select 1 from public.profiles p
       where p.id = auth.uid()
       and p.team_id = (
         select team_id from public.profiles
         where id = cast(storage.get_path_segment(name, 1) as uuid)
       )
     ))
  );

create policy "storage_insert_policy_new"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'user-content' and
    owner = auth.uid() and
    storage.get_path_segment(name, 1) = auth.uid()::text
  );

-- 4. Fix profile table permissions
alter table public.profiles disable row level security;

-- Drop existing profile policies
drop policy if exists "profiles_insert_policy" on public.profiles;
drop policy if exists "profiles_select_policy" on public.profiles;
drop policy if exists "profiles_update_policy" on public.profiles;

-- Create new profile policies
create policy "profiles_select_policy" 
  on public.profiles for select 
  to authenticated 
  using (
    id = auth.uid() or
    team_id in (
      select team_id from public.profiles
      where id = auth.uid() and team_id is not null
    )
  );

create policy "profiles_insert_policy" 
  on public.profiles for insert 
  to authenticated 
  with check (
    id = auth.uid() or
    auth.role() = 'service_role'
  );

create policy "profiles_update_policy" 
  on public.profiles for update 
  to authenticated 
  using (id = auth.uid());

-- 5. Grant necessary permissions
grant usage on schema public to anon, authenticated;
grant usage on schema storage to anon, authenticated;

-- Table permissions
grant all on public.profiles to service_role;
grant all on public.teams to service_role;
grant all on public.scores to service_role;

grant select, insert, update on public.profiles to authenticated;
grant select, insert, update on public.teams to authenticated;
grant select, insert, update on public.scores to authenticated;

-- Storage permissions
grant all on storage.objects to service_role;
grant select, insert on storage.objects to authenticated;

-- 6. Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.teams enable row level security;
alter table public.scores enable row level security;

-- 7. Create necessary indexes
create index if not exists profiles_team_id_idx on public.profiles(team_id);
create index if not exists profiles_user_id_idx on public.profiles(id);
create index if not exists teams_created_by_idx on public.teams(created_by);

-- 8. Ensure proper cascading
alter table public.profiles
  drop constraint if exists profiles_id_fkey,
  add constraint profiles_id_fkey
    foreign key (id)
    references auth.users(id)
    on delete cascade;

alter table public.profiles
  drop constraint if exists profiles_team_id_fkey,
  add constraint profiles_team_id_fkey
    foreign key (team_id)
    references public.teams(id)
    on delete set null;

-- 9. Add function to handle profile updates
create or replace function public.handle_profile_update()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for profile updates
drop trigger if exists on_profile_updated on public.profiles;
create trigger on_profile_updated
  before update on public.profiles
  for each row execute function public.handle_profile_update();