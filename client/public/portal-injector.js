// Portal Injector - Enhanced version with multiple fallback strategies
// This script uses multiple methods to ensure credentials are passed to the portal form

(function() {
  console.log('⚡⚡⚡ PORTAL AUTO-LOGIN v2 ACTIVATED ⚡⚡⚡');
  
  // Create visual message to show progress (helps debugging)
  function showMessage(message, type = 'info') {
    try {
      console.log('PORTAL MESSAGE:', message);
      
      // Create message element
      const msgEl = document.createElement('div');
      msgEl.textContent = message;
      msgEl.style.position = 'fixed';
      msgEl.style.top = '10px';
      msgEl.style.left = '10px';
      msgEl.style.padding = '10px 15px';
      msgEl.style.borderRadius = '4px';
      msgEl.style.zIndex = '9999999';
      msgEl.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
      msgEl.style.fontFamily = 'Arial, sans-serif';
      msgEl.style.fontSize = '14px';
      
      // Style based on type
      if (type === 'info') {
        msgEl.style.backgroundColor = '#d4edda';
        msgEl.style.color = '#155724';
        msgEl.style.border = '1px solid #c3e6cb';
      } else if (type === 'error') {
        msgEl.style.backgroundColor = '#f8d7da';
        msgEl.style.color = '#721c24';
        msgEl.style.border = '1px solid #f5c6cb';
      } else if (type === 'warning') {
        msgEl.style.backgroundColor = '#fff3cd';
        msgEl.style.color = '#856404';
        msgEl.style.border = '1px solid #ffeeba';
      }
      
      // Add to body
      document.body.appendChild(msgEl);
      
      // Remove after 5 seconds
      setTimeout(() => {
        document.body.removeChild(msgEl);
      }, 5000);
    } catch (e) {
      console.error('Error showing message:', e);
    }
  }
  
  // Get credentials from URL parameters
  function getCredentialsFromUrl() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const accountCode = urlParams.get('AccountCode');
      const password = urlParams.get('Password');
      
      if (accountCode && password) {
        console.log(`⚡ Found credentials in URL: ${accountCode} / ****`);
        return { accountCode, password };
      }
    } catch (e) {
      console.error('⚠️ Error getting credentials from URL:', e);
    }
    return null;
  }
  
  // Get credentials from localStorage
  function getCredentialsFromStorage() {
    try {
      const stored = localStorage.getItem('brl_credentials');
      if (stored) {
        const credentials = JSON.parse(stored);
        console.log(`⚡ Found credentials in localStorage: ${credentials.accountCode} / ****`);
        return credentials;
      }
    } catch (e) {
      console.error('⚠️ Error getting credentials from localStorage:', e);
    }
    return null;
  }
  
  // Get all inputs on the page for debugging
  function debugFormElements() {
    try {
      console.log('==== DEBUGGING FORM ELEMENTS ====');
      // Show all forms on the page
      const forms = document.forms;
      console.log(`Found ${forms.length} forms on page:`);
      
      for (let i = 0; i < forms.length; i++) {
        console.log(`Form #${i+1}:`, forms[i]);
        console.log(`Form #${i+1} action:`, forms[i].action);
        console.log(`Form #${i+1} method:`, forms[i].method);
      }
      
      // Show all input elements on the page
      const inputs = document.querySelectorAll('input');
      console.log(`Found ${inputs.length} input elements on page:`);
      
      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        console.log(`Input #${i+1}:`, input);
        console.log(`Input #${i+1} type:`, input.type);
        console.log(`Input #${i+1} name:`, input.name);
        console.log(`Input #${i+1} id:`, input.id);
      }
      
      // Show all buttons on the page
      const buttons = document.querySelectorAll('button, input[type="submit"], input[type="button"]');
      console.log(`Found ${buttons.length} button elements on page:`);
      
      for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        console.log(`Button #${i+1}:`, button);
        console.log(`Button #${i+1} type:`, button.type);
        console.log(`Button #${i+1} text:`, button.textContent || button.value);
      }
      console.log('==== END DEBUGGING ====');
    } catch (e) {
      console.error('⚠️ Error debugging form elements:', e);
    }
  }
  
  // Function to find DOM elements by multiple strategies
  function findFormElements() {
    // Debug all form elements first
    debugFormElements();
    
    // ACCOUNT CODE FIELD - EXACT PORTAL FIELDS FIRST, then try many different selectors
    const accountCodeSelectors = [
      // EXACT PORTAL FIELD NAME - This is the actual field name in the portal
      'input[name="InsuredAccountNumber"]',
      'input[id="InsuredAccountNumber"]',
      // Regular field name guesses as backup
      'input[name="AccountCode"]',
      'input[id="AccountCode"]',
      'input[name="accountcode"]',
      'input[id="accountcode"]',
      'input[name="account"]',
      'input[id="account"]',
      'input[name="username"]',
      'input[id="username"]',
      'input[name="user"]',
      'input[id="user"]',
      'input[name="agentcode"]',
      'input[id="agentcode"]',
      'input[placeholder*="account" i]',
      'input[placeholder*="code" i]',
      'input[placeholder*="user" i]',
      'input[type="text"]'
    ];
    
    // PASSWORD FIELD - EXACT PORTAL FIELDS FIRST, then try many different selectors
    const passwordSelectors = [
      // EXACT PORTAL FIELD NAME - This is the actual field name in the portal
      'input[name="InsuredLoginPassword"]',
      'input[id="InsuredLoginPassword"]',
      // Regular field name guesses as backup
      'input[name="Password"]',
      'input[id="Password"]',
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
    
    // SUBMIT BUTTON - try many different selectors
    const submitSelectors = [
      'input[type="submit"]',
      'button[type="submit"]',
      'input[value="Submit"]',
      'input[value="Login"]',
      'input[value="Sign In"]',
      'input[value="Enter"]',
      'button[name="submit"]',
      'button[id="submit"]',
      'button[name="login"]',
      'button[id="login"]',
      'input[name="submit"]',
      'input[id="submit"]',
      'input[name="login"]',
      'input[id="login"]',
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
    
    // Try to find elements
    let accountField = null;
    let passwordField = null;
    let submitButton = null;
    
    // Find account field
    for (const selector of accountCodeSelectors) {
      try {
        const el = document.querySelector(selector);
        if (el) {
          accountField = el;
          console.log(`⚡ Found account field with selector: ${selector}`);
          break;
        }
      } catch (e) {
        // Ignore errors for individual selectors
      }
    }
    
    // Find password field
    for (const selector of passwordSelectors) {
      try {
        const el = document.querySelector(selector);
        if (el) {
          passwordField = el;
          console.log(`⚡ Found password field with selector: ${selector}`);
          break;
        }
      } catch (e) {
        // Ignore errors for individual selectors
      }
    }
    
    // Find submit button
    for (const selector of submitSelectors) {
      try {
        const el = document.querySelector(selector);
        if (el) {
          submitButton = el;
          console.log(`⚡ Found submit button with selector: ${selector}`);
          break;
        }
      } catch (e) {
        // Ignore errors for individual selectors
      }
    }
    
    // If no submit button found yet, try the most generic approach as last resort
    if (!submitButton) {
      // Look for anything that looks like a button
      const possibleButtons = document.querySelectorAll('button, input[type="submit"], input[type="button"], a.button, .btn, .button');
      
      for (const btn of possibleButtons) {
        // Check if the text content suggests it's a login/submit button
        const btnText = (btn.textContent || btn.value || '').toLowerCase();
        if (btnText.includes('login') || btnText.includes('submit') || btnText.includes('sign in') || btnText.includes('enter')) {
          submitButton = btn;
          console.log('⚡ Found submit button by generic button search');
          break;
        }
      }
    }
    
    return { accountField, passwordField, submitButton };
  }
  
  // Fill and submit the login form
  function autoFillAndSubmit() {
    showMessage('BRL Financial Auto-Login: Attempting to fill login form...', 'info');
    console.log('⚡ Attempting to auto-fill login form with credentials');
    
    try {
      // Get credentials, trying URL params first, then localStorage
      let credentials = getCredentialsFromUrl() || getCredentialsFromStorage();
      
      if (!credentials) {
        console.warn('⚠️ No credentials found in URL or localStorage');
        showMessage('No login credentials found. Please login manually.', 'warning');
        return;
      }
      
      // Find form elements
      const { accountField, passwordField, submitButton } = findFormElements();
      
      // Fill in the form if fields were found
      let filledForm = false;
      
      if (accountField && credentials.accountCode) {
        // Fill account field
        accountField.value = credentials.accountCode;
        
        // Trigger input events to notify any scripts monitoring the input
        const events = ['input', 'change', 'blur'];
        events.forEach(eventType => {
          const event = new Event(eventType, { bubbles: true });
          accountField.dispatchEvent(event);
        });
        
        console.log('⚡ Account field filled with:', credentials.accountCode);
        filledForm = true;
      } else {
        console.warn('⚠️ Could not find account field or no account code provided');
      }
      
      if (passwordField && credentials.password) {
        // Fill password field
        passwordField.value = credentials.password;
        
        // Trigger input events to notify any scripts monitoring the input
        const events = ['input', 'change', 'blur'];
        events.forEach(eventType => {
          const event = new Event(eventType, { bubbles: true });
          passwordField.dispatchEvent(event);
        });
        
        console.log('⚡ Password field filled with: ****');
        filledForm = true;
      } else {
        console.warn('⚠️ Could not find password field or no password provided');
      }
      
      // If we successfully filled at least one field
      if (filledForm) {
        showMessage('Login credentials filled automatically', 'info');
        
        // Submit the form
        if (submitButton) {
          console.log('⚡ Found submit button, clicking...');
          showMessage('Submitting login form...', 'info');
          
          // Try multiple techniques to click the button
          setTimeout(() => {
            try {
              // First, try a direct click()
              submitButton.click();
              console.log('⚡ Submit button clicked with direct click()');
            } catch (clickError) {
              console.warn('⚠️ Direct click() failed, trying other methods', clickError);
              
              try {
                // Try to submit via form
                const form = accountField?.form || passwordField?.form;
                if (form) {
                  form.submit();
                  console.log('⚡ Form submitted directly with form.submit()');
                } else {
                  // If we still can't find the form, try with a synthetic mouse event
                  console.log('⚡ No form found, trying with synthetic mouse event');
                  
                  // Create and dispatch a mouse event
                  const mouseEvent = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                  });
                  submitButton.dispatchEvent(mouseEvent);
                  console.log('⚡ Synthetic mouse event dispatched to submit button');
                }
              } catch (formError) {
                console.error('❌ All submission approaches failed', formError);
                showMessage('Form filled but could not submit automatically. Please click the login button manually.', 'warning');
              }
            }
          }, 500);
        } else {
          console.warn('⚠️ Could not find submit button');
          showMessage('Form filled but could not find submit button. Please click login button manually.', 'warning');
          
          // Try to find the form and submit it directly
          const form = accountField?.form || passwordField?.form;
          if (form) {
            try {
              console.log('⚡ Attempting to submit form directly');
              form.submit();
              console.log('⚡ Form submitted directly');
            } catch (formError) {
              console.error('❌ Error submitting form directly:', formError);
            }
          } else {
            console.warn('⚠️ Could not find form to submit');
          }
        }
      } else {
        console.warn('⚠️ Could not fill any form fields');
        showMessage('Could not find the login form. Please login manually.', 'error');
      }
    } catch (error) {
      console.error('❌ Error in auto-fill process:', error);
      showMessage('An error occurred during auto-login. Please login manually.', 'error');
    }
  }
  
  // Retry multiple times with increasing delays
  function retryWithBackoff(fn, maxRetries = 5, delayMs = 300) {
    let attemptCount = 0;
    
    function tryAttempt() {
      if (attemptCount >= maxRetries) {
        console.warn(`⚠️ Maximum retry attempts (${maxRetries}) reached`);
        return;
      }
      
      attemptCount++;
      const delay = delayMs * Math.pow(1.5, attemptCount - 1); // Exponential backoff
      
      console.log(`⚡ Attempt ${attemptCount}/${maxRetries} (delay: ${delay}ms)`);
      setTimeout(() => {
        try {
          fn();
        } catch (e) {
          console.error(`❌ Error during attempt ${attemptCount}:`, e);
        }
      }, delay);
    }
    
    // Start the first attempt
    tryAttempt();
  }
  
  // Main initialization
  function init() {
    console.log('🚀 Portal injector initializing...');
    
    // Debug page info
    console.log('📄 Page URL:', window.location.href);
    console.log('📄 Page title:', document.title);
    console.log('📄 Referrer:', document.referrer);
    
    // Try multiple times with different delays to handle various page load scenarios
    retryWithBackoff(autoFillAndSubmit, 5, 500);
  }
  
  // Handle various page load scenarios
  if (document.readyState === 'loading') {
    // If document still loading, wait for it to be ready
    document.addEventListener('DOMContentLoaded', init);
    console.log('⚡ Waiting for DOMContentLoaded event');
  } else {
    // If document already loaded, initialize immediately
    console.log('⚡ Document already loaded, initializing immediately');
    init();
  }
  
  // Also try again after a delay in case dynamic content is loaded
  setTimeout(init, 1000);
})();