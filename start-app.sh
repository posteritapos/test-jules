#!/bin/bash
# Build Angular frontend and start backend server as a single app

set -e

cd "$(dirname "$0")/frontend"
echo "Building Angular frontend..."
npm install
npm run build

cd ../backend
echo "Starting backend server..."
npm install
node index.js
