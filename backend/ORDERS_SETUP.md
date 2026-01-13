# Orders Page Database Setup Guide

This guide explains how to set up the database-driven orders page (low-code solution).

## Overview

The orders page has been converted from hardcoded data to a database-driven solution. All order data is now stored in PostgreSQL and can be managed through the API.

## Step-by-Step Setup

### 1. Database Setup

First, make sure your PostgreSQL database is running and configured.

#### Create the Orders Table

Run the SQL schema to create the orders table:

```bash
# Option 1: Using psql
psql -U postgres -d pmdweb_db -f backend/database/schema.sql

# Option 2: Using pgAdmin4
# Open pgAdmin4, connect to your database, and run the SQL from backend/database/schema.sql
```

The schema includes:
- `orders` table with fields: id, year, title, category, date, link, display_order
- Indexes for better query performance
- Automatic timestamp updates

### 2. Migrate Existing Data

Import the existing hardcoded data into the database:

```bash
cd backend
node scripts/migrate-orders.js
```

This script will:
- Import all existing orders from the hardcoded data
- Organize them by year
- Set display order for proper sorting
- Show a summary of imported data

### 3. Backend Configuration

Make sure your backend environment variables are set in `backend/.env`:

```env
# Database configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pmdweb_db
DB_USER=postgres
DB_PASSWORD=your_password

# Or use connection string
# DATABASE_URL=postgresql://user:password@localhost:5432/pmdweb_db

# Server configuration
PORT=3000
FRONTEND_URL=http://localhost:3001
```

### 4. Start the Backend Server

```bash
cd backend
npm install  # If not already installed
npm run dev
```

The API will be available at:
- `GET /api/orders` - Get all orders
- `GET /api/orders/by-year` - Get orders grouped by year
- `GET /api/orders/years` - Get list of available years
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order (requires authentication)
- `PUT /api/orders/:id` - Update order (requires authentication)
- `DELETE /api/orders/:id` - Delete order (requires authentication)

### 5. Frontend Configuration

Make sure your frontend environment variables are set (if needed):

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 6. Start the Frontend

```bash
npm run dev
```

The orders page will now fetch data from the API instead of using hardcoded data.

## API Usage Examples

### Get All Orders
```bash
curl http://localhost:3000/api/orders
```

### Get Orders by Year
```bash
curl http://localhost:3000/api/orders/by-year
```

### Get Orders for Specific Year
```bash
curl http://localhost:3000/api/orders?year=2568
```

### Create New Order (requires auth token)
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "year": "2568",
    "title": "คำสั่งใหม่",
    "category": "คำสั่ง",
    "date": "1 มกราคม 2568",
    "link": "http://example.com/order.pdf",
    "display_order": 1
  }'
```

## Database Schema

### Orders Table

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| year | VARCHAR(10) | Year (e.g., "2568") |
| title | VARCHAR(500) | Order title |
| category | VARCHAR(50) | Either "คำสั่ง" or "ประกาศ" |
| date | VARCHAR(100) | Date string |
| link | VARCHAR(500) | Link to order document |
| display_order | INTEGER | Display order within year |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

## Benefits of This Approach

1. **Low-Code**: No need to modify code to add/edit orders
2. **Dynamic**: Data can be updated through API or database directly
3. **Scalable**: Easy to add new years and orders
4. **Maintainable**: Centralized data management
5. **Flexible**: Can be extended with admin interface

## Troubleshooting

### Database Connection Error
- Check PostgreSQL is running
- Verify database credentials in `.env`
- Ensure database `pmdweb_db` exists

### No Data Showing
- Run the migration script: `node backend/scripts/migrate-orders.js`
- Check API endpoint: `http://localhost:3000/api/orders/by-year`
- Check browser console for errors

### API Not Responding
- Ensure backend server is running on port 3000
- Check CORS configuration in `backend/server.js`
- Verify `FRONTEND_URL` matches your frontend URL

## Next Steps

Consider adding:
- Admin interface for managing orders
- Search functionality
- Filtering by category
- Pagination for large datasets
- File upload for order documents

