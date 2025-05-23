#!/usr/bin/env bash
# Exit on error
set -o errexit

npm install
npm run build

# Print the contents of dist directory for debugging
ls -la dist || echo "dist directory not found"