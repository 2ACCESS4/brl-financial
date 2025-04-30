import axios from 'axios';
import { Request, Response } from 'express';

interface ExchangeRateResponse {
  success: boolean;
  timestamp: number;
  rate: number;
  change: number;
  previous: number;
}

// Cache mechanism to avoid hitting API limits
let cachedData: ExchangeRateResponse | null = null;
let cacheTime = 0;
const CACHE_DURATION = 60 * 1000; // 1 minute cache

export async function getCurrencyExchangeRate(): Promise<ExchangeRateResponse> {
  // Check if we have valid cached data
  const now = Date.now();
  if (cachedData && now - cacheTime < CACHE_DURATION) {
    return cachedData;
  }

  try {
    // Using a free exchange rate API
    const response = await axios.get('https://open.er-api.com/v6/latest/USD');
    
    // Extract BRL rate
    const currentRate = response.data.rates.BRL;
    
    // Generate a small random change for demonstration purposes
    // In a real app, we would fetch historical data to calculate this
    const previousRate = cachedData ? cachedData.rate : currentRate * (1 - (Math.random() * 0.02 - 0.01));
    const change = currentRate - previousRate;
    
    const result: ExchangeRateResponse = {
      success: true,
      timestamp: now,
      rate: currentRate,
      previous: previousRate,
      change: change
    };
    
    // Update cache
    cachedData = result;
    cacheTime = now;
    
    return result;
  } catch (error) {
    console.error('Failed to fetch currency exchange rate:', error);
    
    // Return last cached data if available, or fallback data
    if (cachedData) {
      return {
        ...cachedData,
        success: false
      };
    }
    
    // Fallback to realistic values if API fails
    return {
      success: false,
      timestamp: now,
      rate: 5.0543, // Approximate USD to BRL rate as of April 2025
      previous: 5.0498,
      change: 0.0045
    };
  }
}

export function currencyHandler(req: Request, res: Response) {
  getCurrencyExchangeRate()
    .then(data => res.json(data))
    .catch(error => {
      console.error('Error in currency handler:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch currency data'
      });
    });
}