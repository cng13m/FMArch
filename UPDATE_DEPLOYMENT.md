# Update Existing Vercel Deployment

Your site is already deployed at: https://fjollemurteziarch.vercel.app/

## Option 1: If Connected to Git (Easiest)

If your Vercel project is connected to a Git repository:

1. **Commit your changes:**
   ```bash
   cd FjolleMurtezi-Arch
   git add .
   git commit -m "Add admin dashboard with Supabase integration"
   git push
   ```

2. **Vercel will automatically deploy** - check your Vercel dashboard for the new deployment.

## Option 2: Deploy via Vercel CLI (No Git Required)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Navigate to Project

```bash
cd FjolleMurtezi-Arch
```

### Step 3: Login (if not already)

```bash
vercel login
```

### Step 4: Link to Existing Project

```bash
vercel link
```

When prompted:
- **Link to existing project?** → Type `Y`
- **What's the name of your project?** → Type `fjollemurteziarch` (or select from list)
- **In which directory is your code located?** → Press Enter (current directory)

### Step 5: Deploy to Production

```bash
vercel --prod
```

This will update your existing deployment at https://fjollemurteziarch.vercel.app/

## ⚠️ IMPORTANT: Set Environment Variables

Before the admin dashboard will work, you **must** add environment variables in Vercel:

1. Go to: https://vercel.com/dashboard
2. Click on your project: **fjollemurteziarch**
3. Go to **Settings** → **Environment Variables**
4. Add these 6 variables (for **Production**, **Preview**, and **Development**):

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ADMIN_EMAIL=your_email@example.com
ADMIN_PASSWORD=your_password
SESSION_SECRET=your_random_32_char_string
```

5. After adding variables, **redeploy**:
   - Via CLI: `vercel --prod`
   - Or click "Redeploy" in Vercel dashboard

## Quick Update Commands

```bash
# Navigate to project
cd FjolleMurtezi-Arch

# If using Git
git add .
git commit -m "Update"
git push

# If using Vercel CLI
vercel --prod
```

## Verify Update

After deployment:
1. Visit https://fjollemurteziarch.vercel.app/
2. Check that "Login" button appears in header
3. Try logging in with admin credentials
4. Test admin dashboard at `/admin`

## Troubleshooting

**"Build failed"**
- Check build logs in Vercel dashboard
- Make sure all dependencies are in `package.json`
- Verify environment variables are set

**"Admin dashboard not working"**
- Verify all 6 environment variables are set
- Check Supabase connection
- Review runtime logs in Vercel dashboard

**"Can't link project"**
- Make sure you're logged into the correct Vercel account
- Try `vercel login` again
- Check project name matches exactly

