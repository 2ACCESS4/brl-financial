import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface AILoginCredentials {
  portalType: string;
  accountCode: string;
  password: string;
  language?: string;
}

interface AILoginResponse {
  success: boolean;
  message: string;
  formData: Record<string, string>;
  endpoint: string;
  usePortalInjector?: boolean;
  storedCredentials?: {
    accountCode: string;
    password: string;
    portalType: string;
  };
}

export function useAILogin() {
  const { toast } = useToast();
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  // Create the login mutation
  const aiLoginMutation = useMutation({
    mutationFn: async (credentials: AILoginCredentials): Promise<AILoginResponse> => {
      const res = await apiRequest('POST', '/api/ai-login', credentials);
      return await res.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        handleSuccessfulLogin(data);
      } else {
        toast({
          title: 'Login Error',
          description: data.message,
          variant: 'destructive',
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Login Failed',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
      setIsRedirecting(false);
    }
  });
  
  // Function to handle successful login
  const handleSuccessfulLogin = (data: AILoginResponse) => {
    setIsRedirecting(true);
    
    // Show loading message
    toast({
      title: 'Logging In',
      description: 'Securely connecting to portal & auto-filling credentials...',
    });
    
    console.log('Portal login data:', data);
    
    // First, store credentials in localStorage for the portal injector script to find
    if (data.storedCredentials) {
      try {
        // Store credentials in localStorage for the portal to retrieve
        localStorage.setItem('brl_credentials', JSON.stringify(data.storedCredentials));
        console.log('Credentials saved to localStorage for portal auto-login');
      } catch (storageError) {
        console.warn('Could not store credentials in localStorage:', storageError);
      }
    }
    
    // Ensure the injector script is loaded
    const loadInjectorScript = () => {
      // First check if the script is already in the document
      if (!document.getElementById('brl-portal-injector')) {
        const script = document.createElement('script');
        script.src = '/portal-injector.js';
        script.id = 'brl-portal-injector';
        document.head.appendChild(script);
        console.log('Portal injector script loaded');
      }
    };
    
    // Load the injector script
    loadInjectorScript();
    
    // Create a form with all required fields and auto-submit
    try {
      // Create the form element
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = data.endpoint;
      form.target = '_self'; // Important: load in same window
      form.style.position = 'absolute';
      form.style.top = '-1000px'; // Hide it but keep it in flow (important for some browsers)
      
      // Create and append all form fields with exact values
      Object.entries(data.formData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = key.toLowerCase() === 'password' ? 'password' : 'text';
        input.name = key;
        input.value = value;
        form.appendChild(input);
        console.log(`Added field ${key} with value: ${key.toLowerCase() === 'password' ? '****' : value}`);
      });
      
      // Add a special field to signal auto-login
      const autoLoginField = document.createElement('input');
      autoLoginField.type = 'hidden';
      autoLoginField.name = 'autoLogin';
      autoLoginField.value = 'true';
      form.appendChild(autoLoginField);
      
      // Create a script element to be injected into the portal page
      const inlineScript = document.createElement('script');
      inlineScript.textContent = `
        // Auto-login script for portal
        window.addEventListener('load', function() {
          console.log('Portal page loaded - attempting to auto-fill login form');
          
          // Try to find form fields
          var accountField = document.querySelector('input[name="AccountCode"]');
          var passwordField = document.querySelector('input[type="password"]');
          var submitButton = document.querySelector('input[type="submit"]');
          
          if (accountField && passwordField && submitButton) {
            console.log('Found login form elements - filling and submitting');
            accountField.value = '${data.formData.AccountCode || ''}';
            passwordField.value = '${data.formData.Password || ''}';
            setTimeout(function() { submitButton.click(); }, 500);
          } else {
            console.log('Could not find all login form elements');
          }
        });
      `;
      form.appendChild(inlineScript);
      
      // Add form to the document body
      document.body.appendChild(form);
      
      // Submit the form after a short delay to ensure the DOM has updated
      setTimeout(() => {
        try {
          console.log('Submitting form to portal:', data.endpoint);
          form.submit();
        } catch (submitError) {
          console.error('Error submitting form:', submitError);
          
          // If direct form submission fails, try URL parameter method
          const urlWithParams = new URL(data.endpoint);
          Object.entries(data.formData).forEach(([key, value]) => {
            urlWithParams.searchParams.set(key, value);
          });
          urlWithParams.searchParams.set('autoLogin', 'true');
          
          console.log('Fallback: Redirecting with URL parameters');
          window.location.href = urlWithParams.toString();
        }
      }, 100);
    } catch (error) {
      console.error('Error creating form:', error);
      
      // Last resort - direct navigation to endpoint
      window.location.href = data.endpoint;
    }
  };
  
  // Function to directly login using token approach
  // Uses secure tokens to authenticate with portal
  const directLogin = (credentials: AILoginCredentials) => {
    setIsRedirecting(true);
    
    // Portal endpoints mapping
    const portalEndpoints: Record<string, string> = {
      'Insured': 'https://www.fmweb3.com/FMBRL/FMInsuredLogin.asp',
      'Insured Español': 'https://www.fmweb3.com/FMBRL/FMInsuredLogin.asp',
      'Agent': 'https://www.fmweb3.com/FMBRL/FMAgentLogin.asp',
      'General Agent': 'https://www.fmweb3.com/FMBRL/FMGALogin.asp',
      'Sales Rep': 'https://www.fmweb3.com/FMBRL/FMSalesRepLogin.asp'
    };
    
    // Show loading message
    toast({
      title: 'Generating Secure Token',
      description: 'Creating secure access token for portal login...',
    });
    
    // Get the target endpoint
    const endpoint = portalEndpoints[credentials.portalType] || portalEndpoints['Insured'];
    
    console.log('TOKEN-BASED PORTAL LOGIN - Using secure token approach');
    
    // Store the credentials in session storage as a backup
    try {
      const storedData = {
        accountCode: credentials.accountCode,
        password: credentials.password,
        timestamp: new Date().toISOString(),
        portalType: credentials.portalType
      };
      sessionStorage.setItem('PORTAL_CREDENTIALS', JSON.stringify(storedData));
      localStorage.setItem('brl_credentials', JSON.stringify(storedData));
      console.log('Credentials saved to storage as backup');
    } catch (e) {
      console.error('Error storing credentials in storage:', e);
    }
    
    // Ensure the token handler script is preloaded
    const loadTokenHandlerScript = () => {
      const script = document.createElement('script');
      script.src = '/portal-token-handler.js';
      script.id = 'portal-token-handler-preload';
      document.head.appendChild(script);
      console.log('Portal token handler script preloaded for faster execution');
    };
    
    // Preload the script
    loadTokenHandlerScript();
    
    // Create and submit a direct form to the portal
    console.log('Using direct form submission to portal');
    
    toast({
      title: 'Portal Login',
      description: 'Submitting credentials directly to portal...',
    });
    
    // Create a hidden form element in the DOM
    const form = document.createElement('form');
    form.id = 'autoLoginForm';
    form.method = 'POST';
    form.action = endpoint;
    form.style.display = 'none';
    
    // Add account code field
    const accountInput = document.createElement('input');
    accountInput.type = 'hidden';
    accountInput.name = 'AccountCode'; // Field name on the portal form
    accountInput.value = credentials.accountCode;
    form.appendChild(accountInput);
    
    // Add password field
    const passwordInput = document.createElement('input');
    passwordInput.type = 'hidden';
    passwordInput.name = 'Password'; // Field name on the portal form
    passwordInput.value = credentials.password;
    form.appendChild(passwordInput);
    
    // Add submit field
    const submitInput = document.createElement('input');
    submitInput.type = 'hidden';
    submitInput.name = 'Submit';
    submitInput.value = 'Submit';
    form.appendChild(submitInput);
    
    // Add spanish language field if needed
    if (credentials.portalType === 'Insured Español' || credentials.language === 'spanish') {
      const langInput = document.createElement('input');
      langInput.type = 'hidden';
      langInput.name = 'Lang';
      langInput.value = 'S';
      form.appendChild(langInput);
    }
    
    // Create a script element to inject our auto-login code
    const injectScript = document.createElement('script');
    injectScript.src = '/direct-injector.js';
    form.appendChild(injectScript);
    
    // Add the form to the document
    document.body.appendChild(form);
    
    try {
      // Submit the form
      console.log('Submitting auto-login form to portal:', endpoint);
      form.submit();
      
      // Show success message
      toast({
        title: 'Portal Login',
        description: 'Redirecting to portal...',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Fallback to URL params approach if form submission fails
      try {
        toast({
          title: 'Trying Alternate Method',
          description: 'Form submission failed, trying URL parameters...',
          variant: 'destructive'
        });
        
        // Redirect to the portal with credentials in URL parameters
        const urlWithParams = new URL(endpoint);
        urlWithParams.searchParams.set('AccountCode', credentials.accountCode);
        urlWithParams.searchParams.set('Password', credentials.password);
        urlWithParams.searchParams.set('Submit', 'Submit');
        
        if (credentials.portalType === 'Insured Español' || credentials.language === 'spanish') {
          urlWithParams.searchParams.set('Lang', 'S');
        }
        
        window.location.href = urlWithParams.toString();
      } catch (fallbackError) {
        console.error('Error using fallback method:', fallbackError);
        
        // Last resort - direct navigation
        window.location.href = endpoint;
      }
    }
  };
  
  return {
    aiLogin: aiLoginMutation.mutate,
    directLogin,
    isLoading: aiLoginMutation.isPending || isRedirecting
  };
}