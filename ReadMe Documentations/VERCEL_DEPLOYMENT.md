# Vercel Deployment Guide

## Overview
This project is configured for deployment on Vercel with:
- **Frontend**: React app (Vite) served from `/frontend`
- **Backend**: Serverless API functions in `/api`

## Deployment Configuration

### Files Created
1. **`vercel.json`** - Main Vercel configuration
   - Points build to frontend directory
   - Routes `/api/*` requests to serverless functions
   
2. **`api/index.js`** - Serverless API handler
   - All backend endpoints converted to serverless function
   - Handles `/api/teams`, `/api/players`, `/api/matches`, `/api/standings`

3. **`frontend/.env.production`** - Production environment variables
   - Sets API_URL to `/api` for Vercel deployment

4. **`frontend/.env.development`** - Development environment variables
   - Sets API_URL to `http://localhost:3001/api` for local development

## How to Deploy

### Option 1: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### Option 2: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will auto-detect the configuration from `vercel.json`
5. Click "Deploy"

### Option 3: Connect Git Repository
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect repository to Vercel
3. Vercel will automatically deploy on every push

## Environment Variables
No additional environment variables needed! The configuration uses:
- Development: `VITE_API_URL=http://localhost:3001/api`
- Production: `VITE_API_URL=/api`

## Testing Deployment

### Local Development
```bash
# Terminal 1: Start backend
cd backend && npm start

# Terminal 2: Start frontend
cd frontend && npm run dev
```

### Preview Production Build Locally
```bash
# Build frontend
cd frontend && npm run build

# Preview build
npm run preview
```

### Test Vercel Serverless Function Locally
```bash
# Install Vercel CLI
npm i -g vercel

# Run local development server with serverless functions
vercel dev
```

## Troubleshooting

### Build Fails
- Ensure all dependencies are in `package.json`
- Check Node.js version compatibility
- Review build logs in Vercel dashboard

### API Not Working
- Verify `/api` routes are configured in `vercel.json`
- Check serverless function logs in Vercel dashboard
- Ensure `api/package.json` has correct dependencies

### 404 on Refresh
- Vercel handles SPA routing automatically
- Ensure `vercel.json` doesn't override default SPA behavior

## Project Structure
```
.
├── vercel.json              # Vercel configuration
├── api/
│   ├── index.js            # Serverless API handler
│   └── package.json        # API dependencies
├── frontend/
│   ├── .env.development    # Dev environment variables
│   ├── .env.production     # Production environment variables
│   ├── src/
│   │   └── App.jsx         # Updated to use env variables
│   └── package.json        # Frontend dependencies
└── backend/
    └── server.js           # Original Express server (for local dev)
```

## Notes
- The original `backend/server.js` is kept for local development
- In production, `/api/index.js` handles all API requests as serverless functions
- Frontend automatically uses correct API URL based on environment
- No additional configuration needed in Vercel dashboard
