-- Migration: Add file_path column to orders table
-- Run this if the orders table already exists

ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS file_path VARCHAR(500);

-- Create index for file_path queries
CREATE INDEX IF NOT EXISTS idx_orders_file_path ON orders(file_path) WHERE file_path IS NOT NULL;

