# Deploy Backend Without GitHub

Since you can't use GitHub due to proxy issues, here are ways to deploy your Express backend without GitHub.

## Solution 1: Railway CLI (Direct Deployment - Recommended!)

Railway supports direct deployment via CLI without GitHub.

### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

### Step 2: Login to Railway
```bash
railway login
```
This opens a browser for authentication.

### Step 3: Navigate to Backend Folder
```bash
cd backend
```

### Step 4: Initialize Railway Project
```bash
railway init
```
Follow prompts:
- Create new project? Yes
- Project name: `pmdweb-backend` (or your choice)

### Step 5: Link to Existing Project (if you already created one in dashboard)
```bash
railway link
```
Or create new:
```bash
railway init --name pmdweb-backend
```

### Step 6: Add PostgreSQL Database
```bash
railway add postgresql
```
This automatically provisions a PostgreSQL database and sets `DATABASE_URL`.

### Step 7: Set Environment Variables
```bash
# Set JWT secret
railway variables set JWT_SECRET="your-super-secret-jwt-key-change-this"

# Set admin credentials
railway variables set ADMIN_USERNAME="admin"
railway variables set ADMIN_PASSWORD="your-secure-password"

# Set frontend URL (your Vercel URL)
railway variables set FRONTEND_URL="https://your-app.vercel.app"

# Port is usually set automatically, but you can set it:
railway variables set PORT="3000"
```

### Step 8: Deploy!
```bash
railway up
```

That's it! Railway will:
- Build your backend
- Deploy it
- Give you a URL like `https://your-app.railway.app`

### Step 9: Get Your Backend URL
```bash
railway domain
```
Or check in Railway dashboard.

### Step 10: Update Frontend Environment Variable
Go to Vercel and update `NEXT_PUBLIC_API_URL`:
```bash
vercel env add NEXT_PUBLIC_API_URL
```
Enter your Railway backend URL.

### Future Updates
Just run `railway up` from the backend folder whenever you make changes!

---

## Solution 2: Render CLI (Alternative)

Render also supports CLI deployment.

### Step 1: Install Render CLI
```bash
npm install -g render-cli
```

### Step 2: Login
```bash
render login
```

### Step 3: Create Blueprint File
Create `render.yaml` in your backend folder:
```yaml
services:
  - type: web
    name: pmdweb-backend
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: DATABASE_URL
        sync: false
      - key: JWT_SECRET
        sync: false
      - key: ADMIN_USERNAME
        sync: false
      - key: ADMIN_PASSWORD
        sync: false
      - key: FRONTEND_URL
        sync: false
      - key: PORT
        value: 3000
```

### Step 4: Deploy
```bash
cd backend
render deploy
```

---

## Solution 3: Fly.io CLI (Another Great Option)

Fly.io is excellent for Node.js apps and doesn't require GitHub.

### Step 1: Install Fly CLI
```bash
# Windows (PowerShell)
iwr https://fly.io/install.ps1 -useb | iex
```

Or download from: https://fly.io/docs/hands-on/install-flyctl/

### Step 2: Login
```bash
fly auth login
```

### Step 3: Initialize in Backend Folder
```bash
cd backend
fly launch
```

Follow prompts:
- App name: `pmdweb-backend` (or auto-generated)
- Region: Choose closest to you
- PostgreSQL: Yes (Fly can provision it)
- Redis: No (unless you need it)

### Step 4: Set Environment Variables
```bash
fly secrets set JWT_SECRET="your-secret-key"
fly secrets set ADMIN_USERNAME="admin"
fly secrets set ADMIN_PASSWORD="your-password"
fly secrets set FRONTEND_URL="https://your-app.vercel.app"
```

### Step 5: Deploy
```bash
fly deploy
```

### Step 6: Get Your URL
```bash
fly status
```
Your app will be at: `https://your-app.fly.dev`

---

## Solution 4: Railway Dashboard - Direct Upload (If CLI Doesn't Work)

Railway dashboard might support direct folder upload:

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Look for "Deploy from local folder" or "Upload" option
4. If available, upload your backend folder
5. Set environment variables in dashboard
6. Add PostgreSQL service

---

## Solution 5: Use Vercel API Routes (Convert Backend to Serverless)

You can convert your Express backend to Vercel serverless functions. This keeps everything in one place!

### Create API Routes Structure

Create `src/app/api/` folder structure and convert your routes. This is more work but keeps everything on Vercel.

**Note:** This requires restructuring your backend code into Next.js API routes.

---

## Recommended: Railway CLI (Solution 1)

Railway CLI is the easiest and most straightforward:
- ✅ No GitHub needed
- ✅ Direct deployment from local folder
- ✅ Easy PostgreSQL setup
- ✅ Simple environment variable management
- ✅ Free tier available

## Quick Start with Railway CLI

```bash
# Install
npm install -g @railway/cli

# Login
railway login

# Go to backend folder
cd backend

# Initialize
railway init

# Add database
railway add postgresql

# Set variables
railway variables set JWT_SECRET="your-secret"
railway variables set ADMIN_USERNAME="admin"
railway variables set ADMIN_PASSWORD="your-password"
railway variables set FRONTEND_URL="https://your-vercel-app.vercel.app"

# Deploy
railway up

# Get URL
railway domain
```

## Environment Variables Checklist

Make sure to set these in your backend hosting:

- ✅ `DATABASE_URL` (usually auto-set by Railway/Render/Fly when you add PostgreSQL)
- ✅ `JWT_SECRET` (generate a strong random string)
- ✅ `ADMIN_USERNAME` (your admin username)
- ✅ `ADMIN_PASSWORD` (your admin password)
- ✅ `FRONTEND_URL` (your Vercel frontend URL)
- ✅ `PORT` (usually auto-set, but can be 3000)

## Database Setup

After deploying, you need to run your database schema:

### Option 1: Railway Dashboard
1. Go to Railway dashboard
2. Click on your PostgreSQL service
3. Open "Data" tab
4. Use the SQL editor to run `backend/database/schema.sql`

### Option 2: Connect Locally
```bash
# Get database connection string from Railway
railway variables

# Connect with psql or database client
psql $DATABASE_URL

# Run schema
\i backend/database/schema.sql
```

### Option 3: Use Railway CLI
```bash
railway connect postgres
# Then run SQL commands
```

## Troubleshooting

### Railway CLI Not Found
Make sure npm global bin is in your PATH:
```bash
npm config get prefix
# Add that path to your PATH environment variable
```

### Database Connection Issues
- Verify `DATABASE_URL` is set correctly
- Check if SSL is required (Railway usually requires SSL)
- Your `db.js` should handle SSL automatically

### CORS Errors
- Make sure `FRONTEND_URL` matches your Vercel URL exactly
- Check backend CORS configuration in `server.js`

## Next Steps After Backend Deployment

1. ✅ Get your backend URL (e.g., `https://xxx.railway.app`)
2. ✅ Update Vercel environment variable: `NEXT_PUBLIC_API_URL`
3. ✅ Test your API: `https://your-backend.railway.app/api/health`
4. ✅ Test frontend connection
5. ✅ Run database migrations if needed

## Summary

**Best Option:** Railway CLI - it's the easiest and works perfectly without GitHub!

Just run:
```bash
npm install -g @railway/cli
railway login
cd backend
railway init
railway add postgresql
railway variables set JWT_SECRET="..." ADMIN_USERNAME="..." ADMIN_PASSWORD="..." FRONTEND_URL="..."
railway up
```

Done! 🚀

