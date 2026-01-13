const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const articlesRoutes = require('./routes/articles');
const journalsRoutes = require('./routes/journals');
const cardsRoutes = require('./routes/cards');
const ordersRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');
const { authenticateToken } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Public routes
app.use('/api/auth', authRoutes);
app.use('/api/articles', articlesRoutes);
app.use('/api/journals', journalsRoutes);
app.use('/api/cards', cardsRoutes);
app.use('/api/orders', ordersRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'ฝบร. Backend API',
    version: '1.0.0',
    endpoints: {
      articles: '/api/articles',
      journals: '/api/journals',
      cards: '/api/cards',
      orders: '/api/orders',
      health: '/api/health'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoints available at:`);
  console.log(`  - Articles: http://localhost:${PORT}/api/articles`);
  console.log(`  - Journals: http://localhost:${PORT}/api/journals`);
  console.log(`  - Cards: http://localhost:${PORT}/api/cards`);
  console.log(`  - Orders: http://localhost:${PORT}/api/orders`);
});

