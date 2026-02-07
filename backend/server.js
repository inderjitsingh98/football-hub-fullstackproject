import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Football Teams Data
const teams = [
  {
    id: 1,
    name: 'Manchester United',
    stadium: 'Old Trafford',
    founded: 1878,
    league: 'Premier League',
    country: 'England'
  },
  {
    id: 2,
    name: 'Real Madrid',
    stadium: 'Santiago Bernabéu',
    founded: 1902,
    league: 'La Liga',
    country: 'Spain'
  },
  {
    id: 3,
    name: 'Bayern Munich',
    stadium: 'Allianz Arena',
    founded: 1900,
    league: 'Bundesliga',
    country: 'Germany'
  },
  {
    id: 4,
    name: 'Barcelona',
    stadium: 'Camp Nou',
    founded: 1899,
    league: 'La Liga',
    country: 'Spain'
  },
  {
    id: 5,
    name: 'Liverpool',
    stadium: 'Anfield',
    founded: 1892,
    league: 'Premier League',
    country: 'England'
  },
  {
    id: 6,
    name: 'Paris Saint-Germain',
    stadium: 'Parc des Princes',
    founded: 1970,
    league: 'Ligue 1',
    country: 'France'
  }
];

// Players Data
const players = [
  {
    id: 1,
    name: 'Cristiano Ronaldo',
    position: 'Forward',
    team: 'Al Nassr',
    nationality: 'Portugal',
    age: 39,
    goals: 25,
    assists: 8,
    appearances: 32
  },
  {
    id: 2,
    name: 'Lionel Messi',
    position: 'Forward',
    team: 'Inter Miami',
    nationality: 'Argentina',
    age: 38,
    goals: 22,
    assists: 15,
    appearances: 30
  },
  {
    id: 3,
    name: 'Kylian Mbappé',
    position: 'Forward',
    team: 'Real Madrid',
    nationality: 'France',
    age: 26,
    goals: 28,
    assists: 12,
    appearances: 35
  },
  {
    id: 4,
    name: 'Erling Haaland',
    position: 'Forward',
    team: 'Manchester City',
    nationality: 'Norway',
    age: 25,
    goals: 32,
    assists: 6,
    appearances: 33
  },
  {
    id: 5,
    name: 'Kevin De Bruyne',
    position: 'Midfielder',
    team: 'Manchester City',
    nationality: 'Belgium',
    age: 34,
    goals: 8,
    assists: 18,
    appearances: 28
  },
  {
    id: 6,
    name: 'Vinícius Júnior',
    position: 'Forward',
    team: 'Real Madrid',
    nationality: 'Brazil',
    age: 24,
    goals: 20,
    assists: 14,
    appearances: 34
  }
];

// Matches Data
const matches = [
  {
    id: 1,
    homeTeam: 'Manchester United',
    awayTeam: 'Liverpool',
    homeScore: 2,
    awayScore: 2,
    date: '2026-02-08',
    time: '15:00',
    stadium: 'Old Trafford',
    status: 'upcoming'
  },
  {
    id: 2,
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    homeScore: 3,
    awayScore: 1,
    date: '2026-02-05',
    time: '20:00',
    stadium: 'Santiago Bernabéu',
    status: 'completed'
  },
  {
    id: 3,
    homeTeam: 'Bayern Munich',
    awayTeam: 'Paris Saint-Germain',
    homeScore: 1,
    awayScore: 1,
    date: '2026-02-06',
    time: '18:30',
    stadium: 'Allianz Arena',
    status: 'completed'
  },
  {
    id: 4,
    homeTeam: 'Barcelona',
    awayTeam: 'Manchester United',
    homeScore: 0,
    awayScore: 0,
    date: '2026-02-10',
    time: '19:00',
    stadium: 'Camp Nou',
    status: 'upcoming'
  },
  {
    id: 5,
    homeTeam: 'Liverpool',
    awayTeam: 'Bayern Munich',
    homeScore: 0,
    awayScore: 0,
    date: '2026-02-12',
    time: '20:45',
    stadium: 'Anfield',
    status: 'upcoming'
  }
];

// League Standings
const standings = [
  { position: 1, team: 'Manchester City', played: 24, won: 18, drawn: 4, lost: 2, points: 58 },
  { position: 2, team: 'Liverpool', played: 24, won: 17, drawn: 5, lost: 2, points: 56 },
  { position: 3, team: 'Arsenal', played: 24, won: 16, drawn: 5, lost: 3, points: 53 },
  { position: 4, team: 'Manchester United', played: 24, won: 14, drawn: 6, lost: 4, points: 48 },
  { position: 5, team: 'Chelsea', played: 24, won: 13, drawn: 7, lost: 4, points: 46 }
];

// API Routes
app.get('/api/teams', (req, res) => {
  res.json(teams);
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
  res.json(players);
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
  res.json(matches);
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
  res.json(standings);
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Football API is running' });
});

app.listen(PORT, () => {
  console.log(`Football Backend API running on http://localhost:${PORT}`);
});
