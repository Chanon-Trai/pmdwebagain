const express = require('express');
const router = express.Router();
const pool = require('../database/db');
const { authenticateToken } = require('../middleware/auth');
const upload = require('../middleware/upload');
const fs = require('fs');
const path = require('path');

// GET /api/orders - Fetch all orders, optionally filtered by year with pagination
router.get('/', async (req, res) => {
  try {
    const { year, page = 1, limit = 50 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;
    
    let countQuery = 'SELECT COUNT(*) FROM orders';
    let query = 'SELECT * FROM orders';
    let params = [];
    let paramCount = 1;
    
    if (year) {
      const whereClause = ` WHERE year = $${paramCount}`;
      countQuery += whereClause;
      query += whereClause;
      params.push(year);
      paramCount++;
    }
    
    query += ' ORDER BY year DESC, display_order ASC, created_at DESC';
    query += ` LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(limitNum, offset);
    
    const [countResult, dataResult] = await Promise.all([
      pool.query(countQuery, year ? [year] : []),
      pool.query(query, params)
    ]);
    
    const total = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(total / limitNum);
    
    res.json({
      data: dataResult.rows,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1
      }
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/orders/years - Get list of available years
router.get('/years', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT DISTINCT year FROM orders ORDER BY year DESC'
    );
    res.json(result.rows.map(row => row.year));
  } catch (error) {
    console.error('Error fetching years:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/orders/by-year - Get orders grouped by year
router.get('/by-year', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM orders ORDER BY year DESC, display_order ASC, created_at DESC'
    );
    
    // Group by year
    const ordersByYear = {};
    result.rows.forEach(order => {
      if (!ordersByYear[order.year]) {
        ordersByYear[order.year] = [];
      }
      ordersByYear[order.year].push(order);
    });
    
    res.json(ordersByYear);
  } catch (error) {
    console.error('Error fetching orders by year:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/orders/:id - Fetch single order
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/orders - Create order with file upload (protected)
router.post('/', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    const { year, title, category, date, link, display_order } = req.body;
    
    if (!year || !title || !category) {
      // Delete uploaded file if validation fails
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ error: 'Year, title, and category are required' });
    }
    
    if (category !== 'คำสั่ง' && category !== 'ประกาศ') {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ error: 'Category must be either "คำสั่ง" or "ประกาศ"' });
    }
    
    // Handle file path
    let filePath = null;
    if (req.file) {
      filePath = `/uploads/orders/${req.file.filename}`;
    }
    
    // Use file_path if file is uploaded, otherwise use link
    const finalLink = filePath || link || null;
    
    const result = await pool.query(
      'INSERT INTO orders (year, title, category, date, link, file_path, display_order) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [year, title, category, date || null, finalLink, filePath, display_order || 0]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    // Delete uploaded file on error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/orders/:id - Update order with file upload (protected)
router.put('/:id', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    const { id } = req.params;
    const { year, title, category, date, link, display_order } = req.body;
    
    // Get existing order to delete old file if needed
    const existingOrder = await pool.query('SELECT file_path FROM orders WHERE id = $1', [id]);
    
    if (category && category !== 'คำสั่ง' && category !== 'ประกาศ') {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ error: 'Category must be either "คำสั่ง" or "ประกาศ"' });
    }
    
    const updates = [];
    const values = [];
    let paramCount = 1;
    
    if (year !== undefined) {
      updates.push(`year = $${paramCount++}`);
      values.push(year);
    }
    if (title !== undefined) {
      updates.push(`title = $${paramCount++}`);
      values.push(title);
    }
    if (category !== undefined) {
      updates.push(`category = $${paramCount++}`);
      values.push(category);
    }
    if (date !== undefined) {
      updates.push(`date = $${paramCount++}`);
      values.push(date);
    }
    
    // Handle file upload
    if (req.file) {
      const filePath = `/uploads/orders/${req.file.filename}`;
      updates.push(`file_path = $${paramCount++}`);
      updates.push(`link = $${paramCount++}`);
      values.push(filePath, filePath);
      
      // Delete old file if exists
      if (existingOrder.rows.length > 0 && existingOrder.rows[0].file_path) {
        const oldFilePath = path.join(__dirname, '..', existingOrder.rows[0].file_path);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
    } else if (link !== undefined) {
      updates.push(`link = $${paramCount++}`);
      values.push(link);
      // If link is being set and no file upload, clear file_path
      updates.push(`file_path = $${paramCount++}`);
      values.push(null);
    }
    
    if (display_order !== undefined) {
      updates.push(`display_order = $${paramCount++}`);
      values.push(display_order);
    }
    
    if (updates.length === 0) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ error: 'No fields to update' });
    }
    
    values.push(id);
    const query = `UPDATE orders SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`;
    
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/orders/:id - Delete order and associated file (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get order to delete associated file
    const orderResult = await pool.query('SELECT file_path FROM orders WHERE id = $1', [id]);
    
    if (orderResult.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Delete associated file if exists
    if (orderResult.rows[0].file_path) {
      const filePath = path.join(__dirname, '..', orderResult.rows[0].file_path);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    const result = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING *', [id]);
    
    res.json({ message: 'Order deleted successfully', order: result.rows[0] });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

