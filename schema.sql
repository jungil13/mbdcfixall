-- 1. Create the blogs table
CREATE TABLE blogs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  subheading text,
  body text NOT NULL,
  image_url text,
  likes int DEFAULT 0,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- 2. Create the blog comments table
CREATE TABLE blog_comments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id uuid REFERENCES blogs(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- 3. Create the team members table
CREATE TABLE team_members (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  role text NOT NULL,
  image_url text,
  order_index int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- 4. Create the dynamic services table
CREATE TABLE services (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  category text NOT NULL, -- 'CONSTRUCTION' or 'SERVICES'
  title text NOT NULL,
  description text NOT NULL,
  items text[] DEFAULT '{}',
  image_url text,
  icon_name text, -- e.g., 'Home', 'Building2', 'HardHat'
  created_at timestamptz DEFAULT now()
);

-- 4b. Create the inquiries table
CREATE TABLE inquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  service text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- 5. Set up Realtime for inquiries (for the Admin Bell Notification)
-- Ensure 'inquiries' is added to the realtime publication so the bell icon updates instantly.
alter publication supabase_realtime add table inquiries;

-- 6. Create Storage Bucket for images
insert into storage.buckets (id, name, public) 
values ('mightybee-assets', 'mightybee-assets', true);

-- Allow public read access to the bucket
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'mightybee-assets' );

-- Allow authenticated admins to insert/update/delete objects
create policy "Admin Insert"
on storage.objects for insert
with check ( bucket_id = 'mightybee-assets' and auth.role() = 'authenticated' );

create policy "Admin Update"
on storage.objects for update
using ( bucket_id = 'mightybee-assets' and auth.role() = 'authenticated' );

create policy "Admin Delete"
on storage.objects for delete
using ( bucket_id = 'mightybee-assets' and auth.role() = 'authenticated' );

-- 7. Disable RLS for public read/write on the tables (since this is a simple prototype, we allow public reads for the site, and public inserts for comments/inquiries. Admin routes will be protected by Next.js middleware rather than strict DB RLS for now).
-- If RLS is enabled by default in your project, disable it for these tables so the public site can fetch data without authentication.
ALTER TABLE blogs DISABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments DISABLE ROW LEVEL SECURITY;
ALTER TABLE team_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE services DISABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries DISABLE ROW LEVEL SECURITY;

