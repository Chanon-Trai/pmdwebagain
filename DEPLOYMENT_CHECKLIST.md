# Quick Deployment Checklist

## ✅ Pre-Deployment

- [ ] Backend code is ready
- [ ] Frontend code is ready
- [ ] Database schema is ready (`backend/database/schema.sql`)

## 🚀 Step 1: Deploy Backend

Choose one platform:

### Railway (Easiest)
- [ ] Sign up at [railway.app](https://railway.app)
- [ ] Create new project
- [ ] Deploy backend folder
- [ ] Add PostgreSQL database (Railway can auto-provision)
- [ ] Set environment variables:
  - [ ] `DATABASE_URL` (from Railway PostgreSQL)
  - [ ] `JWT_SECRET` (generate random string)
  - [ ] `ADMIN_USERNAME`
  - [ ] `ADMIN_PASSWORD`
  - [ ] `FRONTEND_URL` (set after Vercel deployment)
- [ ] Copy backend URL (e.g., `https://xxx.railway.app`)

### Render
- [ ] Sign up at [render.com](https://render.com)
- [ ] Create Web Service
- [ ] Connect GitHub repo
- [ ] Set root directory to `backend`
- [ ] Add environment variables (same as Railway)
- [ ] Copy backend URL

## 🎨 Step 2: Deploy Frontend to Vercel

> **Proxy/GitHub Issues?** See `DEPLOY_WITHOUT_GITHUB.md` for direct deployment without GitHub!

### Using Vercel CLI (Works Without GitHub!)
- [ ] Install: `npm install -g vercel`
- [ ] Login: `vercel login`
- [ ] Deploy: `vercel` (then `vercel --prod`)
- [ ] Set environment variable: `NEXT_PUBLIC_API_URL` = your backend URL
- [ ] **No GitHub needed!** This uploads directly from your local folder.

### Using Vercel Dashboard (Requires GitHub)
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Import GitHub repository
- [ ] Framework: Next.js (auto-detected)
- [ ] Add environment variable: `NEXT_PUBLIC_API_URL` = your backend URL
- [ ] Deploy

## 🔄 Step 3: Update Backend CORS

- [ ] Get your Vercel URL (e.g., `https://your-app.vercel.app`)
- [ ] Update `FRONTEND_URL` in backend hosting platform
- [ ] Restart backend service

## 🧪 Step 4: Test

- [ ] Visit Vercel URL
- [ ] Test frontend loads
- [ ] Test admin login
- [ ] Test API endpoints
- [ ] Test file uploads (if applicable)

## 📝 Environment Variables Reference

### Frontend (Vercel)
```
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

### Backend (Railway/Render)
```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-password
FRONTEND_URL=https://your-app.vercel.app
```

## 🆘 Need Help?

See `VERCEL_DEPLOYMENT.md` for detailed instructions.

