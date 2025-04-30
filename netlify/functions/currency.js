// Netlify serverless function for fetching currency exchange rate
const axios = require('axios');

// Cache mechanism to avoid hitting API limits
let cachedData = null;
let cacheTime = 0;
const CACHE_DURATION = 60 * 1000; // 1 minute cache

exports.handler = async function(event, context) {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Preflight request successful' })
    };
  }

  try {
    // Check if we have valid cached data
    const now = Date.now();
    if (cachedData && now - cacheTime < CACHE_DURATION) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(cachedData)
      };
    }

    // Using a free exchange rate API
    const response = await axios.get('https://open.er-api.com/v6/latest/USD');
    
    // Extract BRL rate
    const currentRate = response.data.rates.BRL;
    
    // Generate a small random change for demonstration purposes
    // In a real app, we would fetch historical data to calculate this
    const previousRate = cachedData ? cachedData.rate : currentRate * (1 - (Math.random() * 0.02 - 0.01));
    const change = currentRate - previousRate;
    
    const result = {
      success: true,
      timestamp: now,
      rate: currentRate,
      previous: previousRate,
      change: change
    };
    
    // Update cache
    cachedData = result;
    cacheTime = now;
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result)
    };
    
  } catch (error) {
    console.error('Failed to fetch currency exchange rate:', error);
    
    // Return last cached data if available, or fallback data
    if (cachedData) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          ...cachedData,
          success: false
        })
      };
    }
    
    // Fallback to realistic values if API fails
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: false,
        timestamp: Date.now(),
        rate: 5.0543, // Approximate USD to BRL rate as of April 2025
        previous: 5.0498,
        change: 0.0045
      })
    };
  }
};