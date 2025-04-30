// Enhanced bookmarklet for direct portal credentials injection
// This provides a backup method for auto-filling portal credentials

javascript:(function() {
  console.log('BRL FINANCIAL PORTAL AUTO-LOGIN BOOKMARKLET v2.0');
  
  // Show a visible message to the user - critical for debugging
  function showPortalMessage(message, type = 'info') {
    console.log('PORTAL MESSAGE:', message);
    
    try {
      const messageDiv = document.createElement('div');
      messageDiv.style.position = 'fixed';
      messageDiv.style.top = '10px';
      messageDiv.style.left = '10px'; // Left aligned for better visibility
      messageDiv.style.padding = '10px 15px';
      messageDiv.style.borderRadius = '4px';
      messageDiv.style.zIndex = '999999'; // Super high z-index to be above everything
      messageDiv.style.fontFamily = 'Arial, sans-serif';
      messageDiv.style.fontSize = '14px';
      messageDiv.style.boxShadow = '0 3px 10px rgba(0,0,0,0.3)';
      messageDiv.style.maxWidth = '80%';
      messageDiv.style.wordWrap = 'break-word';
      
      // Style based on message type
      if (type === 'info') {
        messageDiv.style.backgroundColor = '#d4edda';
        messageDiv.style.color = '#155724';
        messageDiv.style.border = '1px solid #c3e6cb';
      } else if (type === 'error') {
        messageDiv.style.backgroundColor = '#f8d7da';
        messageDiv.style.color = '#721c24';
        messageDiv.style.border = '1px solid #f5c6cb';
      } else if (type === 'warning') {
        messageDiv.style.backgroundColor = '#fff3cd';
        messageDiv.style.color = '#856404';
        messageDiv.style.border = '1px solid #ffeeba';
      } else if (type === 'success') {
        messageDiv.style.backgroundColor = '#cce5ff';
        messageDiv.style.color = '#004085';
        messageDiv.style.border = '1px solid #b8daff';
      }
      
      messageDiv.textContent = message;
      document.body.appendChild(messageDiv);
      
      // Remove the message after 10 seconds
      setTimeout(() => {
        if (document.body.contains(messageDiv)) {
          document.body.removeChild(messageDiv);
        }
      }, 10000);
    } catch (e) {
      console.error('Error showing message:', e);
    }
  }
  
  // Debug function to show all forms and inputs on the page
  function debugForms() {
    console.log('==== DEBUGGING ALL FORMS AND INPUTS ====');
    try {
      // Log all forms
      const forms = document.forms;
      console.log(`Found ${forms.length} forms on page`);
      
      for (let i = 0; i < forms.length; i++) {
        const form = forms[i];
        console.log(`Form #${i+1}:`, form);
        console.log(`- Action: ${form.action}`);
        console.log(`- Method: ${form.method}`);
        console.log(`- Elements: ${form.elements.length}`);
      }
      
      // Log all inputs
      const inputs = document.querySelectorAll('input');
      console.log(`Found ${inputs.length} input elements on page`);
      
      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        console.log(`Input #${i+1}:`, input);
        console.log(`- Type: ${input.type}`);
        console.log(`- Name: ${input.name}`);
        console.log(`- ID: ${input.id}`);
        console.log(`- Value: ${input.value}`);
      }
      
      // Log all buttons
      const buttons = document.querySelectorAll('button, input[type="submit"], input[type="button"]');
      console.log(`Found ${buttons.length} button elements on page`);
      
      for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        console.log(`Button #${i+1}:`, button);
        console.log(`- Type: ${button.type}`);
        console.log(`- Text: ${button.textContent || button.value}`);
      }
    } catch (e) {
      console.error('Error debugging forms:', e);
    }
    console.log('==== END FORM DEBUGGING ====');
  }
  
  // Try multiple methods to get credentials
  function getCredentials() {
    console.log('Attempting to retrieve login credentials...');
    
    // Method 1: Get from URL parameters
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const accountCode = urlParams.get('AccountCode');
      const password = urlParams.get('Password');
      
      if (accountCode && password) {
        console.log(`Found credentials in URL: ${accountCode} / ****`);
        return { accountCode, password, source: 'url' };
      }
    } catch (e) {
      console.warn('Error getting credentials from URL:', e);
    }
    
    // Method 2: Get from localStorage
    try {
      const storedCredentials = localStorage.getItem('brl_credentials');
      if (storedCredentials) {
        const credentials = JSON.parse(storedCredentials);
        console.log(`Found credentials in localStorage: ${credentials.accountCode} / ****`);
        return { ...credentials, source: 'localStorage' };
      }
    } catch (e) {
      console.warn('Error getting credentials from localStorage:', e);
    }
    
    // Method 3: Hardcoded default for this specific session (will be removed in production)
    if (window.location.hostname.includes('fmweb3.com')) {
      console.log('Using provided test credentials for this login attempt');
      return { 
        accountCode: 'WB04384', 
        password: '7542452069',
        source: 'hardcoded'
      };
    }
    
    console.warn('No credentials found by any method');
    return null;
  }
  
  // Find form elements using multiple strategies
  function findFormElements() {
    // Debug all forms first to help troubleshooting
    debugForms();
    
    console.log('Searching for login form elements...');
    
    // Define selectors for form fields in order of specificity
    const accountSelectors = [
      'input[name="AccountCode"]',
      'input[id="AccountCode"]',
      'input[name="ACCOUNTCODE"]', 
      'input[name="accountcode"]',
      'input[id="accountcode"]',
      'input[name="account"]',
      'input[id="account"]',
      'input[name="user"]',
      'input[id="user"]',
      'input[name="username"]',
      'input[id="username"]',
      'input[name="email"]',
      'input[id="email"]',
      'input[placeholder*="account" i]',
      'input[placeholder*="code" i]',
      'input[placeholder*="user" i]',
      'input[placeholder*="email" i]',
      'input[type="text"]'
    ];
    
    const passwordSelectors = [
      'input[name="Password"]',
      'input[id="Password"]',
      'input[name="PASSWORD"]',
      'input[name="password"]',
      'input[id="password"]',
      'input[name="pass"]',
      'input[id="pass"]',
      'input[name="pwd"]',
      'input[id="pwd"]',
      'input[placeholder*="password" i]',
      'input[placeholder*="pass" i]',
      'input[type="password"]'
    ];
    
    const submitSelectors = [
      'input[type="submit"]',
      'button[type="submit"]',
      'input[value="Submit"]',
      'input[value="Login"]',
      'input[value="Sign In"]',
      'input[value="Log In"]',
      'input[value="Enter"]',
      'button[name="submit"]',
      'button[id="submit"]',
      'button[name="login"]',
      'button[id="login"]',
      'input[name="submit"]',
      'input[id="submit"]',
      'input[name="login"]',
      'input[id="login"]',
      'input[name="Submit"]',
      'input[id="Submit"]',
      'button:contains("Login")',
      'button:contains("Submit")',
      'button:contains("Sign In")',
      'button:contains("Enter")',
      'a.login-button',
      'a.submit-button',
      'a[href*="login"]',
      'a[onclick*="login"]',
      'a[onclick*="submit"]'
    ];
    
    // Find account field
    let accountField = null;
    for (const selector of accountSelectors) {
      try {
        const field = document.querySelector(selector);
        if (field) {
          accountField = field;
          console.log(`Found account field with selector: ${selector}`);
          break;
        }
      } catch (e) {
        // Ignore individual selector errors
      }
    }
    
    // Find password field
    let passwordField = null;
    for (const selector of passwordSelectors) {
      try {
        const field = document.querySelector(selector);
        if (field) {
          passwordField = field;
          console.log(`Found password field with selector: ${selector}`);
          break;
        }
      } catch (e) {
        // Ignore individual selector errors
      }
    }
    
    // Find submit button
    let submitButton = null;
    for (const selector of submitSelectors) {
      try {
        const button = document.querySelector(selector);
        if (button) {
          submitButton = button;
          console.log(`Found submit button with selector: ${selector}`);
          break;
        }
      } catch (e) {
        // Ignore individual selector errors
      }
    }
    
    // If we still don't have a submit button, look for anything that resembles one
    if (!submitButton) {
      // Get all buttons and links
      const allButtons = Array.from(document.querySelectorAll('button, input[type="submit"], input[type="button"], a.button, .btn, .button, a[href="#"]'));
      
      // Look for text that suggests it's a login button
      for (const btn of allButtons) {
        const text = (btn.textContent || btn.value || '').toLowerCase();
        if (text.includes('login') || text.includes('submit') || text.includes('sign in') || text.includes('enter')) {
          submitButton = btn;
          console.log('Found submit button by text content analysis');
          break;
        }
      }
      
      // If still not found, just take the first button in the same form
      if (!submitButton && accountField && accountField.form) {
        const formButtons = accountField.form.querySelectorAll('button, input[type="submit"], input[type="button"]');
        if (formButtons.length > 0) {
          submitButton = formButtons[0];
          console.log('Found submit button as first button in form');
        }
      }
    }
    
    return { accountField, passwordField, submitButton };
  }
  
  // Fill form fields and submit
  function fillAndSubmitForm(credentials) {
    console.log('Filling form with credentials...');
    showPortalMessage('BRL Financial Portal: Auto-filling login form...', 'info');
    
    // Find the form elements
    const { accountField, passwordField, submitButton } = findFormElements();
    
    let success = false;
    
    // Fill account field
    if (accountField && credentials.accountCode) {
      try {
        // Set the value
        accountField.value = credentials.accountCode;
        
        // Trigger events to simulate typing
        ['input', 'change', 'blur'].forEach(eventType => {
          const event = new Event(eventType, { bubbles: true });
          accountField.dispatchEvent(event);
        });
        
        console.log(`Account field filled with: ${credentials.accountCode}`);
        success = true;
        
        // If this is an input field that has a parent element, highlight it briefly
        if (accountField.parentElement) {
          const originalBg = accountField.style.backgroundColor;
          accountField.style.backgroundColor = '#cce5ff';
          setTimeout(() => {
            accountField.style.backgroundColor = originalBg;
          }, 1000);
        }
      } catch (e) {
        console.error('Error filling account field:', e);
      }
    } else {
      console.warn('Account field not found or no account code provided');
    }
    
    // Fill password field
    if (passwordField && credentials.password) {
      try {
        // Set the value
        passwordField.value = credentials.password;
        
        // Trigger events to simulate typing
        ['input', 'change', 'blur'].forEach(eventType => {
          const event = new Event(eventType, { bubbles: true });
          passwordField.dispatchEvent(event);
        });
        
        console.log('Password field filled');
        success = true;
        
        // If this is an input field that has a parent element, highlight it briefly
        if (passwordField.parentElement) {
          const originalBg = passwordField.style.backgroundColor;
          passwordField.style.backgroundColor = '#cce5ff';
          setTimeout(() => {
            passwordField.style.backgroundColor = originalBg;
          }, 1000);
        }
      } catch (e) {
        console.error('Error filling password field:', e);
      }
    } else {
      console.warn('Password field not found or no password provided');
    }
    
    // If we successfully filled at least one field
    if (success) {
      showPortalMessage('BRL Financial Portal: Login form filled successfully!', 'success');
      
      // Submit the form
      console.log('Attempting to submit the form...');
      
      // Function to try different form submission methods
      const trySubmit = () => {
        // Method 1: Click the submit button
        if (submitButton) {
          try {
            console.log('Clicking submit button...');
            submitButton.click();
            console.log('Submit button clicked successfully');
            showPortalMessage('BRL Financial Portal: Form submitted!', 'success');
            return true;
          } catch (e) {
            console.warn('Error clicking submit button:', e);
          }
        }
        
        // Method 2: Submit the form directly
        try {
          const form = accountField?.form || passwordField?.form;
          if (form) {
            console.log('Submitting form directly...');
            form.submit();
            console.log('Form submitted successfully');
            showPortalMessage('BRL Financial Portal: Form submitted!', 'success');
            return true;
          }
        } catch (e) {
          console.warn('Error submitting form directly:', e);
        }
        
        // Method 3: Create a synthetic click event
        if (submitButton) {
          try {
            console.log('Creating synthetic click event...');
            const clickEvent = new MouseEvent('click', {
              view: window,
              bubbles: true,
              cancelable: true
            });
            submitButton.dispatchEvent(clickEvent);
            console.log('Synthetic click event dispatched');
            showPortalMessage('BRL Financial Portal: Form submitted via synthetic event!', 'success');
            return true;
          } catch (e) {
            console.warn('Error dispatching synthetic click event:', e);
          }
        }
        
        console.warn('All submission methods failed');
        showPortalMessage('BRL Financial Portal: Form filled but submission failed. Please click Login manually.', 'warning');
        return false;
      };
      
      // Wait a short time before submitting to ensure everything is ready
      setTimeout(trySubmit, 500);
    } else {
      console.error('Failed to fill any form fields');
      showPortalMessage('BRL Financial Portal: Could not find login form fields. Try refreshing the page.', 'error');
    }
  }
  
  // Main function
  function main() {
    console.log('BRL Financial Portal Auto-Login starting...');
    showPortalMessage('BRL Financial Portal Auto-Login', 'info');
    
    // Get credentials
    const credentials = getCredentials();
    
    if (!credentials) {
      console.error('No credentials found');
      showPortalMessage('BRL Financial Portal: No login credentials found. Please login manually.', 'error');
      return;
    }
    
    console.log(`Using credentials from ${credentials.source}`);
    fillAndSubmitForm(credentials);
  }
  
  // Execute on page load and retry with backoff
  function executeWithRetry(maxAttempts = 5) {
    let attempt = 0;
    
    function attemptExecution() {
      attempt++;
      console.log(`Attempt ${attempt}/${maxAttempts}`);
      
      try {
        main();
      } catch (e) {
        console.error(`Error in attempt ${attempt}:`, e);
        
        if (attempt < maxAttempts) {
          const delay = 500 * Math.pow(1.5, attempt - 1); // Exponential backoff
          console.log(`Retrying in ${delay}ms...`);
          setTimeout(attemptExecution, delay);
        } else {
          console.error(`Failed after ${maxAttempts} attempts`);
          showPortalMessage('BRL Financial Portal: Auto-login failed after multiple attempts. Please login manually.', 'error');
        }
      }
    }
    
    // Start execution
    attemptExecution();
  }
  
  // Start the execution with retry logic
  executeWithRetry();
})();