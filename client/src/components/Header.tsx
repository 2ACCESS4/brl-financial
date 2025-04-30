import { useState, FormEvent } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Logo from './Logo';
import { useAuth } from '@/hooks/use-auth';
import { useAILogin } from '@/hooks/use-ai-login';
import { 
  Loader2, Phone, Mail, ShieldCheck, Shield, Check, 
  User, Globe, Building, Briefcase, ArrowRight
} from 'lucide-react';

// Map the UI display names to the database enum values
const userTypeMapping = {
  'Insured': 'insured',
  'Insured Español': 'insured_espanol',
  'Agent': 'agent', 
  'General Agent': 'general_agent',
  'Sales Rep': 'sales_rep'
} as const;

type UserTypeDisplay = keyof typeof userTypeMapping;
type UserTypeValue = typeof userTypeMapping[UserTypeDisplay];

const userTypes: UserTypeDisplay[] = [
  'Insured',
  'Insured Español',
  'Agent', 
  'General Agent',
  'Sales Rep'
];

// Portal URL mapping
const portalUrls = {
  'Insured': 'https://www.fmweb3.com/FMBRL/FMInsuredLogin.asp',
  'Insured Español': 'https://www.fmweb3.com/FMBRL/FMInsuredLogin.asp?Lang=S',
  'Agent': 'https://www.fmweb3.com/FMBRL/FMAgentLogin.asp',
  'General Agent': 'https://www.fmweb3.com/FMBRL/FMGALogin.asp',
  'Sales Rep': 'https://www.fmweb3.com/FMBRL/FMSalesRepLogin.asp'
};

// Function to show a notification in test mode
function showTestModeNotification(message: string, options: { 
  title?: string, 
  type?: 'success' | 'info',
  account?: string
} = {}) {
  const { title = 'Success', type = 'success', account } = options;
  
  // Colors based on notification type
  const colors = type === 'success' 
    ? { bg: '#4ade80', text: '#052e16', border: '#22c55e' } 
    : { bg: '#3b82f6', text: '#ffffff', border: '#2563eb' };
  
  try {
    // Create notification element with a more prominent design
    const notificationDiv = document.createElement('div');
    notificationDiv.style.position = 'fixed';
    notificationDiv.style.top = '40px';
    notificationDiv.style.left = '50%';
    notificationDiv.style.transform = 'translateX(-50%)';
    notificationDiv.style.backgroundColor = colors.bg;
    notificationDiv.style.color = colors.text;
    notificationDiv.style.padding = '1.25rem 1.75rem';
    notificationDiv.style.borderRadius = '0.75rem';
    notificationDiv.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)';
    notificationDiv.style.zIndex = '9999';
    notificationDiv.style.maxWidth = '90%';
    notificationDiv.style.minWidth = '320px';
    notificationDiv.style.textAlign = 'center';
    notificationDiv.style.border = `2px solid ${colors.border}`;
    
    // Build notification content with larger text
    let html = `<div style="font-weight: bold; margin-bottom: 0.5rem; font-size: 1.125rem;">${title} ✓</div>`;
    html += `<div style="font-size: 1rem;">${message}</div>`;
    
    if (account) {
      html += `<div style="margin-top: 0.75rem; font-size: 0.875rem; opacity: 0.9;">Account: ${account}</div>`;
    }
    
    notificationDiv.innerHTML = html;
    document.body.appendChild(notificationDiv);
    
    // Create an animation effect
    notificationDiv.animate(
      [
        { opacity: 0, transform: 'translate(-50%, -20px)' },
        { opacity: 1, transform: 'translate(-50%, 0)' }
      ],
      { 
        duration: 300,
        easing: 'ease-out'
      }
    );
    
    // Log to console for debugging
    console.log(`Notification shown: ${title} - ${message}`);
    
    // Remove notification after 6 seconds (longer to ensure visibility)
    setTimeout(() => {
      // Fade out animation
      const fadeOut = notificationDiv.animate(
        [
          { opacity: 1 },
          { opacity: 0 }
        ],
        { 
          duration: 300,
          easing: 'ease-in'
        }
      );
      
      fadeOut.onfinish = () => {
        document.body.removeChild(notificationDiv);
      };
    }, 6000);
  } catch (err) {
    console.error('Error showing notification:', err);
    alert(`${title}: ${message}`); // Fallback to alert if DOM manipulation fails
  }
}

const Header = () => {
  const { loginMutation, user, logoutMutation } = useAuth();
  const { aiLogin, directLogin, isLoading: isAILoading } = useAILogin();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<UserTypeDisplay | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [accountCode, setAccountCode] = useState('');
  const [password, setPassword] = useState('');
  const [forgotAccountCode, setForgotAccountCode] = useState('');
  const [isPassingToPortal, setIsPassingToPortal] = useState(false);
  
  // Handle tab click based on user type - direct portal transfer for ALL tabs
  const handleLogin = (userType: UserTypeDisplay) => {
    // Show loading state
    setIsPassingToPortal(true);
    
    // Create a temporary message in page center
    const messageDiv = document.createElement('div');
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '50%';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translate(-50%, -50%)';
    messageDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    messageDiv.style.color = 'white';
    messageDiv.style.padding = '20px 40px';
    messageDiv.style.borderRadius = '8px';
    messageDiv.style.zIndex = '9999';
    messageDiv.style.fontSize = '16px';
    messageDiv.style.fontWeight = 'bold';
    messageDiv.innerHTML = `<div style="display: flex; align-items: center; gap: 12px;">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
      <div>Redirecting to ${userType} portal...</div>
    </div>`;
    document.body.appendChild(messageDiv);
    
    // Simply redirect to the portal URL immediately
    setTimeout(() => {
      window.location.href = portalUrls[userType];
    }, 500);
    
    // Cleanup message (but will never execute due to redirect)
    setTimeout(() => {
      try {
        document.body.removeChild(messageDiv);
      } catch (e) {
        // Ignore errors
      }
    }, 5000);
  };
  
  // Handle the forgot password button click
  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  // Handle logout button click
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // Handle login form submission
  const handleSubmitLogin = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedUserType) return;
    
    // Handle Insured and Insured Español types differently
    if (selectedUserType === 'Insured' || selectedUserType === 'Insured Español') {
      // Set loading state
      setIsPassingToPortal(true);
      
      // Submit the form after a small delay to show loading state
      setTimeout(() => {
        const form = e.target as HTMLFormElement;
        form.submit();
      }, 800);
      
      return;
    }
    
    // For other types, use our regular login mutation
    loginMutation.mutate({
      accountCode,
      password
    });
  };

  // Handle password reset form submission
  const handleSubmitPasswordReset = (e: FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send a password reset email
    showTestModeNotification(
      `A password reset link would be sent to the email on file.`,
      { title: 'Password Reset Requested' }
    );
    setShowForgotPassword(false);
    setShowLoginDialog(false);
  };

  // Handle direct portal login with form submission
  const handleTestModeLogin = (e: FormEvent, userType: UserTypeDisplay) => {
    e.preventDefault();
    
    // Show loading state
    setIsPassingToPortal(true);
    
    // Important: Close the dialog immediately to prevent any interaction issues
    setShowLoginDialog(false);
    
    console.log('INITIATING PORTAL LOGIN for:', accountCode);
    
    // Show a user-friendly message
    const messageDiv = document.createElement('div');
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '50%';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translate(-50%, -50%)';
    messageDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    messageDiv.style.color = 'white';
    messageDiv.style.padding = '20px 40px';
    messageDiv.style.borderRadius = '8px';
    messageDiv.style.zIndex = '9999';
    messageDiv.style.fontSize = '16px';
    messageDiv.style.fontWeight = 'bold';
    messageDiv.innerHTML = `<div style="display: flex; align-items: center; gap: 12px;">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
      <div>Redirecting to ${userType} portal...</div>
    </div>`;
    document.body.appendChild(messageDiv);
    
    // Get the target portal URL
    const portalUrl = portalUrls[userType] || portalUrls['Insured'];
    
    console.log('Using basic redirect to portal...');
    
    // Create a form to submit
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = portalUrl;
    form.style.display = 'none';
    
    // Add account field
    const accountField = document.createElement('input');
    accountField.type = 'hidden';
    accountField.name = 'AccountCode';
    accountField.value = accountCode;
    form.appendChild(accountField);
    
    // Add password field
    const passwordField = document.createElement('input');
    passwordField.type = 'hidden';
    passwordField.name = 'Password';
    passwordField.value = password;
    form.appendChild(passwordField);
    
    // Add submit field
    const submitField = document.createElement('input');
    submitField.type = 'hidden';
    submitField.name = 'Submit';
    submitField.value = 'Submit';
    form.appendChild(submitField);
    
    // Add language field for Spanish
    if (userType === 'Insured Español') {
      const langField = document.createElement('input');
      langField.type = 'hidden';
      langField.name = 'Lang';
      langField.value = 'S';
      form.appendChild(langField);
    }
    
    // Add form to body and submit
    document.body.appendChild(form);
    
    setTimeout(() => {
      try {
        // Try to submit the form
        form.submit();
      } catch (error) {
        console.error('Form submission failed:', error);
        
        // Fallback to direct URL
        window.location.href = portalUrl;
      }
    }, 800);
    
    // Cleanup message (though will likely not execute due to redirect)
    setTimeout(() => {
      try {
        document.body.removeChild(messageDiv);
      } catch (e) {
        // Ignore errors
      }
    }, 5000);
  };

  // Get the appropriate label for account code field
  const getAccountLabel = () => {
    if (selectedUserType === 'Agent') return 'Agent Code:';
    if (selectedUserType === 'General Agent') return 'GA Code:';
    if (selectedUserType === 'Sales Rep') return 'Sales Rep ID:';
    return 'Account Code:';
  };

  // Get the appropriate label for password field
  const getPasswordLabel = () => {
    if (selectedUserType === 'Sales Rep') return 'Sales Rep Password:';
    return 'Password:';
  };
  
  // Get icon for the selected user type
  const getUserTypeIcon = () => {
    if (!selectedUserType) return <ShieldCheck className="h-5 w-5 mr-2 text-white/80" />;
    
    switch (selectedUserType) {
      case 'Insured': return <User className="h-5 w-5 mr-2 text-white/80" />;
      case 'Insured Español': return <Globe className="h-5 w-5 mr-2 text-white/80" />;
      case 'Agent': return <ShieldCheck className="h-5 w-5 mr-2 text-white/80" />;
      case 'General Agent': return <Building className="h-5 w-5 mr-2 text-white/80" />;
      case 'Sales Rep': return <Briefcase className="h-5 w-5 mr-2 text-white/80" />;
      default: return <ShieldCheck className="h-5 w-5 mr-2 text-white/80" />;
    }
  };
  
  // Get icon for tab
  const renderUserTypeTabIcon = (userType: UserTypeDisplay) => {
    switch (userType) {
      case 'Insured': return <User className="h-4 w-4 mr-2 opacity-80" />;
      case 'Insured Español': return <Globe className="h-4 w-4 mr-2 opacity-80" />;
      case 'Agent': return <ShieldCheck className="h-4 w-4 mr-2 opacity-80" />;
      case 'General Agent': return <Building className="h-4 w-4 mr-2 opacity-80" />;
      case 'Sales Rep': return <Briefcase className="h-4 w-4 mr-2 opacity-80" />;
      default: return <ShieldCheck className="h-4 w-4 mr-2 opacity-80" />;
    }
  };
  
  return (
    <>
      <header className="w-full header-container">
        <div className="container">
          {/* Top bar with BRL Financial logo */}
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              {/* Use our custom Logo component with the shield and text */}
              <Logo className="mr-4" />
            </div>
            
            <div className="text-right">
              <div className="text-xs font-medium text-gray-600 mb-1">
                Questions? Contact us:
              </div>
              <div className="flex items-center justify-end gap-6">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-1.5 text-primary/80" />
                  <div className="text-base font-semibold text-primary">
                    561-200-6004
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-1.5 text-primary/80" />
                  <a href="mailto:info@brlfinancial.com" className="text-sm animated-link">
                    info@brlfinancial.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Login tabs row */}
          <div className="login-tabs">
            {userTypes.map((userType) => (
              <button 
                key={userType}
                className={`login-tab ${selectedUserType === userType ? 'active' : ''}`}
                onClick={() => handleLogin(userType)}
              >
                <span className="flex items-center">
                  {renderUserTypeTabIcon(userType)}
                  {userType}
                </span>
              </button>
            ))}
          </div>
        </div>
      </header>
      
      {/* Login Form Section Below Tabs */}
      {!showLoginDialog && (
        <div className="bg-gray-50 py-6 border-b border-gray-200">
          <div className="container">
            <div className="max-w-lg mx-auto text-center">
              <div className="flex justify-center mb-2">
                <Shield className="text-primary h-8 w-8 opacity-80" />
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Access Your BRL Financial Account
              </h2>
              
              <p className="text-sm mb-4 text-gray-600">
                Please select your login type from the tabs above to access your account.
              </p>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/10 flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Secure connection</span>
                </div>
                
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/10 flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700">24/7 access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent 
          className="login-box p-0 w-[400px] max-w-[95vw]"
          aria-labelledby="login-title"
        >
          <div className="login-header">
            <DialogTitle id="login-title" className="flex items-center justify-center text-white">
              {getUserTypeIcon()}
              {selectedUserType} Login
            </DialogTitle>
          </div>
          
          <div className="p-6">
            {!showForgotPassword ? (
              <>
                {(selectedUserType === 'Insured' || selectedUserType === 'Insured Español') ? (
                  // For Insured types - use a form that can submit directly to legacy system
                  <form 
                    // In development/preview environment, we'll handle it in JS
                    // In production, this will point to the real legacy system URL
                    action={import.meta.env.PROD ? portalUrls[selectedUserType] : "#"}
                    method="POST"
                    onSubmit={(e) => {
                      e.preventDefault();
                      
                      // In preview mode, show success and don't redirect
                      if (!import.meta.env.PROD) {
                        handleTestModeLogin(e, selectedUserType);
                        return;
                      }
                      
                      // In production, use the direct form submission
                      handleSubmitLogin(e);
                    }}
                  >
                    <div className="mb-5 text-sm text-gray-600">
                      This site contains confidential information. Access is restricted to authorized persons ONLY.
                      
                      <div className="mt-2 p-3 bg-blue-50 border border-blue-100 rounded-md text-blue-800 flex items-start gap-2">
                        <Globe className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Direct Portal Access:</span> You'll be automatically redirected to your account on our secure portal after login.
                          
                          {!import.meta.env.PROD && (
                            <div className="mt-1 pt-1 border-t border-blue-100 text-blue-700 text-xs">
                              <span className="font-medium">TEST MODE:</span> You will be redirected to the actual portal after login.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-5">
                      <div>
                        <label htmlFor="AccountCode" className="block text-sm font-medium mb-1.5 text-gray-700">
                          {getAccountLabel()}
                        </label>
                        <Input 
                          id="AccountCode" 
                          name="AccountCode" // Important: match the name to legacy system
                          className="login-input"
                          placeholder={getAccountLabel().replace(':', '')} 
                          value={accountCode}
                          onChange={(e) => setAccountCode(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="Password" className="block text-sm font-medium mb-1.5 text-gray-700">
                          {getPasswordLabel()}
                        </label>
                        <Input 
                          id="Password" 
                          name="Password" // Important: match the name to legacy system
                          type="password" 
                          className="login-input"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    {/* Add hidden Submit input for legacy system compatibility */}
                    <input type="hidden" name="Submit" value="Submit" />
                    
                    {/* Add hidden Lang input if Spanish */}
                    {selectedUserType === 'Insured Español' && 
                      <input type="hidden" name="Lang" value="S" />
                    }
                    
                    <div className="flex justify-between items-center">
                      <button 
                        type="submit" 
                        className="brl-button flex items-center justify-center min-w-[120px]"
                        disabled={isPassingToPortal}
                      >
                        {isPassingToPortal ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Connecting...</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <span>Login</span>
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        )}
                      </button>
                      <button 
                        type="button"
                        className="text-sm text-primary animated-link"
                        onClick={handleForgotPassword}
                      >
                        Forgot Password?
                      </button>
                    </div>
                  </form>
                ) : (
                  // For other user types - use our standard login form
                  <form onSubmit={handleSubmitLogin}>
                    <div className="mb-5 text-sm text-gray-600">
                      This site contains confidential information. Access is restricted to authorized persons ONLY.
                    </div>
                    
                    <div className="space-y-4 mb-5">
                      <div>
                        <label htmlFor="accountCode" className="block text-sm font-medium mb-1.5 text-gray-700">
                          {getAccountLabel()}
                        </label>
                        <Input 
                          id="accountCode" 
                          className="login-input"
                          placeholder={getAccountLabel().replace(':', '')} 
                          value={accountCode}
                          onChange={(e) => setAccountCode(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1.5 text-gray-700">
                          {getPasswordLabel()}
                        </label>
                        <Input 
                          id="password" 
                          type="password" 
                          className="login-input"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <button 
                        type="submit" 
                        className="brl-button flex items-center justify-center min-w-[120px]"
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <span>Login</span>
                        )}
                      </button>
                      <button 
                        type="button"
                        className="text-sm text-primary animated-link"
                        onClick={handleForgotPassword}
                      >
                        Forgot Password?
                      </button>
                    </div>
                  </form>
                )}
                
                <div className="mt-6 pt-4 text-xs text-gray-500 text-center border-t border-gray-100">
                  ©{new Date().getFullYear()} BRL Financial Corp. All Rights Reserved.
                  <br />
                  <span className="text-xs text-gray-400">
                    Powered by Advanced Insurance Systems, Inc.
                  </span>
                </div>
              </>
            ) : (
              <>
                <form onSubmit={handleSubmitPasswordReset}>
                  <div className="mb-5 text-sm text-gray-600">
                    Enter your {getAccountLabel().replace(':', '')} below, and we'll send you a password reset link to your email address on file.
                  </div>
                  
                  <div className="space-y-4 mb-5">
                    <div>
                      <label htmlFor="forgotAccountCode" className="block text-sm font-medium mb-1.5 text-gray-700">
                        {getAccountLabel()}
                      </label>
                      <Input 
                        id="forgotAccountCode" 
                        className="login-input"
                        placeholder={getAccountLabel().replace(':', '')} 
                        value={forgotAccountCode}
                        onChange={(e) => setForgotAccountCode(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button type="submit" className="brl-button">
                      Send Reset Link
                    </button>
                    <button 
                      type="button"
                      className="text-sm text-primary animated-link"
                      onClick={() => setShowForgotPassword(false)}
                    >
                      Back to Login
                    </button>
                  </div>
                </form>
                
                <div className="mt-6 pt-4 text-xs text-gray-500 text-center border-t border-gray-100">
                  Need assistance? Contact customer support at <a href="mailto:info@brlfinancial.com" className="text-primary">info@brlfinancial.com</a>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;