# Orders Management Features - Implementation Summary

## Overview
This document summarizes the implementation of advanced features for the orders management system, including admin interface integration, file uploads, and pagination.

## Features Implemented

### 1. ✅ Admin Dashboard Integration
- Added "Orders" tab to the admin dashboard
- Orders are now manageable alongside articles, journals, and cards
- Displays orders with year, category, and creation date
- Supports edit and delete operations

**Files Modified:**
- `src/app/admin/page.tsx` - Added orders to the admin dashboard

### 2. ✅ Admin Edit Page for Orders
- Created comprehensive order editing interface
- Supports creating and editing orders
- Integrated file upload functionality
- Fields included:
  - Year (required)
  - Title (required)
  - Category (คำสั่ง/ประกาศ) (required)
  - Date
  - Display Order
  - File Upload (PDF, DOC, DOCX, XLS, XLSX)
  - External URL/Link (alternative to file upload)

**Files Modified:**
- `src/app/admin/[type]/[id]/page.tsx` - Added orders support with file upload

### 3. ✅ File Upload System
- Backend file upload using Multer middleware
- Supports PDF, DOC, DOCX, XLS, XLSX files
- File size limit: 10MB
- Files stored in `backend/uploads/orders/`
- Files served statically via `/uploads/orders/` endpoint
- Automatic file cleanup on order deletion
- Old files replaced when new files are uploaded

**Files Created/Modified:**
- `backend/middleware/upload.js` - Multer configuration for file uploads
- `backend/server.js` - Added static file serving
- `backend/routes/orders.js` - Integrated file upload in POST/PUT routes
- `backend/.gitignore` - Added uploads directory to gitignore

### 4. ✅ Database Schema Updates
- Added `file_path` column to orders table
- Created migration script for existing databases
- Added index for file_path queries

**Files Created/Modified:**
- `backend/database/schema.sql` - Added file_path column
- `backend/database/migration_add_file_path.sql` - Migration script

### 5. ✅ API Pagination
- GET `/api/orders` endpoint now supports pagination
- Query parameters:
  - `page` - Page number (default: 1)
  - `limit` - Items per page (default: 50)
  - `year` - Optional year filter
- Response includes pagination metadata:
  ```json
  {
    "data": [...],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 100,
      "totalPages": 2,
      "hasNext": true,
      "hasPrev": false
    }
  }
  ```

**Files Modified:**
- `backend/routes/orders.js` - Added pagination to GET endpoint

### 6. ✅ Frontend Pagination
- Added pagination to orders page
- Paginates orders within selected year
- 20 items per page
- Pagination controls include:
  - Previous/Next buttons
  - Page numbers (shows up to 5 pages)
  - Current page indicator
  - Total items and range display

**Files Modified:**
- `src/app/about/orders/page.tsx` - Added pagination UI and logic

### 7. ✅ File Display Integration
- Orders page now displays uploaded files correctly
- Links to uploaded files open in new tab
- Supports both file uploads and external URLs
- File links use proper URL construction

**Files Modified:**
- `src/app/about/orders/page.tsx` - Updated link handling for file_path

## Database Setup

### Run Migration
If the orders table already exists, run the migration to add the file_path column:

```sql
-- Run this SQL
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS file_path VARCHAR(500);

CREATE INDEX IF NOT EXISTS idx_orders_file_path ON orders(file_path) WHERE file_path IS NOT NULL;
```

Or use the migration file:
```bash
psql -U postgres -d pmdweb_db -f backend/database/migration_add_file_path.sql
```

## Dependencies Added

- `multer` - File upload middleware for Express

Install with:
```bash
cd backend
npm install multer
```

## File Structure

```
backend/
├── uploads/
│   └── orders/          # Uploaded order documents
├── middleware/
│   └── upload.js        # Multer configuration
├── routes/
│   └── orders.js        # Updated with file upload and pagination
└── database/
    ├── schema.sql       # Updated schema
    └── migration_add_file_path.sql  # Migration script

src/app/
├── admin/
│   ├── page.tsx         # Updated with orders tab
│   └── [type]/[id]/
│       └── page.tsx     # Updated with orders support
└── about/
    └── orders/
        └── page.tsx     # Updated with pagination
```

## Usage Examples

### Creating an Order with File Upload (Admin)
1. Go to Admin Dashboard
2. Click "Orders" tab
3. Click "Add New Order"
4. Fill in required fields (Year, Title, Category)
5. Upload a file or provide an external URL
6. Save

### Uploading Files
- Supported formats: PDF, DOC, DOCX, XLS, XLSX
- Maximum file size: 10MB
- Files are automatically renamed with unique identifiers
- Original filename is preserved in the stored filename

### API Usage

**Get Paginated Orders:**
```bash
GET /api/orders?page=1&limit=20&year=2568
```

**Create Order with File:**
```bash
POST /api/orders
Content-Type: multipart/form-data
Authorization: Bearer <token>

Form Data:
- year: 2568
- title: คำสั่งใหม่
- category: คำสั่ง
- date: 15 มกราคม 2568
- file: <file>
```

## Benefits

1. **Low-Code Management**: Admins can manage orders without code changes
2. **File Organization**: Documents are organized and stored securely
3. **Scalability**: Pagination handles large datasets efficiently
4. **User Experience**: Clean pagination UI improves navigation
5. **Flexibility**: Supports both file uploads and external URLs

## Next Steps (Optional Enhancements)

- [ ] Add search/filter functionality
- [ ] Add bulk operations (delete multiple orders)
- [ ] Add file preview functionality
- [ ] Add file download tracking
- [ ] Add image thumbnails for PDFs
- [ ] Add export functionality (Excel/PDF)

