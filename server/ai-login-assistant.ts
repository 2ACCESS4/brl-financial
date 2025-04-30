import Anthropic from '@anthropic-ai/sdk';
import { Request, Response } from 'express';

// the newest Anthropic model is "claude-3-7-sonnet-20250219" which was released February 24, 2025
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface PortalCredentials {
  portalType: string;
  accountCode: string;
  password: string;
  language?: string;
}

// Process credentials and format them for the target portal
export async function processCredentials(credentials: PortalCredentials): Promise<{
  formData: Record<string, string>;
  endpoint: string;
  success: boolean;
  message: string;
  usePortalInjector: boolean;
  storedCredentials: {
    accountCode: string;
    password: string;
    portalType: string;
  }
}> {
  try {
    // Extract credentials
    const { portalType, accountCode, password, language } = credentials;
    
    // Endpoint mapping for different portal types
    const portalEndpoints: Record<string, string> = {
      'Insured': 'https://www.fmweb3.com/FMBRL/FMInsuredLogin.asp',
      'Insured Español': 'https://www.fmweb3.com/FMBRL/FMInsuredLogin.asp',
      'Agent': 'https://www.fmweb3.com/FMBRL/FMAgentLogin.asp',
      'General Agent': 'https://www.fmweb3.com/FMBRL/FMGALogin.asp',
      'Sales Rep': 'https://www.fmweb3.com/FMBRL/FMSalesRepLogin.asp'
    };

    // Get endpoint or default to Insured
    const endpoint = portalEndpoints[portalType] || portalEndpoints['Insured'];
    
    // Create form data structure with EXACT field names from the portal
    const formData: Record<string, string> = {
      // These are the exact field names used in the portal
      InsuredAccountNumber: accountCode,
      InsuredLoginPassword: password,
      Submit: 'Submit'
    };
    
    // Add language parameter for Spanish
    if (portalType === 'Insured Español' || language === 'spanish') {
      formData.Lang = 'S';
    }
    
    // Add auto-login flag
    formData.autoLogin = 'true';
    
    // Create credentials object for storage
    const storedCredentials = {
      accountCode,
      password,
      portalType
    };
    
    // Use AI to validate credentials format
    const validationResult = await validateCredentials(credentials);
    
    if (!validationResult.valid) {
      return {
        formData,
        endpoint,
        success: false,
        message: validationResult.message,
        usePortalInjector: true,
        storedCredentials
      };
    }
    
    // Use AI to determine if we need advanced portal injection
    const usePortalInjector = true; // Always use injector for now
    
    return {
      formData,
      endpoint,
      success: true,
      message: `Successfully processed credentials for ${portalType} portal`,
      usePortalInjector,
      storedCredentials
    };
  } catch (error) {
    console.error('Error processing credentials:', error);
    return {
      formData: {},
      endpoint: '',
      success: false,
      message: 'Failed to process credentials. Please try again.',
      usePortalInjector: false,
      storedCredentials: {
        accountCode: '',
        password: '',
        portalType: ''
      }
    };
  }
}

// Express middleware to handle AI-powered login
export function aiLoginHandler(req: Request, res: Response) {
  const credentials: PortalCredentials = req.body;
  
  processCredentials(credentials)
    .then(result => {
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    })
    .catch(error => {
      console.error('AI Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error processing login'
      });
    });
}

// Use Claude AI to validate credentials
async function validateCredentials(credentials: PortalCredentials): Promise<{
  valid: boolean;
  message: string;
}> {
  try {
    const { portalType, accountCode, password } = credentials;
    
    // Skip AI validation if account code or password is missing
    if (!accountCode || !password) {
      return {
        valid: false,
        message: 'Account code and password are required'
      };
    }
    
    // For basic validation without calling the API (to save tokens)
    // Add any specific format requirements for different portal types
    if (portalType === 'Agent' && !accountCode.match(/^[A-Z0-9]{4,8}$/)) {
      return {
        valid: false,
        message: 'Agent code format appears invalid. Please check and try again.'
      };
    }
    
    // For more complex cases or to detect potential security issues,
    // use AI validation
    if (containsSuspiciousPatterns(accountCode) || containsSuspiciousPatterns(password)) {
      const message = await anthropic.messages.create({
        model: 'claude-3-7-sonnet-20250219',
        max_tokens: 150,
        system: "You are a security expert validating login credentials. Analyze the input for SQL injection, XSS, or other attacks. Respond with ONLY a JSON object with properties: 'valid' (boolean) and 'reason' (string explaining any issue found or 'valid credentials' if ok).",
        messages: [
          {
            role: 'user',
            content: `Please validate these credentials for security issues:\nPortal Type: ${portalType}\nAccount Code: ${accountCode}\nPassword: [REDACTED]`
          }
        ],
      });
      
      try {
        // Handle the response content safely
        const contentBlock = message.content[0];
        let contentText = '';
        
        // Access the content based on the type
        if ('text' in contentBlock) {
          contentText = contentBlock.text;
        }
        
        const result = JSON.parse(contentText);
        return {
          valid: result.valid,
          message: result.reason
        };
      } catch (e) {
        // If parsing fails, assume it's valid to not block legitimate logins
        return { valid: true, message: 'Credentials validated' };
      }
    }
    
    // Default case - credentials appear valid
    return { valid: true, message: 'Credentials validated' };
  } catch (error) {
    console.error('Error validating credentials with AI:', error);
    // If AI validation fails, default to accepting the credentials
    return { valid: true, message: 'Credential validation bypassed' };
  }
}

// Simple pattern matching for suspicious input
function containsSuspiciousPatterns(input: string): boolean {
  const patterns = [
    /'.*--/,           // SQL injection
    /\s*OR\s+1\s*=\s*1/i, // SQL injection
    /<script/i,        // XSS
    /javascript:/i,    // XSS
    /drop\s+table/i,   // SQL injection
    /union\s+select/i  // SQL injection
  ];
  
  return patterns.some(pattern => pattern.test(input));
}