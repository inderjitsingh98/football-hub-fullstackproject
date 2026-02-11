import express from 'express';
import cors from 'cors';
import teams from '../data/teams.js';
import players from '../data/players.js';
import matches from '../data/matches.js';
import standings from '../data/standings.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/teams', (req, res) => {
  const { league, country } = req.query;
  let filteredTeams = teams;

  if (league) {
    filteredTeams = filteredTeams.filter(t => t.league.toLowerCase() === league.toLowerCase());
  }
  if (country) {
    filteredTeams = filteredTeams.filter(t => t.country.toLowerCase() === country.toLowerCase());
  }

  res.json(filteredTeams);
});

app.get('/api/teams/:id', (req, res) => {
  const team = teams.find(t => t.id === parseInt(req.params.id));
  if (team) {
    res.json(team);
  } else {
    res.status(404).json({ error: 'Team not found' });
  }
});

app.get('/api/players', (req, res) => {
  const { team, position, nationality } = req.query;
  let filteredPlayers = players;

  if (team) {
    filteredPlayers = filteredPlayers.filter(p => p.team.toLowerCase().includes(team.toLowerCase()));
  }
  if (position) {
    filteredPlayers = filteredPlayers.filter(p => p.position.toLowerCase() === position.toLowerCase());
  }
  if (nationality) {
    filteredPlayers = filteredPlayers.filter(p => p.nationality.toLowerCase() === nationality.toLowerCase());
  }

  res.json(filteredPlayers);
});

app.get('/api/players/:id', (req, res) => {
  const player = players.find(p => p.id === parseInt(req.params.id));
  if (player) {
    res.json(player);
  } else {
    res.status(404).json({ error: 'Player not found' });
  }
});

app.get('/api/matches', (req, res) => {
  const { league, status, team } = req.query;
  let filteredMatches = matches;

  if (league) {
    filteredMatches = filteredMatches.filter(m => m.league.toLowerCase() === league.toLowerCase());
  }
  if (status) {
    filteredMatches = filteredMatches.filter(m => m.status.toLowerCase() === status.toLowerCase());
  }
  if (team) {
    filteredMatches = filteredMatches.filter(m =>
      m.homeTeam.toLowerCase().includes(team.toLowerCase()) ||
      m.awayTeam.toLowerCase().includes(team.toLowerCase())
    );
  }

  res.json(filteredMatches);
});

app.get('/api/matches/:id', (req, res) => {
  const match = matches.find(m => m.id === parseInt(req.params.id));
  if (match) {
    res.json(match);
  } else {
    res.status(404).json({ error: 'Match not found' });
  }
});

app.get('/api/standings', (req, res) => {
  const { league } = req.query;
  let filteredStandings = standings;

  if (league) {
    filteredStandings = filteredStandings.filter(s => s.league.toLowerCase() === league.toLowerCase());
  }

  res.json(filteredStandings);
});

app.get('/api/standings/:id', (req, res) => {
  const standing = standings.find(s => s.id === parseInt(req.params.id));
  if (standing) {
    res.json(standing);
  } else {
    res.status(404).json({ error: 'Standing not found' });
  }
});

app.get('/api/leagues', (req, res) => {
  const leagues = [...new Set(teams.map(t => t.league))].sort();
  res.json(leagues);
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Football API is running',
    stats: {
      teams: teams.length,
      players: players.length,
      matches: matches.length,
      leagues: [...new Set(teams.map(t => t.league))].length
    }
  });
});

app.listen(PORT, () => {
  console.log(`Football Backend API running on http://localhost:${PORT}`);
});
