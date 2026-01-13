// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  articles: `${API_BASE_URL}/api/articles`,
  journals: `${API_BASE_URL}/api/journals`,
  cards: `${API_BASE_URL}/api/cards`,
  orders: `${API_BASE_URL}/api/orders`,
};

export default API_BASE_URL;

