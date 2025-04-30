(function() {
  console.log('⚡⚡⚡ BRL DIRECT AUTO-LOGIN ACTIVATED ⚡⚡⚡');
  
  // Helper function to show messages on the page
  function showMessage(message, type = 'info') {
    console.log('PORTAL MESSAGE:', message);
    
    // Try to create a notification element
    try {
      const notificationId = 'brl-auto-login-notification';
      let notification = document.getElementById(notificationId);
      
      if (!notification) {
        notification = document.createElement('div');
        notification.id = notificationId;
        notification.style.position = 'fixed';
        notification.style.top = '10px';
        notification.style.right = '10px';
        notification.style.padding = '10px 15px';
        notification.style.background = type === 'error' ? '#f8d7da' : '#d4edda';
        notification.style.color = type === 'error' ? '#721c24' : '#155724';
        notification.style.border = `1px solid ${type === 'error' ? '#f5c6cb' : '#c3e6cb'}`;
        notification.style.borderRadius = '4px';
        notification.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        notification.style.zIndex = '9999';
        notification.style.maxWidth = '300px';
        notification.style.fontSize = '14px';
        document.body.appendChild(notification);
      }
      
      notification.textContent = message;
      
      // Auto-remove after 5 seconds
      setTimeout(() => {
        if (notification && notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 5000);
    } catch (e) {
      // Silently fail if we can't show notification
      console.error('Failed to create notification:', e);
    }
  }
  
  // Check when DOM is ready
  function onDomReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }
  
  // Get credentials from URL parameters
  function getCredentialsFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const accountCode = urlParams.get('AccountCode');
    const password = urlParams.get('Password');
    
    if (accountCode && password) {
      return { accountCode, password };
    }
    
    // Legacy field names
    const insuredAccountNumber = urlParams.get('InsuredAccountNumber');
    const insuredLoginPassword = urlParams.get('InsuredLoginPassword');
    
    if (insuredAccountNumber && insuredLoginPassword) {
      return { 
        accountCode: insuredAccountNumber, 
        password: insuredLoginPassword 
      };
    }
    
    return null;
  }
  
  // Try to find and fill the login form
  function fillLoginForm(credentials) {
    console.log('🔍 Looking for login form fields...');
    
    // Define possible field selectors in order of preference
    const accountSelectors = [
      'input[name="AccountCode"]',
      'input[name="InsuredAccountNumber"]',
      'input[name="account"]',
      'input[name="username"]',
      'input[type="text"]'
    ];
    
    const passwordSelectors = [
      'input[name="Password"]',
      'input[name="InsuredLoginPassword"]',
      'input[name="password"]',
      'input[type="password"]'
    ];
    
    // Find account field
    let accountField = null;
    for (const selector of accountSelectors) {
      accountField = document.querySelector(selector);
      if (accountField) {
        console.log(`✓ Found account field using selector: ${selector}`);
        break;
      }
    }
    
    // Find password field
    let passwordField = null;
    for (const selector of passwordSelectors) {
      passwordField = document.querySelector(selector);
      if (passwordField) {
        console.log(`✓ Found password field using selector: ${selector}`);
        break;
      }
    }
    
    // Find submit button
    const submitButton = document.querySelector('input[type="submit"], button[type="submit"], button:contains("Login"), button:contains("Submit")');
    
    // Fill form if found
    let success = false;
    
    if (accountField && credentials.accountCode) {
      accountField.value = credentials.accountCode;
      console.log('✓ Filled account field');
      success = true;
    } else {
      console.warn('⚠️ Could not find account field or no account code provided');
    }
    
    if (passwordField && credentials.password) {
      passwordField.value = credentials.password;
      console.log('✓ Filled password field');
      success = true;
    } else {
      console.warn('⚠️ Could not find password field or no password provided');
    }
    
    if (!success) {
      console.warn('⚠️ Could not fill any form fields');
      showMessage('Could not find login form fields. Please log in manually.', 'error');
      return false;
    }
    
    // Submit form if submit button found
    if (submitButton) {
      console.log('✓ Found submit button, clicking it...');
      showMessage('Login form filled, submitting...');
      
      // Short delay to ensure fields are filled before submission
      setTimeout(() => {
        submitButton.click();
      }, 500);
      
      return true;
    } else {
      console.warn('⚠️ Could not find submit button');
      showMessage('Login form filled but could not find submit button. Please submit manually.');
      
      // Try to find and submit the form directly
      const form = accountField.closest('form');
      if (form) {
        console.log('✓ Found form, submitting directly...');
        setTimeout(() => {
          form.submit();
        }, 500);
        return true;
      }
      
      return false;
    }
  }
  
  // Check if we need to click on the portal type button first
  function navigateToLoginForm() {
    // Look for Insured button
    const buttons = Array.from(document.querySelectorAll('button, input[type="submit"]'));
    const insuredButton = buttons.find(btn => 
      btn.textContent?.trim() === 'Insured' || 
      btn.value?.trim() === 'Insured'
    );
    
    if (insuredButton) {
      console.log('✓ Found Insured button, clicking it to reveal login form...');
      showMessage('Navigating to login form...');
      insuredButton.click();
      return true;
    }
    
    // Look for submenu link as fallback
    const submenuLink = document.querySelector('a[href*="Insured"], a[href*="Login"]');
    if (submenuLink) {
      console.log('✓ Found login link, clicking it to navigate to login form...');
      showMessage('Navigating to login form...');
      submenuLink.click();
      return true;
    }
    
    return false;
  }
  
  // Main init function
  function init() {
    console.log('🚀 Direct injector initializing...');
    console.log('📄 Page URL:', window.location.href);
    console.log('📄 Page title:', document.title);
    
    // Get credentials
    const credentials = getCredentialsFromUrl();
    
    if (!credentials) {
      console.log('⚠️ No credentials found in URL parameters');
      return;
    }
    
    console.log('✓ Found credentials in URL parameters');
    
    // Check if we're on a login form page or need to navigate to it
    const hasLoginForm = 
      document.querySelector('input[name="AccountCode"]') !== null || 
      document.querySelector('input[name="InsuredAccountNumber"]') !== null ||
      document.querySelector('input[type="password"]') !== null;
    
    if (hasLoginForm) {
      // We're already on the login form page, fill it
      console.log('✓ Already on login form page');
      fillLoginForm(credentials);
    } else {
      // Need to navigate to login form first
      console.log('⚠️ Not on login form page, attempting to navigate...');
      
      if (navigateToLoginForm()) {
        // Set a timeout to check for form after navigation
        setTimeout(() => {
          const hasFormAfterNav = 
            document.querySelector('input[name="AccountCode"]') !== null || 
            document.querySelector('input[name="InsuredAccountNumber"]') !== null ||
            document.querySelector('input[type="password"]') !== null;
          
          if (hasFormAfterNav) {
            console.log('✓ Login form found after navigation');
            fillLoginForm(credentials);
          } else {
            console.warn('⚠️ Login form not found after navigation');
            showMessage('Could not find login form. Please login manually.', 'error');
          }
        }, 1000);
      } else {
        console.warn('⚠️ Could not find navigation elements to login form');
        showMessage('Could not find login page navigation. Please login manually.', 'error');
      }
    }
  }
  
  // Initialize when DOM is ready
  onDomReady(init);
})();