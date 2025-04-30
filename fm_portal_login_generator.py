#!/usr/bin/env python3
"""
FM Portal Login Form Generator

This script generates an HTML file containing a login form that correctly submits
to the FM Portal. The form uses the proper field names and is configured to submit
to the FM Portal login processing page.
"""

def generate_fm_portal_login_html():
    """
    Generates an HTML file with a login form for the FM Portal.
    The form is configured to submit to the FM Portal login processing page
    and uses the correct field names.
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
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 500px;
            margin: 0 auto;
            background-color: white;
            padding: 30px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            text-align: center;
            color: #333;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input[type="text"],
        input[type="password"] {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }
        button {
            background-color: #4CAF50;
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            width: 100%;
        }
        button:hover {
            background-color: #45a049;
        }
        .info {
            margin-top: 20px;
            padding: 10px;
            background-color: #e7f3fe;
            border-left: 6px solid #2196F3;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>FM Portal Login</h1>
        
        <!-- 
            This form is configured to submit to the FM Portal login processing page.
            Upon successful login, the user will be redirected to the FM Portal dashboard.
        -->
        <form action="https://www.fmweb3.com/FMBRL/FMInsuredLogin.asp" method="post">
            <div class="form-group">
                <label for="AccountCode">Account Code:</label>
                <input type="text" id="AccountCode" name="AccountCode" required>
            </div>
            
            <div class="form-group">
                <label for="Password">Password:</label>
                <input type="password" id="Password" name="Password" required>
            </div>
            
            <!-- Hidden field to indicate the form is being submitted -->
            <input type="hidden" name="Submit" value="Login">
            
            <!-- Hidden field for redirect URL after successful login -->
            <input type="hidden" name="RedirectURL" value="https://www.fmweb3.com/FMBRL/FMWebInsured.asp">
            
            <button type="submit">Login</button>
        </form>
        
        <div class="info">
            <p>After successful login, you will be redirected to the FM Portal dashboard at 
            <a href="https://www.fmweb3.com/FMBRL/FMWebInsured.asp" target="_blank">https://www.fmweb3.com/FMBRL/FMWebInsured.asp</a></p>
            
            <p>If you have forgotten your Account Code or Password, please contact FM Portal support at 561-200-6004 or via email.</p>
        </div>
        
        <div class="footer">
            <p>© 2025 FM Portal. All rights reserved.</p>
        </div>
    </div>
    
    <!-- 
        INTEGRATION INSTRUCTIONS:
        
        To integrate this login form under an "Insured Tab" in your existing website, you can:
        
        1. IFRAME METHOD (Simplest):
           Add the following code to your "Insured Tab" section:
           
           <iframe src="fm_portal_login.html" width="100%" height="600px" frameborder="0"></iframe>
           
        2. DIRECT INCLUSION METHOD:
           Copy the entire HTML content between <body> tags and paste it into your 
           "Insured Tab" section of your website.
           
        3. LINK METHOD:
           Add a link to this page from your "Insured Tab" section:
           
           <a href="fm_portal_login.html" class="button">FM Portal Login</a>
           
        NOTE: Make sure to adjust paths and styling to match your website's design.
    -->
</body>
</html>
"""
    
    # Write the HTML content to a file
    with open('client/public/fm_portal_login.html', 'w') as file:
        file.write(html_content)
    
    print("FM Portal login form has been generated successfully!")
    print("File created: client/public/fm_portal_login.html")
    print("\nTo use this form:")
    print("1. Upload the HTML file to your web server")
    print("2. Integrate it into your website using one of the methods described in the HTML comments")

if __name__ == "__main__":
    generate_fm_portal_login_html()