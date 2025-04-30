(function() {
  console.log('💎 BRL Financial Portal Token Handler initializing...');
  
  /**
   * Gets the token from URL parameters
   * @returns {string|null} The token or null if not found
   */
  function getTokenFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('token');
  }
  
  /**
   * Validates the token with the BRL API
   * @param {string} token The token to validate
   * @returns {Promise<Object>} The response from the validation endpoint
   */
  async function validateToken(token) {
    try {
      // Replace with the actual BRL website domain in production
      const validationUrl = `https://app.brlfinancial.com/api/validate-token/${token}`;
      
      const response = await fetch(validationUrl);
      if (!response.ok) {
        throw new Error(`Token validation failed: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('❌ Token validation failed:', error);
      throw error;
    }
  }
  
  /**
   * Fills in the login form with the credentials
   * @param {Object} credentials The credentials to fill in
   */
  function fillLoginForm(credentials) {
    console.log('🔒 Filling login form with credentials...');
    
    // Find form elements
    const accountField = document.querySelector('input[name="InsuredAccountNumber"]');
    const passwordField = document.querySelector('input[name="InsuredLoginPassword"]');
    const submitButton = document.querySelector('input[type="submit"]');
    
    if (!accountField || !passwordField) {
      console.error('❌ Could not find login form fields');
      return false;
    }
    
    // Fill in the form
    accountField.value = credentials.accountCode;
    passwordField.value = credentials.password;
    
    // Log success
    console.log('✅ Form filled successfully');
    
    // Optionally auto-submit the form
    if (submitButton) {
      console.log('🚀 Auto-submitting form...');
      setTimeout(() => {
        submitButton.click();
      }, 500);
      return true;
    } else {
      console.warn('⚠️ Submit button not found, form not submitted');
      return false;
    }
  }
  
  /**
   * Wait for DOM to be ready
   * @param {Function} callback Function to call when DOM is ready
   */
  function onDomReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }
  
  /**
   * Main initialization function
   */
  function init() {
    console.log('🔍 Checking for token...');
    
    // Get token from URL
    const token = getTokenFromUrl();
    if (!token) {
      console.log('ℹ️ No token found in URL, manual login required');
      return;
    }
    
    console.log(`🔑 Token found: ${token.substring(0, 8)}...`);
    
    // Check if we already have the login form
    const hasLoginForm = document.querySelector('input[name="InsuredAccountNumber"]') !== null;
    
    if (hasLoginForm) {
      // If form is already present, validate token and fill form
      validateToken(token)
        .then(response => {
          if (response.success) {
            fillLoginForm(response.credentials);
          } else {
            console.error('❌ Token validation failed:', response.message);
          }
        })
        .catch(error => {
          console.error('❌ Error validating token:', error);
        });
    } else {
      // If form is not present, store token in sessionStorage
      // and wait for the form to be loaded
      sessionStorage.setItem('brl_auth_token', token);
      
      // Check for form every 500ms
      const formCheckInterval = setInterval(() => {
        const accountField = document.querySelector('input[name="InsuredAccountNumber"]');
        if (accountField) {
          clearInterval(formCheckInterval);
          
          // Form found, validate token and fill form
          validateToken(token)
            .then(response => {
              if (response.success) {
                fillLoginForm(response.credentials);
              } else {
                console.error('❌ Token validation failed:', response.message);
              }
            })
            .catch(error => {
              console.error('❌ Error validating token:', error);
            });
        }
      }, 500);
      
      // Stop checking after 30 seconds
      setTimeout(() => {
        clearInterval(formCheckInterval);
        console.warn('⚠️ Timed out waiting for login form');
      }, 30000);
    }
  }
  
  // Start the initialization process
  onDomReady(init);
})();