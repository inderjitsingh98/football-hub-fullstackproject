# Football Hub ⚽

> A modern, Apple-inspired football website showcasing teams, players, matches, and standings from **12 major leagues worldwide**. Built with React + Node.js and fully tested with Playwright automation.

**Perfect for learning:** Full-stack web development, E2E testing, MCP integration, and modern UI design patterns.

## 🌍 Global League Coverage

- **Premier League** (England)
- **La Liga** (Spain)  
- **Serie A** (Italy)
- **Bundesliga** (Germany)
- **Ligue 1** (France)
- **Eredivisie** (Netherlands)
- **Primeira Liga** (Portugal)
- **Brasileirão** (Brazil)
- **Liga MX** (Mexico)
- **Primera División** (Argentina)
- **Saudi Pro League** (Saudi Arabia) - feat. Cristiano Ronaldo
- **MLS** (United States) - feat. Lionel Messi

## 📊 Data Coverage

- **34 Teams** from 12 leagues worldwide
- **28 World-Class Players** including Messi, Ronaldo, Mbappé, Haaland
- **20 Live Matches** across all major leagues
- **30+ League Standing Entries** with real-time positions

## Project Structure

```
.
├── frontend/          # React application with Vite
│   ├── src/
│   │   ├── App.jsx   # Main application component
│   │   ├── App.css   # Application styles
│   │   ├── index.css # Global styles
│   │   └── main.jsx  # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/          # Express API server
│   ├── server.js    # API endpoints and data
│   └── package.json
│
└── .github/
    └── copilot-instructions.md
```

## Features

### Frontend (React + Vite)
- **Teams Section**: Display football teams with details (stadium, founded year, league, country)
- **Players Section**: Show player statistics including goals assists, and appearances
- **Matches Section**: Display match schedules with scores, dates, and status
- **Standings Section**: Interactive league table with team standings

### Backend (Node.js + Express)
- RESTful API endpoints for football data
- CORS enabled for frontend communication
- Mock data for teams, players, matches, and standings

## API Endpoints

- `GET /api/teams` - Get all teams
- `GET /api/teams/:id` - Get team by ID
- `GET /api/players` - Get all players
- `GET /api/players/:id` - Get player by ID
- `GET /api/matches` - Get all matches
- `GET /api/matches/:id` - Get match by ID
- `GET /api/standings` - Get league standings
- `GET /api/health` - Health check endpoint

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. Install frontend dependencies:
```bash
cd frontend
npm install
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

### Running the Application

You can use VS Code tasks or run manually:

#### Using VS Code Tasks
1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. Type "Tasks: Run Task"
3. Select "Start Backend Server"
4. Repeat and select "Start Frontend Dev Server"

#### Manual Start

**Backend (Terminal 1):**
```bash
cd backend
npm start
```
The backend will run on http://localhost:3001

**Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```
The frontend will run on http://localhost:5173

### Accessing the Website

Open your browser and navigate to:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001/api/health

## Testing with Playwright

This website is designed to be tested with Playwright. Key testable elements include:

### Test Selectors
- Navigation tabs: `[data-testid="teams-tab"]`, `[data-testid="players-tab"]`, `[data-testid="matches-tab"]`, `[data-testid="standings-tab"]`
- Containers: `[data-testid="teams-container"]`, `[data-testid="players-container"]`, `[data-testid="matches-container"]`, `[data-testid="standings-container"]`
- Team cards: `[data-testid="team-{id}"]`
- Player cards: `[data-testid="player-{id}"]`
- Match cards: `[data-testid="match-{id}"]`
- Standing rows: `[data-testid="standing-{position}"]`

### Example Playwright Test Scenarios
1. Navigate between tabs and verify content loads
2. Check if teams are displayed correctly
3. Verify player statistics
4. Test match information display
5. Validate standings table data
6. Test API responses

## Development

### Frontend Development
- Built with React 18 and Vite
- Hot Module Replacement (HMR) enabled
- Proxy configured to backend API

### Backend Development
- Express server with CORS enabled
- RESTful API design
- Mock data for demonstration purposes

### Making Changes

**Frontend**: Edit files in `frontend/src/` - changes will hot reload
**Backend**: Edit `backend/server.js` - restart the server to see changes

## Troubleshooting

### Frontend shows "Failed to fetch data"
- Ensure the backend server is running on port 3001
- Check CORS configuration in `backend/server.js`
- Verify API URL in `frontend/src/App.jsx`

### Port already in use
- Frontend default: 5173 (can be changed in `vite.config.js`)
- Backend default: 3001 (can be changed in `server.js`)

## Technologies Used

### Frontend
- React 18.3.1
- Vite 6.0.3
- Modern CSS with gradients and animations

### Backend
- Node.js
- Express 4.21.2
- CORS 2.8.5

## License

This is a demo project for testing purposes.
