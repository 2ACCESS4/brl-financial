// Configuration for API endpoints
// This file helps switch between development and production API endpoints

// Determine if we're in production (Netlify) or development
const isProduction = import.meta.env.PROD;

// Base URL for API calls
export const API_BASE_URL = isProduction 
  ? '/.netlify/functions' 
  : '/api';

// Endpoint for currency data
export const CURRENCY_ENDPOINT = `${API_BASE_URL}/currency`;

// Endpoint for statistics data
export const STATS_ENDPOINT = `${API_BASE_URL}/stats`;

// Other configuration settings
export const CONFIG = {
  statisticsRefreshInterval: 60000, // 1 minute
  currencyRefreshInterval: 30000,   // 30 seconds
};