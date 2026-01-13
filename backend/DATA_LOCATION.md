# Where Your Data is Stored

## Database Location

All data (articles, journals, cards) is stored in **PostgreSQL database**:

- **Database Name**: `pmdweb_db` (configured in `.env` file)
- **Host**: `localhost` (or your configured DB_HOST)
- **Port**: `5432` (default PostgreSQL port)
- **Tables**: 
  - `articles`
  - `journals`
  - `cards`

## Viewing Your Data

### Method 1: pgAdmin4 (Recommended)

1. Open **pgAdmin4**
2. Connect to your PostgreSQL server
3. Navigate: **Databases** → `pmdweb_db` → **Schemas** → **public** → **Tables**
4. Right-click on any table (`articles`, `journals`, or `cards`)
5. Select **View/Edit Data** → **All Rows**

### Method 2: SQL Query Tool

Open pgAdmin4 Query Tool and run:

```sql
-- View all articles
SELECT * FROM articles ORDER BY created_at DESC;

-- View all journals  
SELECT * FROM journals ORDER BY created_at DESC;

-- View all cards
SELECT * FROM cards ORDER BY created_at DESC;

-- Count items in each table
SELECT 
  (SELECT COUNT(*) FROM articles) as articles_count,
  (SELECT COUNT(*) FROM journals) as journals_count,
  (SELECT COUNT(*) FROM cards) as cards_count;
```

### Method 3: Command Line (psql)

```bash
psql -U postgres -d pmdweb_db

# Then run SQL queries:
SELECT * FROM articles;
SELECT * FROM journals;
SELECT * FROM cards;
```

## Data Structure

### Articles Table
- `id` - Auto-incrementing primary key
- `title` - Article title (required)
- `text` - Article content (optional)
- `hyperlink` - URL slug/link (optional)
- `created_at` - Timestamp when created
- `updated_at` - Timestamp when last updated

### Journals Table
- `id` - Auto-incrementing primary key
- `month` - Month string (required, e.g., "เมษายน 2567")
- `title` - Journal title (required)
- `text` - Journal content (optional)
- `hyperlink` - URL slug/link (optional)
- `created_at` - Timestamp when created
- `updated_at` - Timestamp when last updated

### Cards Table
- `id` - Auto-incrementing primary key
- `title` - Card title (required)
- `text` - Card content (optional)
- `hyperlink` - URL slug/link (optional)
- `created_at` - Timestamp when created
- `updated_at` - Timestamp when last updated

## Data Persistence

✅ **Data is permanent** - Once saved, it remains in the database until deleted
✅ **Survives server restarts** - Data persists even if you restart the backend server
✅ **Backup recommended** - Regularly backup your PostgreSQL database

## Backup Your Data

### Using pgAdmin4:
1. Right-click on `pmdweb_db` database
2. Select **Backup...**
3. Choose backup location and format
4. Click **Backup**

### Using Command Line:
```bash
pg_dump -U postgres -d pmdweb_db > backup.sql
```

### Restore from Backup:
```bash
psql -U postgres -d pmdweb_db < backup.sql
```

