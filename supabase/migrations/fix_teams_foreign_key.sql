-- Drop the existing foreign key constraint
alter table public.teams
drop constraint if exists teams_created_by_fkey;

-- Add the new foreign key constraint with proper reference
alter table public.teams
add constraint teams_created_by_fkey
foreign key (created_by)
references auth.users(id)
on delete set null;  -- or 'cascade' depending on your needs

-- Update the created_by column to be nullable
alter table public.teams
alter column created_by drop not null; 