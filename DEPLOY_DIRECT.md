# Deploy Directly to Vercel (No Git Required)

This guide shows you how to deploy your project directly to Vercel using the CLI, without needing a Git repository.

## Step 1: Install Vercel CLI

Open PowerShell or Command Prompt and run:

```bash
npm install -g vercel
```

Or if you prefer using pnpm:

```bash
pnpm add -g vercel
```

## Step 2: Navigate to Your Project

```bash
cd FjolleMurtezi-Arch
```

## Step 3: Login to Vercel

```bash
vercel login
```

This will open your browser to authenticate. Follow the prompts to log in.

## Step 4: Deploy to Vercel

### First Deployment (Preview)

```bash
vercel
```

The CLI will ask you some questions:
- **Set up and deploy?** → Type `Y` and press Enter
- **Which scope?** → Select your account
- **Link to existing project?** → If you have an existing project, type `Y` and select it. Otherwise type `N` to create a new one.
- **Project name?** → Enter a name (e.g., `fjollemurteziarch`) or press Enter for default
- **Directory?** → Press Enter (current directory is fine)
- **Override settings?** → Type `N` and press Enter

### Deploy to Production

After the preview deployment works, deploy to production:

```bash
vercel --prod
```

## Step 5: Set Environment Variables

**IMPORTANT:** You must set environment variables before the app will work!

### Option A: Via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Click on your project (`fjollemurteziarch`)
3. Go to **Settings** → **Environment Variables**
4. Add these variables (for **Production**, **Preview**, and **Development**):

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ADMIN_EMAIL=your_email@example.com
ADMIN_PASSWORD=your_password
SESSION_SECRET=your_random_32_char_string
```

5. After adding variables, redeploy:
   ```bash
   vercel --prod
   ```

### Option B: Via CLI (Alternative)

You can also set environment variables via CLI:

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Paste your value when prompted

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# Paste your value when prompted

# ... repeat for all variables
```

Then redeploy:
```bash
vercel --prod
```

## Step 6: Verify Deployment

1. Visit your deployment URL (shown after `vercel --prod`)
2. Test the public pages
3. Try logging in with your admin credentials
4. Test the admin dashboard

## Quick Commands Reference

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployments
vercel ls

# View project info
vercel inspect

# Remove deployment
vercel remove
```

## Troubleshooting

### "Command not found: vercel"
- Make sure Node.js is installed: `node --version`
- Reinstall Vercel CLI: `npm install -g vercel`

### "Authentication failed"
- Run `vercel login` again
- Make sure you're logged into the correct Vercel account

### "Build failed"
- Check the error message in the terminal
- Make sure all dependencies are installed: `pnpm install`
- Verify environment variables are set correctly

### "Missing environment variables"
- Set all required variables in Vercel dashboard
- Redeploy after adding variables: `vercel --prod`

## Advantages of Direct Deployment

✅ No Git repository needed
✅ Quick deployment from local machine
✅ Full control over when to deploy
✅ Can test preview deployments before production

## Disadvantages

❌ No automatic deployments on code changes
❌ Need to manually deploy each update
❌ No version history (unless you use Git separately)

## Next Steps

After successful deployment:
1. Set up your Supabase database (run `supabase-schema.sql`)
2. Create the `images` storage bucket in Supabase
3. Test all functionality on the live site
4. Consider setting up Git for automatic deployments later

