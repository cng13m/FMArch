# Setup Instructions

This guide will help you set up the admin dashboard for your architecture portfolio website.

## Prerequisites

- Node.js 18+ and pnpm (or npm/yarn)
- A Supabase account (free tier works fine)

## Step 1: Install Dependencies

```bash
pnpm install
```

## Step 2: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be fully provisioned
3. Go to **Settings** → **API** to get your credentials:
   - Project URL
   - `anon` `public` key
   - `service_role` `secret` key (keep this secret!)

## Step 3: Create Database Tables

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `supabase-schema.sql`
3. Click **Run** to execute the SQL

This will create:
- `projects` table for storing project data
- `content` table for global content (hero text, about text, etc.)
- `contact_info` table for contact information
- Row Level Security (RLS) policies for public read access

## Step 4: Set Up Storage Bucket

1. In Supabase dashboard, go to **Storage**
2. Click **Create a new bucket**
3. Name it `images`
4. Make it **Public** (so images can be accessed via URL)
5. Click **Create bucket**

## Step 5: Configure Environment Variables

1. Copy `env.example` to `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

3. Set your admin credentials:
   ```env
   ADMIN_EMAIL=your-email@example.com
   ADMIN_PASSWORD=your-secure-password
   ```

4. Generate a session secret (use a random 32+ character string):
   ```env
   SESSION_SECRET=your_random_32_character_string_here
   ```
   
   You can generate one using:
   ```bash
   openssl rand -base64 32
   ```

## Step 6: Run the Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000` to see your site.

## Step 7: Access the Admin Dashboard

1. Click the **Login** button in the header
2. Enter your admin email and password
3. You'll be redirected to `/admin` where you can:
   - Add, edit, delete, and reorder projects
   - Upload project images
   - Edit global content (hero text, about text)
   - Update contact information

## Features

### Projects Management
- **Create Projects**: Add new projects with title, description, images, etc.
- **Edit Projects**: Update any project details
- **Delete Projects**: Remove projects you no longer want to display
- **Reorder Projects**: Use the up/down arrows to change project display order
- **Image Upload**: Upload cover images and gallery images (stored in Supabase Storage)

### Content Management
- **Home Page**: Edit hero text and subtitle
- **About Page**: Edit the about section text

### Contact Management
- **Contact Info**: Update name, email, location
- **Social Links**: Add LinkedIn, Instagram, Twitter, Facebook links

## Security Notes

- The `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS and should **never** be exposed to the client
- The `SESSION_SECRET` should be a strong random string
- Change the default admin password immediately
- In production, use environment variables and never commit `.env.local` to git

## Troubleshooting

### Images not uploading?
- Make sure the `images` bucket exists in Supabase Storage
- Verify the bucket is set to **Public**
- Check that `SUPABASE_SERVICE_ROLE_KEY` is correct

### Can't log in?
- Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env.local`
- Make sure the server has been restarted after changing env variables

### Database errors?
- Ensure you've run the SQL schema in Supabase
- Check that RLS policies are set up correctly
- Verify your Supabase credentials are correct

## Production Deployment

1. Set all environment variables in your hosting platform (Vercel, Netlify, etc.)
2. Make sure `SESSION_SECRET` is a strong random string
3. Ensure `SUPABASE_SERVICE_ROLE_KEY` is kept secret
4. Build and deploy:
   ```bash
   pnpm build
   pnpm start
   ```

