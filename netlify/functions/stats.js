// Netlify serverless function for site statistics
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
    // For Netlify deployment, we'll use static values to start
    // In a production environment, you would connect to a database
    const stats = {
      totalVisits: 3244,  // Starting value as requested
      activeUsers: 2585,  // Starting value as requested
      registeredUsers: 4025  // Starting value as requested
    };
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(stats)
    };
    
  } catch (error) {
    console.error('Failed to fetch site statistics:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Failed to retrieve statistics"
      })
    };
  }
};