# Deployment Guide for Vercel

This guide will help you deploy your updated architecture portfolio website with admin dashboard to Vercel.

## Prerequisites

- Your code is in a Git repository (GitHub, GitLab, or Bitbucket)
- A Vercel account (free tier works fine)
- Supabase project set up with database and storage

## Step 1: Update .gitignore

Make sure your `.gitignore` includes:
- `.env.local` (never commit environment variables!)
- `node_modules`
- `.next`
- Other build artifacts

## Step 2: Commit and Push Your Changes

If you haven't already, commit all your changes:

```bash
git add .
git commit -m "Add admin dashboard with Supabase integration"
git push
```

## Step 3: Configure Environment Variables in Vercel

1. Go to your Vercel project dashboard: https://vercel.com/cng4517-3384s-projects/fjollemurteziarch

2. Navigate to **Settings** → **Environment Variables**

3. Add the following environment variables:

   **Required Variables:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ADMIN_EMAIL=your_admin_email@example.com
   ADMIN_PASSWORD=your_secure_password
   SESSION_SECRET=your_random_32_character_string
   ```

   **Important Notes:**
   - Set these for **Production**, **Preview**, and **Development** environments
   - `SESSION_SECRET` should be a strong random string (32+ characters)
   - Never share your `SUPABASE_SERVICE_ROLE_KEY` publicly
   - Use different passwords for production vs development

4. Click **Save** after adding each variable

## Step 4: Redeploy

After adding environment variables:

1. Go to the **Deployments** tab
2. Click the **⋯** (three dots) menu on your latest deployment
3. Select **Redeploy**
4. Or push a new commit to trigger automatic deployment

## Step 5: Verify Deployment

1. Visit your deployed site
2. Check that the public pages load correctly
3. Try logging in with your admin credentials
4. Test the admin dashboard functionality

## Troubleshooting

### Build Errors

If you see build errors:

1. **Check Runtime Logs** in Vercel dashboard
2. **Verify Environment Variables** are set correctly
3. **Check Supabase Connection** - ensure URLs and keys are correct
4. **Review Build Logs** for specific error messages

### Common Issues

**"Missing environment variables"**
- Make sure all required env vars are set in Vercel
- Redeploy after adding variables

**"Supabase connection failed"**
- Verify `NEXT_PUBLIC_SUPABASE_URL` and keys are correct
- Check Supabase project is active

**"Authentication not working"**
- Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` match what you're using
- Check `SESSION_SECRET` is set (must be 32+ characters)

**"Image uploads failing"**
- Ensure Supabase Storage bucket `images` exists and is public
- Verify `SUPABASE_SERVICE_ROLE_KEY` is correct

### Manual Deployment via Vercel CLI (No Git Required)

You can deploy directly without Git! See `DEPLOY_DIRECT.md` for detailed instructions.

Quick steps:
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to preview
cd FjolleMurtezi-Arch
vercel

# Deploy to production
vercel --prod
```

**Important:** Set environment variables in Vercel dashboard before deploying!

## Post-Deployment Checklist

- [ ] Environment variables configured
- [ ] Site loads without errors
- [ ] Public pages display correctly
- [ ] Login works
- [ ] Admin dashboard accessible
- [ ] Can create/edit projects
- [ ] Image uploads work
- [ ] Content management works

## Security Reminders

- ✅ Never commit `.env.local` to git
- ✅ Use strong passwords for production
- ✅ Rotate `SESSION_SECRET` if compromised
- ✅ Keep `SUPABASE_SERVICE_ROLE_KEY` secret
- ✅ Use different credentials for dev/prod

## Need Help?

- Check Vercel documentation: https://vercel.com/docs
- Review Supabase docs: https://supabase.com/docs
- Check deployment logs in Vercel dashboard

