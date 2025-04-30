# GitHub Upload Instructions for Netlify Deployment

## Important: File Structure Requirements

For successful deployment on Netlify, your GitHub repository **must** have the following structure:

```
/package.json
/netlify.toml
/vite.config.ts
/tsconfig.json
/postcss.config.js
/drizzle.config.ts
/tailwind.config.ts
/components.json
/client/...
/server/...
/shared/...
/netlify/functions/...
```

## Step-by-Step Upload Instructions

### 1. Download the Project Correctly

1. Use Replit's "Download as zip" feature from the three dots menu
2. Extract the ZIP file to a local folder
3. Make sure that after extraction, the package.json file is at the root level

### 2. Review Important Files

Verify these critical files are present and at the root level:
- package.json
- netlify.toml
- vite.config.ts
- tsconfig.json

### 3. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click "+" > "New repository"
3. Name your repository (e.g., "brl-financial")
4. Do NOT initialize with README, license, or .gitignore
5. Click "Create repository"

### 4. Upload Files with Correct Structure

#### Option A: GitHub Web Interface (Easiest)
1. On your new repository page, click "uploading an existing file"
2. Drag and drop or select the files from your extracted folder
3. Make sure to upload from the root level of your extracted project
4. Commit the changes

#### Option B: Using Git
1. Open a terminal in your extracted project folder
2. Run:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

## Important Notes

1. **DO NOT** upload the node_modules folder
2. **DO** include all of the following folders:
   - client
   - server
   - shared
   - netlify

3. **Make sure** these files are at the root level (not inside any subfolder):
   - package.json
   - netlify.toml
   - vite.config.ts
   - tsconfig.json

## What Files to Upload

Here's a checklist of the files and directories you should upload:

- [ ] package.json
- [ ] netlify.toml
- [ ] vite.config.ts
- [ ] tsconfig.json
- [ ] postcss.config.js
- [ ] drizzle.config.ts
- [ ] tailwind.config.ts
- [ ] components.json
- [ ] client/ (directory with all contents)
- [ ] server/ (directory with all contents)
- [ ] shared/ (directory with all contents)
- [ ] netlify/ (directory with all contents)

## Troubleshooting Netlify Deployment

If you get the "npm error code ENOENT" or "Cannot find package.json" error:
1. Check your GitHub repository structure
2. Make sure package.json is at the root level
3. Make sure you're not uploading from inside a subfolder
4. Re-upload with the correct structure and redeploy

## Setting Up Environment Variables in Netlify

After deployment, set up your environment variables in Netlify:
1. Go to Site settings > Build & deploy > Environment
2. Add the following variables:
   - `DATABASE_URL` - Your PostgreSQL database URL
   - `ANTHROPIC_API_KEY` - Your Anthropic API key