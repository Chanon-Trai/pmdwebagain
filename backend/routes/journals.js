const express = require('express');
const router = express.Router();
const pool = require('../database/db');
const { authenticateToken } = require('../middleware/auth');

// GET /api/journals - Fetch all journals
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM journals ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching journals:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/journals/:id - Fetch single journal
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM journals WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Journal not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching journal:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/journals - Create journal (protected)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { month, title, text, hyperlink } = req.body;
    
    if (!month || !title) {
      return res.status(400).json({ error: 'Month and title are required' });
    }
    
    const result = await pool.query(
      'INSERT INTO journals (month, title, text, hyperlink) VALUES ($1, $2, $3, $4) RETURNING *',
      [month, title, text || null, hyperlink || null]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating journal:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/journals/:id - Update journal (protected)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { month, title, text, hyperlink } = req.body;
    
    const result = await pool.query(
      'UPDATE journals SET month = $1, title = $2, text = $3, hyperlink = $4 WHERE id = $5 RETURNING *',
      [month, title, text || null, hyperlink || null, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Journal not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating journal:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/journals/:id - Delete journal (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM journals WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Journal not found' });
    }
    
    res.json({ message: 'Journal deleted successfully', journal: result.rows[0] });
  } catch (error) {
    console.error('Error deleting journal:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

