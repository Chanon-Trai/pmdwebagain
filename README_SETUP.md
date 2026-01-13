# Project Setup Guide

## Port Configuration

- **Backend API**: `http://localhost:3000`
- **Frontend (Next.js)**: `http://localhost:3001`

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in `backend/` directory:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pmdweb_db
DB_USER=postgres
DB_PASSWORD=your_password_here
PORT=3000
FRONTEND_URL=http://localhost:3001
JWT_SECRET=your-secret-key-change-in-production
```

Start backend:
```bash
npm run dev
# Backend runs on http://localhost:3000
```

### 2. Frontend Setup

```bash
# From project root
npm install
```

Create `.env.local` file in project root:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Start frontend:
```bash
npm run dev
# Frontend runs on http://localhost:3001
```

### 3. Run Both Servers

**Option 1: Separate Terminals**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm run dev
```

**Option 2: Using npm scripts (from project root)**
```bash
# Backend only
npm run backend

# Frontend only  
npm run dev
```

## Environment Variables

### Backend (.env in backend/ folder)
- `DB_HOST` - PostgreSQL host
- `DB_PORT` - PostgreSQL port (default: 5432)
- `DB_NAME` - Database name
- `DB_USER` - PostgreSQL username
- `DB_PASSWORD` - PostgreSQL password
- `PORT` - Backend server port (default: 3000)
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:3001)
- `JWT_SECRET` - Secret key for JWT tokens
- `ADMIN_USERNAME` - Admin username (optional, default: admin)
- `ADMIN_PASSWORD` - Admin password hash (optional, default: admin123)

**Alternative**: Use `DATABASE_URL` connection string instead of individual DB variables:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/pmdweb_db
```

### Frontend (.env.local in project root)
- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:3000)

## API Endpoints

All API endpoints are available at: `http://localhost:3000/api/`

- `GET /api/articles` - Get all articles
- `GET /api/journals` - Get all journals
- `GET /api/cards` - Get all cards
- `POST /api/auth/login` - Admin login
- `POST /api/articles` - Create article (requires auth)
- `PUT /api/articles/:id` - Update article (requires auth)
- `DELETE /api/articles/:id` - Delete article (requires auth)

## Access Points

- **Frontend**: http://localhost:3001
- **Admin Login**: http://localhost:3001/admin/login
- **Admin Dashboard**: http://localhost:3001/admin
- **Backend API**: http://localhost:3000
- **API Health Check**: http://localhost:3000/api/health

## Database Setup

1. Open pgAdmin4
2. Create database: `pmdweb_db`
3. Run `backend/database/schema.sql` to create tables

## Troubleshooting

### Port Already in Use
- Backend (3000): Change `PORT` in `backend/.env`
- Frontend (3001): Change port in `package.json` scripts or use `-p` flag

### CORS Errors
- Ensure `FRONTEND_URL` in `backend/.env` matches your frontend URL
- Default: `http://localhost:3001`

### Database Connection
- Check PostgreSQL is running
- Verify credentials in `backend/.env`
- Test connection: `psql -U postgres -d pmdweb_db`

