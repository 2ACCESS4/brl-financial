#!/usr/bin/env python3
"""
FM Portal Login Integration Script

This script generates an HTML file with a login form that submits to the FM Portal.
The generated file can be integrated into an existing website under an "insured tab" function.

Usage:
1. Run this script in Replit
2. It will create a file called 'fm_portal_login.html'
3. Follow the integration instructions printed at the end
"""

import os

def create_fm_portal_login_html():
    """
    Creates an HTML file with a login form that submits to the FM Portal
    """
    html_content = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FM Portal Login</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .login-container {
            max-width: 400px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            text-align: center;
            color: #333;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input[type="text"],
        input[type="password"] {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }
        .btn {
            display: inline-block;
            background: #4CAF50;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            width: 100%;
        }
        .btn:hover {
            background: #45a049;
        }
        .form-footer {
            text-align: center;
            margin-top: 15px;
            font-size: 14px;
        }
        .form-footer a {
            color: #4CAF50;
            text-decoration: none;
        }
        .form-footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h2>FM Portal Login</h2>
        <form action="https://www.fmweb3.com/FMBRL/FMInsuredLogin.asp" method="post">
            <div class="form-group">
                <label for="AccountCode">Account Code:</label>
                <input type="text" id="AccountCode" name="AccountCode" required>
            </div>
            <div class="form-group">
                <label for="Password">Password:</label>
                <input type="password" id="Password" name="Password" required>
            </div>
            <input type="hidden" name="Submit" value="Submit">
            <button type="submit" class="btn">Login</button>
            <div class="form-footer">
                <p>Don't have an account? <a href="https://www.fmweb3.com/FMBRL/FMInsuredRegistration.asp">Register here</a></p>
                <p><a href="https://www.fmweb3.com/FMBRL/FMInsuredForgotPassword.asp">Forgot Password?</a></p>
            </div>
        </form>
    </div>
</body>
</html>"""

    # Write the HTML content to a file
    with open('client/public/fm_portal_login.html', 'w') as file:
        file.write(html_content)

    print(f"Created FM Portal login HTML file: {os.path.abspath('client/public/fm_portal_login.html')}")
    
    # Also create Spanish version
    spanish_html_content = html_content.replace('<h2>FM Portal Login</h2>', '<h2>Inicio de Sesión Portal FM</h2>')
    spanish_html_content = spanish_html_content.replace('<label for="AccountCode">Account Code:</label>', '<label for="AccountCode">Código de Cuenta:</label>')
    spanish_html_content = spanish_html_content.replace('<label for="Password">Password:</label>', '<label for="Password">Contraseña:</label>')
    spanish_html_content = spanish_html_content.replace('<button type="submit" class="btn">Login</button>', '<button type="submit" class="btn">Iniciar Sesión</button>')
    spanish_html_content = spanish_html_content.replace("<p>Don't have an account? <a href=\"https://www.fmweb3.com/FMBRL/FMInsuredRegistration.asp\">Register here</a></p>",
                                                      "<p>¿No tiene una cuenta? <a href=\"https://www.fmweb3.com/FMBRL/FMInsuredRegistration.asp\">Regístrese aquí</a></p>")
    spanish_html_content = spanish_html_content.replace("<p><a href=\"https://www.fmweb3.com/FMBRL/FMInsuredForgotPassword.asp\">Forgot Password?</a></p>",
                                                      "<p><a href=\"https://www.fmweb3.com/FMBRL/FMInsuredForgotPassword.asp\">¿Olvidó su contraseña?</a></p>")
    
    # Add hidden Lang field for Spanish
    spanish_html_content = spanish_html_content.replace('<input type="hidden" name="Submit" value="Submit">',
                                                      '<input type="hidden" name="Submit" value="Submit">\n            <input type="hidden" name="Lang" value="S">')
    
    # Write Spanish version to file
    with open('client/public/fm_portal_login_spanish.html', 'w') as file:
        file.write(spanish_html_content)
    
    print(f"Created Spanish FM Portal login HTML file: {os.path.abspath('client/public/fm_portal_login_spanish.html')}")

    # Create Agent version
    agent_html_content = html_content.replace('<h2>FM Portal Login</h2>', '<h2>Agent Portal Login</h2>')
    agent_html_content = agent_html_content.replace('action="https://www.fmweb3.com/FMBRL/FMInsuredLogin.asp"',
                                                  'action="https://www.fmweb3.com/FMBRL/FMAgentLogin.asp"')
    
    # Write Agent version to file
    with open('client/public/fm_portal_login_agent.html', 'w') as file:
        file.write(agent_html_content)
    
    print(f"Created Agent FM Portal login HTML file: {os.path.abspath('client/public/fm_portal_login_agent.html')}")
    
    # Create GA version
    ga_html_content = html_content.replace('<h2>FM Portal Login</h2>', '<h2>General Agent Portal Login</h2>')
    ga_html_content = ga_html_content.replace('action="https://www.fmweb3.com/FMBRL/FMInsuredLogin.asp"',
                                            'action="https://www.fmweb3.com/FMBRL/FMGALogin.asp"')
    ga_html_content = ga_html_content.replace('<label for="AccountCode">Account Code:</label>', '<label for="AccountCode">GA Code:</label>')
    
    # Write GA version to file
    with open('client/public/fm_portal_login_ga.html', 'w') as file:
        file.write(ga_html_content)
    
    print(f"Created General Agent FM Portal login HTML file: {os.path.abspath('client/public/fm_portal_login_ga.html')}")
    
    # Create Sales Rep version
    sr_html_content = html_content.replace('<h2>FM Portal Login</h2>', '<h2>Sales Rep Portal Login</h2>')
    sr_html_content = sr_html_content.replace('action="https://www.fmweb3.com/FMBRL/FMInsuredLogin.asp"',
                                            'action="https://www.fmweb3.com/FMBRL/FMSalesRepLogin.asp"')
    sr_html_content = sr_html_content.replace('<label for="AccountCode">Account Code:</label>', '<label for="AccountCode">Sales Rep ID:</label>')
    sr_html_content = sr_html_content.replace('<label for="Password">Password:</label>', '<label for="Password">Sales Rep Password:</label>')
    
    # Write Sales Rep version to file
    with open('client/public/fm_portal_login_sales_rep.html', 'w') as file:
        file.write(sr_html_content)
    
    print(f"Created Sales Rep FM Portal login HTML file: {os.path.abspath('client/public/fm_portal_login_sales_rep.html')}")

def print_integration_instructions():
    """
    Prints instructions for integrating the login form into an existing website
    """
    instructions = """
INTEGRATION INSTRUCTIONS:
========================

Option 1: Direct Links to Login Pages
------------------------------------
You can directly link to the generated login pages from your website:

- Insured: /fm_portal_login.html
- Insured Español: /fm_portal_login_spanish.html
- Agent: /fm_portal_login_agent.html
- General Agent: /fm_portal_login_ga.html
- Sales Rep: /fm_portal_login_sales_rep.html

Option 2: Update Tab Handler in Header.tsx
-----------------------------------------
Modify your handleLogin function in Header.tsx to include these local login pages as an option:

```typescript
// Handle tab click based on user type - direct portal transfer for ALL tabs
const handleLogin = (userType: UserTypeDisplay) => {
  // Show loading state
  setIsPassingToPortal(true);
  
  // Create a temporary message
  const messageDiv = document.createElement('div');
  messageDiv.style.position = 'fixed';
  // ... [other message styling]
  messageDiv.innerHTML = `<div>Redirecting to ${userType} portal...</div>`;
  document.body.appendChild(messageDiv);
  
  // Determine which URL to use - can be direct portal or our intermediary login page
  let targetUrl = '';
  
  // Use local login pages (comment this block if you want direct portal access)
  if (userType === 'Insured') targetUrl = '/fm_portal_login.html';
  else if (userType === 'Insured Español') targetUrl = '/fm_portal_login_spanish.html';
  else if (userType === 'Agent') targetUrl = '/fm_portal_login_agent.html';
  else if (userType === 'General Agent') targetUrl = '/fm_portal_login_ga.html';
  else if (userType === 'Sales Rep') targetUrl = '/fm_portal_login_sales_rep.html';
  
  // Or use direct portal URLs (uncomment this block if you want direct portal access)
  // targetUrl = portalUrls[userType];
  
  // Redirect
  setTimeout(() => {
    window.location.href = targetUrl;
  }, 500);
};
```

Option 3: Direct Portal Integration Without Local Pages
----------------------------------------------------
Keep your current direct portal access approach:

```typescript
// Handle tab click based on user type - direct portal transfer for ALL tabs
const handleLogin = (userType: UserTypeDisplay) => {
  // ... [existing code]
  
  // Simply redirect to the portal URL immediately
  setTimeout(() => {
    window.location.href = portalUrls[userType];
  }, 500);
};
```
"""
    print(instructions)

def main():
    """
    Main function to create the FM Portal login HTML files and print integration instructions
    """
    create_fm_portal_login_html()
    print_integration_instructions()

if __name__ == "__main__":
    main()