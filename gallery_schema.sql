-- Add to your Supabase SQL Editor to create the gallery table
CREATE TABLE gallery (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  category text NOT NULL DEFAULT 'REPAIR', -- 'REPAIR', 'MAINTENANCE', 'FACILITY', 'CONSTRUCTION', 'BEFORE_AFTER', 'OTHERS'
  description text,
  image_url text NOT NULL,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery DISABLE ROW LEVEL SECURITY;

-- Enable realtime for gallery
alter publication supabase_realtime add table gallery;
