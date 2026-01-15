# Vercel Deployment Guide

This guide will help you deploy your application to Vercel so it's publicly accessible.

## Architecture Overview

Your application consists of:
- **Frontend**: Next.js app (deploys to Vercel)
- **Backend**: Express API with PostgreSQL (needs separate hosting)

## Step 1: Deploy Backend First

You need to deploy your backend API separately. See `DEPLOYMENT_GUIDE.md` for complete Railway setup instructions.

**Quick Steps:**
1. Go to [Railway.app](https://railway.app) and create project from GitHub
2. **Set Root Directory to `backend`** (critical!)
3. Add PostgreSQL database
4. Set environment variables (see `DEPLOYMENT_GUIDE.md`)
5. Get your backend URL

## Step 2: Update Database

Make sure your production database has the schema:

1. Connect to your production database
2. Run the SQL from `backend/database/schema.sql`
3. Run any migrations from `backend/database/migration_add_file_path.sql`

## Step 3: Deploy Frontend to Vercel

### Method 1: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `.` (root - default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
5. Add Environment Variables:
   - `NEXT_PUBLIC_API_URL`: Your backend URL (e.g., `https://your-app.railway.app`)
6. Click "Deploy"

### Method 2: Using Vercel CLI

1. Install Vercel CLI: `npm install -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel` then `vercel --prod`
4. Set environment: `vercel env add NEXT_PUBLIC_API_URL`

## Step 4: Update Backend CORS

After you get your Vercel URL, update your backend's `FRONTEND_URL` environment variable:

1. In Railway/Render/Fly.io dashboard
2. Update `FRONTEND_URL` to your Vercel URL (e.g., `https://your-app.vercel.app`)

## Step 5: Update vercel.json (if needed)

If you deployed your backend to a different service, update the `rewrites` section in `vercel.json` with your actual backend URL, or remove it if you're using `NEXT_PUBLIC_API_URL` directly.

## Environment Variables Summary

### Frontend (Vercel)
- `NEXT_PUBLIC_API_URL`: Your backend API URL

### Backend (Railway/Render/Fly.io)
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT tokens (use a strong random string)
- `ADMIN_USERNAME`: Admin login username
- `ADMIN_PASSWORD`: Admin login password
- `FRONTEND_URL`: Your Vercel frontend URL
- `PORT`: Usually set automatically by hosting service

## Testing Your Deployment

1. Visit your Vercel URL
2. Check if the frontend loads
3. Try logging in to admin panel
4. Test API endpoints

## Troubleshooting

### CORS Errors
- Make sure `FRONTEND_URL` in backend matches your Vercel URL exactly
- Check that backend CORS allows your Vercel domain

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check if database requires SSL (Railway/Render usually do)
- Ensure database is accessible from your backend hosting

### API Not Found
- Verify `NEXT_PUBLIC_API_URL` is set correctly in Vercel
- Check backend is running and accessible
- Test backend health endpoint: `https://your-backend-url/api/health`

## File Uploads

Note: File uploads are stored in `backend/uploads/`. For production:
- Consider using cloud storage (AWS S3, Cloudinary, etc.)
- Or ensure your backend hosting persists files (Railway/Render may need volume mounts)

## Next Steps

After deployment:
1. Test all features
2. Set up custom domain (optional) in Vercel
3. Enable HTTPS (usually automatic)
4. Monitor logs in both Vercel and backend hosting

