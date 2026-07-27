-- Add to your Supabase SQL Editor to create the projects table
CREATE TABLE projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  subtitle text,
  description text NOT NULL,
  image_url text,
  category text NOT NULL DEFAULT 'CONSTRUCTION',
  location text,
  year text,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects DISABLE ROW LEVEL SECURITY;

-- Enable realtime for projects
alter publication supabase_realtime add table projects;
