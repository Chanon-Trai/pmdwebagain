# Backend API for ฝบร. (Power System Maintenance Department)

Express.js backend with PostgreSQL database for managing articles, journals, and cards.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (with pgAdmin4)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. PostgreSQL Database Setup

1. Open pgAdmin4
2. Create a new database named `pmdweb_db` (or use your preferred name)
3. Run the SQL schema file to create tables:
   - Open pgAdmin4 Query Tool
   - Copy and paste the contents of `database/schema.sql`
   - Execute the SQL script

Alternatively, you can run it from command line:
```bash
psql -U postgres -d pmdweb_db -f database/schema.sql
```

### 3. Environment Configuration

1. Copy `.env.example` to `.env`:

**Windows (PowerShell):**
```powershell
Copy-Item .env.example .env
```

**Windows (Command Prompt):**
```cmd
copy .env.example .env
```

**Linux/Mac:**
```bash
cp .env.example .env
```

2. Update `.env` with your PostgreSQL credentials:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pmdweb_db
DB_USER=postgres
DB_PASSWORD=your_password_here
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### 4. Run the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Articles

- `GET /api/articles` - Get all articles
- `GET /api/articles/:id` - Get single article
- `POST /api/articles` - Create article
- `PUT /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article

**Article Schema:**
```json
{
  "title": "string (required)",
  "text": "string (optional)",
  "hyperlink": "string (optional)"
}
```

### Journals

- `GET /api/journals` - Get all journals
- `GET /api/journals/:id` - Get single journal
- `POST /api/journals` - Create journal
- `PUT /api/journals/:id` - Update journal
- `DELETE /api/journals/:id` - Delete journal

**Journal Schema:**
```json
{
  "month": "string (required)",
  "title": "string (required)",
  "text": "string (optional)",
  "hyperlink": "string (optional)"
}
```

### Cards

- `GET /api/cards` - Get all cards
- `GET /api/cards/:id` - Get single card
- `POST /api/cards` - Create card
- `PUT /api/cards/:id` - Update card
- `DELETE /api/cards/:id` - Delete card

**Card Schema:**
```json
{
  "title": "string (required)",
  "text": "string (optional)",
  "hyperlink": "string (optional)"
}
```

## Example API Requests

### Create an Article
```bash
curl -X POST http://localhost:5000/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "title": "โครงการตรวจเช็กระบบป้องกันไฟฟ้า",
    "text": "รายละเอียดโครงการ",
    "hyperlink": "https://example.com/article"
  }'
```

### Create a Journal
```bash
curl -X POST http://localhost:5000/api/journals \
  -H "Content-Type: application/json" \
  -d '{
    "month": "เมษายน 2567",
    "title": "โครงการตรวจเช็กระบบป้องกันไฟฟ้า เขตเหนือ",
    "text": "รายละเอียดโครงการ",
    "hyperlink": "#april-update"
  }'
```

### Get All Articles
```bash
curl http://localhost:5000/api/articles
```

## Database Tables

### articles
- `id` (SERIAL PRIMARY KEY)
- `title` (VARCHAR)
- `text` (TEXT)
- `hyperlink` (VARCHAR)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### journals
- `id` (SERIAL PRIMARY KEY)
- `month` (VARCHAR)
- `title` (VARCHAR)
- `text` (TEXT)
- `hyperlink` (VARCHAR)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### cards
- `id` (SERIAL PRIMARY KEY)
- `title` (VARCHAR)
- `text` (TEXT)
- `hyperlink` (VARCHAR)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## CORS Configuration

CORS is enabled to allow requests from the frontend. The allowed origin is configured in `.env` file (`FRONTEND_URL`).

## Admin Authentication

The admin dashboard uses JWT authentication. Default credentials:
- **Username**: `admin`
- **Password**: `admin123`

**Important**: Change these credentials in production by setting environment variables:
- `ADMIN_USERNAME` - Admin username
- `ADMIN_PASSWORD` - Bcrypt hashed password (leave empty to use default)
- `JWT_SECRET` - Secret key for JWT tokens

### API Authentication

- **GET** endpoints are public (no authentication required)
- **POST, PUT, DELETE** endpoints require JWT authentication
- Include token in Authorization header: `Authorization: Bearer <token>`

### Login Endpoint

```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "admin",
  "message": "Login successful"
}
```

## Troubleshooting

1. **Database connection error**: Check your PostgreSQL credentials in `.env`
2. **Table not found**: Make sure you've run the `schema.sql` file
3. **Port already in use**: Change the `PORT` in `.env` file
4. **Authentication failed**: Verify JWT_SECRET is set in `.env`

