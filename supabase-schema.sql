-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  year TEXT,
  location TEXT,
  description TEXT,
  category TEXT,
  cover_image TEXT,
  gallery TEXT[], -- Array of image URLs
  client TEXT,
  tags TEXT[], -- Array of tags/categories
  display_order INTEGER DEFAULT 0, -- For reordering projects
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create content table for global content
CREATE TABLE IF NOT EXISTS content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL, -- e.g., 'homeHeroText', 'aboutText', etc.
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_info table
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  location TEXT,
  social_links JSONB, -- Store social media links as JSON
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON projects(display_order);
CREATE INDEX IF NOT EXISTS idx_content_key ON content(key);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public read access for projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Public read access for content" ON content
  FOR SELECT USING (true);

CREATE POLICY "Public read access for contact_info" ON contact_info
  FOR SELECT USING (true);

-- Note: Insert/Update/Delete operations will be handled server-side with service role key
-- which bypasses RLS. This is safe because we have authentication in place.

-- Insert default content
INSERT INTO content (key, value) VALUES
  ('homeHeroText', 'Architectural Vision & Design'),
  ('homeSubText', 'Portfolio of Fjolle Murtezi'),
  ('homeHeroImage', '/modern-architecture-building-facade-minimalist-bla.jpg'),
  ('homeAboutImage', '/architect-working-on-blueprints-studio.jpg'),
  ('aboutImage', '/architect-working-on-blueprints-studio.jpg'),
  ('aboutText', 'Fjolle Murtezi – architect focused on sustainable architecture, interior design, and architectural visualization.'),
  ('services', '[{"number":"01","title":"Architectural Design","description":"Complete architectural solutions from concept to construction, with a focus on sustainable and innovative design."},{"number":"02","title":"Interior Design","description":"Creating harmonious interior spaces that reflect your personality while maximizing functionality and comfort."},{"number":"03","title":"3D Visualization","description":"Photorealistic renderings and animations that bring your project to life before construction begins."}]')
ON CONFLICT (key) DO NOTHING;

-- Insert default contact info
INSERT INTO contact_info (name, email, location, social_links) VALUES
  ('Fjolle Murtezi', 'fjollemurtezi123@gmail.com', 'Prishtina, Kosovo', '{}'::jsonb)
ON CONFLICT DO NOTHING;

