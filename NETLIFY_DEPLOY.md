# Deploying to Netlify

This document provides instructions for deploying the BRL Financial website to Netlify.

## Prerequisites

- A GitHub repository containing your project
- A Netlify account

## Setup Instructions

### 1. Push Your Code to GitHub

First, ensure your code is pushed to GitHub. If you're using Replit, you can export your code to GitHub by following the Replit instructions for Git integration.

### 2. Connect to Netlify

1. Log in to your Netlify account
2. Click "Add new site" > "Import an existing project"
3. Choose "GitHub" as your Git provider
4. Authenticate with GitHub when prompted
5. Select your repository

### 3. Configure Build Settings

Netlify should automatically detect the build settings from the `netlify.toml` file, but you can verify they are correct:

- Build command: `npm run build`
- Publish directory: `dist/client`

### 4. Environment Variables

Set up the following environment variables in your Netlify project settings:

1. Go to Site settings > Build & deploy > Environment
2. Add the following variables:
   - `SITE_URL`: Your Netlify site URL

### 5. Deploy

Click "Deploy site" and Netlify will build and deploy your website.

## Project Structure for Netlify

The project is configured for Netlify in the following ways:

1. **Netlify Functions**: Serverless functions are located in the `netlify/functions` directory:
   - `currency.js`: Provides real-time USD to BRL exchange rate data
   - `stats.js`: Provides site statistics data

2. **API Redirects**: The `netlify.toml` file includes redirects to route API requests to the appropriate serverless functions:
   ```
   [[redirects]]
     from = "/api/*"
     to = "/.netlify/functions/:splat"
     status = 200
   ```

3. **Client-Side Configuration**: The client code uses a configuration system that automatically detects whether it's running in development or production mode, and adjusts API endpoints accordingly.

## Testing Locally

To test the Netlify functions locally before deploying, you can install the Netlify CLI and run:

```bash
npm install -g netlify-cli
netlify dev
```

This will simulate the Netlify environment, including the serverless functions.

## Troubleshooting

- **Build Failures**: Check the build logs for any errors.
- **Function Errors**: Check the function logs in the Netlify dashboard.
- **API Requests Failing**: Ensure your API requests are using the correct paths and that the redirects in `netlify.toml` are properly configured.

## Maintenance

After deployment, you can:

- Set up a custom domain in the Netlify settings
- Enable HTTPS
- Configure form handling if needed
- Set up branch deploys for testing changes before they go to production