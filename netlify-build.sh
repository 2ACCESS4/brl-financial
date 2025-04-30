#!/bin/bash

# Install dependencies first
echo "Installing dependencies..."
npm install

# Make sure target directories exist
mkdir -p dist/client

# Run the build process
echo "Running build..."
npm run build

# Check if dist/client is empty, if so, try to copy from dist/public
if [ -z "$(ls -A dist/client 2>/dev/null)" ]; then
  echo "dist/client is empty, attempting to fix..."
  
  # Check if dist/public exists (this is the current output directory in vite.config.ts)
  if [ -d "dist/public" ]; then
    echo "Found dist/public, copying to dist/client..."
    cp -r dist/public/* dist/client/
  fi
  
  # If dist directory exists and contains index.html
  if [ -d "dist" ] && [ -f "dist/index.html" ]; then
    echo "Copying files from dist to dist/client..."
    cp -r dist/*.* dist/client/
  fi
  
  # Fallback: Check for client/dist
  if [ -d "client/dist" ]; then
    echo "Copying files from client/dist to dist/client..."
    cp -r client/dist/* dist/client/
  fi
fi

# Create a basic index.html if none exists
if [ ! -f "dist/client/index.html" ]; then
  echo "Creating a basic index.html file..."
  echo '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BRL Financial</title>
  <script type="module" src="/assets/index.js"></script>
  <link rel="stylesheet" href="/assets/index.css">
</head>
<body>
  <div id="root"></div>
</body>
</html>' > dist/client/index.html
fi

# Double check if we now have files in dist/client
if [ -z "$(ls -A dist/client 2>/dev/null)" ]; then
  echo "ERROR: Could not populate dist/client directory"
  ls -la dist/
  ls -la client/ || echo "No client folder found"
  exit 1
else
  echo "Success! dist/client directory contains:"
  ls -la dist/client/
fi