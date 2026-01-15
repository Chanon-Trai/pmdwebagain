# Complete Deployment Guide

This guide covers deploying your Next.js frontend to Vercel and Express backend to Railway.

## Architecture

- **Frontend**: Next.js app → Deploy to **Vercel**
- **Backend**: Express API + PostgreSQL → Deploy to **Railway**

---

## Part 1: Deploy Backend to Railway

### Step 1: Create Railway Project

1. Go to [railway.app](https://railway.app) and sign up/login
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository
5. **IMPORTANT**: Set **Root Directory** to `backend`
   - Go to: Service → Settings → Service → Root Directory
   - Set to: `backend`
   - This tells Railway to only deploy the backend folder, not the root

### Step 2: Add PostgreSQL Database

1. In Railway dashboard, click **"+ New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway automatically:
   - Creates the database
   - Sets `DATABASE_URL` environment variable
   - Shares it with your backend service

### Step 3: Set Environment Variables

In Railway → Your Backend Service → Variables tab, add:

```
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-admin-password
FRONTEND_URL=https://your-app.vercel.app
```

**Note**: `DATABASE_URL` is set automatically when you add PostgreSQL. You can view it in:
- PostgreSQL Service → Variables tab, OR
- Backend Service → Variables tab (shared automatically)

### Step 4: Deploy Backend

Railway will automatically deploy when you:
- Push to GitHub (if connected)
- Or manually trigger deployment from dashboard

### Step 5: Get Backend URL

1. In Railway dashboard → Your Backend Service
2. Click **"Settings"** → **"Networking"**
3. Generate domain or use provided URL
4. Copy the URL (e.g., `https://xxx.railway.app`)

### Step 6: Set Up Database Schema

1. Go to Railway → PostgreSQL Service
2. Click **"Data"** tab
3. Use SQL Editor to run:
   - Copy contents from `backend/database/schema.sql`
   - Paste and execute
   - Run any migrations from `backend/database/migration_add_file_path.sql`

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Create Vercel Project

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `.` (root - leave as default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

### Step 2: Set Environment Variable

In Vercel → Your Project → Settings → Environment Variables:

- **Key**: `NEXT_PUBLIC_API_URL`
- **Value**: Your Railway backend URL (e.g., `https://xxx.railway.app`)

### Step 3: Deploy

Click **"Deploy"** - Vercel will build and deploy automatically.

### Step 4: Get Frontend URL

After deployment, Vercel provides a URL like:
`https://your-app.vercel.app`

---

## Part 3: Connect Frontend and Backend

### Update Backend CORS

1. Go to Railway → Your Backend Service → Variables
2. Update `FRONTEND_URL` to your Vercel URL:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
3. Railway will automatically redeploy with the new variable

---

## Environment Variables Summary

### Frontend (Vercel)
```
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

### Backend (Railway)
```
DATABASE_URL=postgresql://... (auto-set by Railway)
JWT_SECRET=your-secret-key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-password
FRONTEND_URL=https://your-app.vercel.app
PORT=3000 (auto-set by Railway)
```

---

## Testing Your Deployment

1. **Test Frontend**: Visit your Vercel URL
2. **Test Backend Health**: `https://your-backend.railway.app/api/health`
   - Should return: `{"status":"OK","message":"API is running"}`
3. **Test Admin Login**: Try logging in to admin panel
4. **Test API Endpoints**: Verify all API routes work

---

## Troubleshooting

### Railway Detecting Next.js Vulnerability

**Problem**: Railway shows security vulnerability for Next.js

**Solution**: 
- Make sure **Root Directory** is set to `backend` in Railway settings
- Railway should only see the backend folder, not the root

### CORS Errors

**Problem**: Frontend can't connect to backend

**Solution**:
- Verify `FRONTEND_URL` in Railway matches your Vercel URL exactly
- Check `NEXT_PUBLIC_API_URL` in Vercel matches your Railway URL
- Ensure no trailing slashes in URLs

### Database Connection Issues

**Problem**: Backend can't connect to database

**Solution**:
- Verify `DATABASE_URL` exists in Railway Variables
- Check Railway PostgreSQL service is running
- Verify database schema has been run
- Check Railway logs for connection errors

### API Not Found

**Problem**: Frontend gets 404 when calling API

**Solution**:
- Verify `NEXT_PUBLIC_API_URL` is set correctly in Vercel
- Check backend is deployed and running (check Railway logs)
- Test backend directly: `https://your-backend.railway.app/api/health`
- Ensure backend routes are correct

### DATABASE_URL Not Showing

**Solution**:
- Make sure PostgreSQL database is added to your Railway project
- Check PostgreSQL service is in the same project as backend
- Refresh Railway dashboard
- Railway automatically shares `DATABASE_URL` with all services in the project

---

## Project Structure

```
my-cursor-web1/
├── src/                    → Frontend (Vercel)
├── package.json            → Frontend dependencies
├── next.config.ts          
├── backend/                → Backend (Railway)
│   ├── server.js
│   ├── package.json        → Backend dependencies
│   ├── routes/
│   ├── database/
│   │   ├── schema.sql
│   │   └── db.js
│   └── uploads/
└── ...
```

**Key Points**:
- Vercel deploys root folder (Next.js frontend)
- Railway deploys `backend` folder only (Express API)
- Set Railway Root Directory to `backend` to avoid Next.js detection

---

## Quick Reference

### Railway Commands (if using CLI)
```bash
cd backend
railway login
railway link
railway variables set JWT_SECRET="..."
railway up
```

### Vercel Commands (if using CLI)
```bash
vercel login
vercel
vercel env add NEXT_PUBLIC_API_URL
vercel --prod
```

### Check Deployment Status

**Railway**: Dashboard → Your Service → Deployments  
**Vercel**: Dashboard → Your Project → Deployments

---

## Next Steps

After successful deployment:
1. ✅ Test all features
2. ✅ Set up custom domain (optional)
3. ✅ Monitor logs for errors
4. ✅ Set up automatic deployments from GitHub

---

## File Uploads Note

File uploads are stored in `backend/uploads/`. For production:
- Consider using cloud storage (AWS S3, Cloudinary, etc.)
- Railway file storage is ephemeral (files may be lost on redeploy)
- For persistent storage, use Railway volumes or external storage

---

## Support

- **Railway Docs**: https://docs.railway.app
- **Vercel Docs**: https://vercel.com/docs
- Check logs in both platforms for detailed error messages

