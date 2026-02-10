import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Football Teams Data - Top 10 Leagues + Saudi Pro League + MLS
const teams = [
  // Premier League (England)
  { id: 1, name: 'Manchester City', stadium: 'Etihad Stadium', founded: 1880, league: 'Premier League', country: 'England' },
  { id: 2, name: 'Liverpool', stadium: 'Anfield', founded: 1892, league: 'Premier League', country: 'England' },
  { id: 3, name: 'Arsenal', stadium: 'Emirates Stadium', founded: 1886, league: 'Premier League', country: 'England' },
  { id: 4, name: 'Manchester United', stadium: 'Old Trafford', founded: 1878, league: 'Premier League', country: 'England' },
  { id: 5, name: 'Chelsea', stadium: 'Stamford Bridge', founded: 1905, league: 'Premier League', country: 'England' },
  
  // La Liga (Spain)
  { id: 6, name: 'Real Madrid', stadium: 'Santiago Bernabéu', founded: 1902, league: 'La Liga', country: 'Spain' },
  { id: 7, name: 'Barcelona', stadium: 'Spotify Camp Nou', founded: 1899, league: 'La Liga', country: 'Spain' },
  { id: 8, name: 'Atlético Madrid', stadium: 'Cívitas Metropolitano', founded: 1903, league: 'La Liga', country: 'Spain' },
  
  // Serie A (Italy)
  { id: 9, name: 'Inter Milan', stadium: 'San Siro', founded: 1908, league: 'Serie A', country: 'Italy' },
  { id: 10, name: 'AC Milan', stadium: 'San Siro', founded: 1899, league: 'Serie A', country: 'Italy' },
  { id: 11, name: 'Juventus', stadium: 'Allianz Stadium', founded: 1897, league: 'Serie A', country: 'Italy' },
  
  // Bundesliga (Germany)
  { id: 12, name: 'Bayern Munich', stadium: 'Allianz Arena', founded: 1900, league: 'Bundesliga', country: 'Germany' },
  { id: 13, name: 'Borussia Dortmund', stadium: 'Signal Iduna Park', founded: 1909, league: 'Bundesliga', country: 'Germany' },
  { id: 14, name: 'RB Leipzig', stadium: 'Red Bull Arena', founded: 2009, league: 'Bundesliga', country: 'Germany' },
  
  // Ligue 1 (France)
  { id: 15, name: 'Paris Saint-Germain', stadium: 'Parc des Princes', founded: 1970, league: 'Ligue 1', country: 'France' },
  { id: 16, name: 'Monaco', stadium: 'Stade Louis II', founded: 1924, league: 'Ligue 1', country: 'France' },
  { id: 17, name: 'Marseille', stadium: 'Stade Vélodrome', founded: 1899, league: 'Ligue 1', country: 'France' },
  
  // Eredivisie (Netherlands)
  { id: 18, name: 'Ajax', stadium: 'Johan Cruyff Arena', founded: 1900, league: 'Eredivisie', country: 'Netherlands' },
  { id: 19, name: 'PSV Eindhoven', stadium: 'Philips Stadion', founded: 1913, league: 'Eredivisie', country: 'Netherlands' },
  
  // Primeira Liga (Portugal)
  { id: 20, name: 'Benfica', stadium: 'Estádio da Luz', founded: 1904, league: 'Primeira Liga', country: 'Portugal' },
  { id: 21, name: 'Porto', stadium: 'Estádio do Dragão', founded: 1893, league: 'Primeira Liga', country: 'Portugal' },
  
  // Brasileirão (Brazil)
  { id: 22, name: 'Flamengo', stadium: 'Maracanã', founded: 1895, league: 'Brasileirão', country: 'Brazil' },
  { id: 23, name: 'Palmeiras', stadium: 'Allianz Parque', founded: 1914, league: 'Brasileirão', country: 'Brazil' },
  
  // Liga MX (Mexico)
  { id: 24, name: 'Club América', stadium: 'Estadio Azteca', founded: 1916, league: 'Liga MX', country: 'Mexico' },
  { id: 25, name: 'Chivas Guadalajara', stadium: 'Estadio Akron', founded: 1906, league: 'Liga MX', country: 'Mexico' },
  
  // Argentine Primera División
  { id: 26, name: 'Boca Juniors', stadium: 'La Bombonera', founded: 1905, league: 'Primera División', country: 'Argentina' },
  { id: 27, name: 'River Plate', stadium: 'Estadio Monumental', founded: 1901, league: 'Primera División', country: 'Argentina' },
  
  // Saudi Pro League
  { id: 28, name: 'Al Nassr', stadium: 'Mrsool Park', founded: 1955, league: 'Saudi Pro League', country: 'Saudi Arabia' },
  { id: 29, name: 'Al Hilal', stadium: 'Kingdom Arena', founded: 1957, league: 'Saudi Pro League', country: 'Saudi Arabia' },
  { id: 30, name: 'Al Ittihad', stadium: 'King Abdullah Sports City', founded: 1927, league: 'Saudi Pro League', country: 'Saudi Arabia' },
  
  // MLS (USA)
  { id: 31, name: 'Inter Miami', stadium: 'DRV PNK Stadium', founded: 2018, league: 'MLS', country: 'United States' },
  { id: 32, name: 'LA Galaxy', stadium: 'Dignity Health Sports Park', founded: 1996, league: 'MLS', country: 'United States' },
  { id: 33, name: 'LAFC', stadium: 'BMO Stadium', founded: 2014, league: 'MLS', country: 'United States' },
  { id: 34, name: 'Seattle Sounders', stadium: 'Lumen Field', founded: 2007, league: 'MLS', country: 'United States' }
];

// Players Data - World's Top Stars from All Leagues
const players = [
  // Premier League
  { id: 1, name: 'Erling Haaland', position: 'Forward', team: 'Manchester City', nationality: 'Norway', age: 25, goals: 32, assists: 6, appearances: 33, image: '/players/haaland.jpg' },
  { id: 2, name: 'Mohamed Salah', position: 'Forward', team: 'Liverpool', nationality: 'Egypt', age: 33, goals: 24, assists: 12, appearances: 31, image: '/players/salah.jpg' },
  { id: 3, name: 'Bukayo Saka', position: 'Winger', team: 'Arsenal', nationality: 'England', age: 24, goals: 18, assists: 14, appearances: 32, image: '/players/saka.jpg' },
  { id: 4, name: 'Kevin De Bruyne', position: 'Midfielder', team: 'Manchester City', nationality: 'Belgium', age: 34, goals: 8, assists: 18, appearances: 28, image: '/players/debruyne.jpg' },
  { id: 5, name: 'Cole Palmer', position: 'Midfielder', team: 'Chelsea', nationality: 'England', age: 24, goals: 20, assists: 11, appearances: 30, image: '/players/palmer.jpg' },
  
  // La Liga
  { id: 6, name: 'Kylian Mbappé', position: 'Forward', team: 'Real Madrid', nationality: 'France', age: 27, goals: 28, assists: 12, appearances: 35, image: '/players/mbappe.jpg' },
  { id: 7, name: 'Vinícius Júnior', position: 'Winger', team: 'Real Madrid', nationality: 'Brazil', age: 25, goals: 22, assists: 14, appearances: 34, image: '/players/vinicius.jpg' },
  { id: 8, name: 'Robert Lewandowski', position: 'Forward', team: 'Barcelona', nationality: 'Poland', age: 37, goals: 26, assists: 7, appearances: 32, image: '/players/lewandowski.jpg' },
  { id: 9, name: 'Jude Bellingham', position: 'Midfielder', team: 'Real Madrid', nationality: 'England', age: 22, goals: 19, assists: 10, appearances: 33, image: '/players/bellingham.jpg' },
  { id: 10, name: 'Antoine Griezmann', position: 'Forward', team: 'Atlético Madrid', nationality: 'France', age: 34, goals: 16, assists: 13, appearances: 30, image: '/players/griezmann.jpg' },
  
  // Serie A
  { id: 11, name: 'Lautaro Martínez', position: 'Forward', team: 'Inter Milan', nationality: 'Argentina', age: 28, goals: 23, assists: 8, appearances: 31, image: '/players/lautaro.jpg' },
  { id: 12, name: 'Rafael Leão', position: 'Winger', team: 'AC Milan', nationality: 'Portugal', age: 26, goals: 17, assists: 11, appearances: 29, image: '/players/leao.jpg' },
  { id: 13, name: 'Dušan Vlahović', position: 'Forward', team: 'Juventus', nationality: 'Serbia', age: 26, goals: 21, assists: 5, appearances: 32, image: '/players/vlahovic.jpg' },
  
  // Bundesliga
  { id: 14, name: 'Harry Kane', position: 'Forward', team: 'Bayern Munich', nationality: 'England', age: 32, goals: 35, assists: 9, appearances: 34, image: '/players/kane.jpg' },
  { id: 15, name: 'Jamal Musiala', position: 'Midfielder', team: 'Bayern Munich', nationality: 'Germany', age: 22, goals: 15, assists: 12, appearances: 30, image: '/players/musiala.jpg' },
  { id: 16, name: 'Serhou Guirassy', position: 'Forward', team: 'Borussia Dortmund', nationality: 'Guinea', age: 28, goals: 24, assists: 6, appearances: 28, image: '/players/guirassy.jpg' },
  
  // Ligue 1
  { id: 17, name: 'Bradley Barcola', position: 'Winger', team: 'Paris Saint-Germain', nationality: 'France', age: 22, goals: 16, assists: 9, appearances: 27, image: '/players/barcola.jpg' },
  { id: 18, name: 'Gonçalo Ramos', position: 'Forward', team: 'Paris Saint-Germain', nationality: 'Portugal', age: 24, goals: 19, assists: 7, appearances: 26, image: '/players/ramos.jpg' },
  
  // Saudi Pro League
  { id: 19, name: 'Cristiano Ronaldo', position: 'Forward', team: 'Al Nassr', nationality: 'Portugal', age: 40, goals: 27, assists: 9, appearances: 32, image: '/players/ronaldo.jpg' },
  { id: 20, name: 'Neymar Jr', position: 'Forward', team: 'Al Hilal', nationality: 'Brazil', age: 34, goals: 15, assists: 12, appearances: 24, image: '/players/neymar.jpg' },
  { id: 21, name: 'Karim Benzema', position: 'Forward', team: 'Al Ittihad', nationality: 'France', age: 38, goals: 22, assists: 8, appearances: 29, image: '/players/benzema.jpg' },
  
  // MLS
  { id: 22, name: 'Lionel Messi', position: 'Forward', team: 'Inter Miami', nationality: 'Argentina', age: 38, goals: 25, assists: 16, appearances: 30, image: '/players/messi.jpg' },
  { id: 23, name: 'Luis Suárez', position: 'Forward', team: 'Inter Miami', nationality: 'Uruguay', age: 39, goals: 18, assists: 10, appearances: 28, image: '/players/suarez.jpg' },
  { id: 24, name: 'Marco Reus', position: 'Midfielder', team: 'LA Galaxy', nationality: 'Germany', age: 36, goals: 12, assists: 14, appearances: 25, image: '/players/reus.jpg' },
  
  // Eredivisie
  { id: 25, name: 'Brian Brobbey', position: 'Forward', team: 'Ajax', nationality: 'Netherlands', age: 24, goals: 20, assists: 5, appearances: 27, image: '/players/brobbey.jpg' },
  
  // Primeira Liga
  { id: 26, name: 'Viktor Gyökeres', position: 'Forward', team: 'Sporting CP', nationality: 'Sweden', age: 27, goals: 29, assists: 7, appearances: 31, image: '/players/gyokeres.jpg' },
  
  // Brasileirão
  { id: 27, name: 'Pedro', position: 'Forward', team: 'Flamengo', nationality: 'Brazil', age: 27, goals: 23, assists: 6, appearances: 29, image: '/players/pedro.jpg' },
  { id: 28, name: 'Estêvão', position: 'Winger', team: 'Palmeiras', nationality: 'Brazil', age: 19, goals: 14, assists: 11, appearances: 26, image: '/players/estevao.jpg' }
];

// Matches Data - Across All Major Leagues
const matches = [
  // Premier League
  { id: 1, homeTeam: 'Manchester City', awayTeam: 'Arsenal', homeScore: 2, awayScore: 2, date: '2026-02-08', time: '16:00', stadium: 'Etihad Stadium', league: 'Premier League', status: 'upcoming' },
  { id: 2, homeTeam: 'Liverpool', awayTeam: 'Manchester United', homeScore: 3, awayScore: 1, date: '2026-02-05', time: '17:30', stadium: 'Anfield', league: 'Premier League', status: 'completed' },
  { id: 3, homeTeam: 'Chelsea', awayTeam: 'Manchester City', homeScore: 0, awayScore: 0, date: '2026-02-10', time: '20:00', stadium: 'Stamford Bridge', league: 'Premier League', status: 'upcoming' },
  
  // La Liga
  { id: 4, homeTeam: 'Real Madrid', awayTeam: 'Barcelona', homeScore: 2, awayScore: 1, date: '2026-02-06', time: '21:00', stadium: 'Santiago Bernabéu', league: 'La Liga', status: 'completed' },
  { id: 5, homeTeam: 'Atlético Madrid', awayTeam: 'Real Madrid', homeScore: 0, awayScore: 0, date: '2026-02-09', time: '21:00', stadium: 'Cívitas Metropolitano', league: 'La Liga', status: 'upcoming' },
  { id: 6, homeTeam: 'Barcelona', awayTeam: 'Atlético Madrid', homeScore: 3, awayScore: 0, date: '2026-02-04', time: '16:15', stadium: 'Spotify Camp Nou', league: 'La Liga', status: 'completed' },
  
  // Serie A
  { id: 7, homeTeam: 'Inter Milan', awayTeam: 'AC Milan', homeScore: 1, awayScore: 1, date: '2026-02-07', time: '20:45', stadium: 'San Siro', league: 'Serie A', status: 'completed' },
  { id: 8, homeTeam: 'Juventus', awayTeam: 'Inter Milan', homeScore: 0, awayScore: 0, date: '2026-02-11', time: '20:45', stadium: 'Allianz Stadium', league: 'Serie A', status: 'upcoming' },
  
  // Bundesliga
  { id: 9, homeTeam: 'Bayern Munich', awayTeam: 'Borussia Dortmund', homeScore: 4, awayScore: 2, date: '2026-02-05', time: '18:30', stadium: 'Allianz Arena', league: 'Bundesliga', status: 'completed' },
  { id: 10, homeTeam: 'RB Leipzig', awayTeam: 'Bayern Munich', homeScore: 0, awayScore: 0, date: '2026-02-09', time: '18:30', stadium: 'Red Bull Arena', league: 'Bundesliga', status: 'upcoming' },
  
  // Ligue 1
  { id: 11, homeTeam: 'Paris Saint-Germain', awayTeam: 'Marseille', homeScore: 2, awayScore: 0, date: '2026-02-06', time: '21:00', stadium: 'Parc des Princes', league: 'Ligue 1', status: 'completed' },
  { id: 12, homeTeam: 'Monaco', awayTeam: 'Paris Saint-Germain', homeScore: 0, awayScore: 0, date: '2026-02-10', time: '21:00', stadium: 'Stade Louis II', league: 'Ligue 1', status: 'upcoming' },
  
  // Saudi Pro League
  { id: 13, homeTeam: 'Al Nassr', awayTeam: 'Al Hilal', homeScore: 3, awayScore: 2, date: '2026-02-07', time: '19:00', stadium: 'Mrsool Park', league: 'Saudi Pro League', status: 'completed' },
  { id: 14, homeTeam: 'Al Ittihad', awayTeam: 'Al Nassr', homeScore: 0, awayScore: 0, date: '2026-02-12', time: '20:00', stadium: 'King Abdullah Sports City', league: 'Saudi Pro League', status: 'upcoming' },
  
  // MLS
  { id: 15, homeTeam: 'Inter Miami', awayTeam: 'LA Galaxy', homeScore: 2, awayScore: 1, date: '2026-02-08', time: '19:30', stadium: 'DRV PNK Stadium', league: 'MLS', status: 'upcoming' },
  { id: 16, homeTeam: 'LAFC', awayTeam: 'Inter Miami', homeScore: 1, awayScore: 3, date: '2026-02-04', time: '22:30', stadium: 'BMO Stadium', league: 'MLS', status: 'completed' },
  { id: 17, homeTeam: 'Seattle Sounders', awayTeam: 'LA Galaxy', homeScore: 0, awayScore: 0, date: '2026-02-11', time: '22:00', stadium: 'Lumen Field', league: 'MLS', status: 'upcoming' },
  
  // Eredivisie
  { id: 18, homeTeam: 'Ajax', awayTeam: 'PSV Eindhoven', homeScore: 2, awayScore: 2, date: '2026-02-09', time: '14:30', stadium: 'Johan Cruyff Arena', league: 'Eredivisie', status: 'upcoming' },
  
  // Primeira Liga
  { id: 19, homeTeam: 'Benfica', awayTeam: 'Porto', homeScore: 1, awayScore: 0, date: '2026-02-08', time: '20:30', stadium: 'Estádio da Luz', league: 'Primeira Liga', status: 'upcoming' },
  
  // Brasileirão
  { id: 20, homeTeam: 'Flamengo', awayTeam: 'Palmeiras', homeScore: 2, awayScore: 1, date: '2026-02-06', time: '23:00', stadium: 'Maracanã', league: 'Brasileirão', status: 'completed' }
];

// League Standings - Multiple Leagues
const standings = [
  // Premier League
  { id: 1, position: 1, team: 'Liverpool', league: 'Premier League', played: 24, won: 18, drawn: 4, lost: 2, points: 58 },
  { id: 2, position: 2, team: 'Manchester City', league: 'Premier League', played: 24, won: 17, drawn: 5, lost: 2, points: 56 },
  { id: 3, position: 3, team: 'Arsenal', league: 'Premier League', played: 24, won: 16, drawn: 5, lost: 3, points: 53 },
  { id: 4, position: 4, team: 'Chelsea', league: 'Premier League', played: 24, won: 14, drawn: 7, lost: 3, points: 49 },
  { id: 5, position: 5, team: 'Manchester United', league: 'Premier League', played: 24, won: 13, drawn: 6, lost: 5, points: 45 },
  
  // La Liga
  { id: 6, position: 1, team: 'Real Madrid', league: 'La Liga', played: 23, won: 18, drawn: 3, lost: 2, points: 57 },
  { id: 7, position: 2, team: 'Barcelona', league: 'La Liga', played: 23, won: 17, drawn: 4, lost: 2, points: 55 },
  { id: 8, position: 3, team: 'Atlético Madrid', league: 'La Liga', played: 23, won: 15, drawn: 5, lost: 3, points: 50 },
  
  // Serie A
  { id: 9, position: 1, team: 'Inter Milan', league: 'Serie A', played: 22, won: 17, drawn: 3, lost: 2, points: 54 },
  { id: 10, position: 2, team: 'Juventus', league: 'Serie A', played: 22, won: 15, drawn: 5, lost: 2, points: 50 },
  { id: 11, position: 3, team: 'AC Milan', league: 'Serie A', played: 22, won: 14, drawn: 6, lost: 2, points: 48 },
  
  // Bundesliga
  { id: 12, position: 1, team: 'Bayern Munich', league: 'Bundesliga', played: 21, won: 16, drawn: 3, lost: 2, points: 51 },
  { id: 13, position: 2, team: 'Borussia Dortmund', league: 'Bundesliga', played: 21, won: 14, drawn: 4, lost: 3, points: 46 },
  { id: 14, position: 3, team: 'RB Leipzig', league: 'Bundesliga', played: 21, won: 13, drawn: 5, lost: 3, points: 44 },
  
  // Ligue 1
  { id: 15, position: 1, team: 'Paris Saint-Germain', league: 'Ligue 1', played: 22, won: 18, drawn: 2, lost: 2, points: 56 },
  { id: 16, position: 2, team: 'Monaco', league: 'Ligue 1', played: 22, won: 14, drawn: 5, lost: 3, points: 47 },
  { id: 17, position: 3, team: 'Marseille', league: 'Ligue 1', played: 22, won: 13, drawn: 6, lost: 3, points: 45 },
  
  // Saudi Pro League
  { id: 18, position: 1, team: 'Al Hilal', league: 'Saudi Pro League', played: 20, won: 16, drawn: 3, lost: 1, points: 51 },
  { id: 19, position: 2, team: 'Al Nassr', league: 'Saudi Pro League', played: 20, won: 15, drawn: 3, lost: 2, points: 48 },
  { id: 20, position: 3, team: 'Al Ittihad', league: 'Saudi Pro League', played: 20, won: 13, drawn: 4, lost: 3, points: 43 },
  
  // MLS
  { id: 21, position: 1, team: 'Inter Miami', league: 'MLS', played: 8, won: 6, drawn: 1, lost: 1, points: 19 },
  { id: 22, position: 2, team: 'LAFC', league: 'MLS', played: 8, won: 5, drawn: 2, lost: 1, points: 17 },
  { id: 23, position: 3, team: 'LA Galaxy', league: 'MLS', played: 8, won: 5, drawn: 1, lost: 2, points: 16 },
  { id: 24, position: 4, team: 'Seattle Sounders', league: 'MLS', played: 8, won: 4, drawn: 2, lost: 2, points: 14 },
  
  // Eredivisie
  { id: 25, position: 1, team: 'PSV Eindhoven', league: 'Eredivisie', played: 21, won: 17, drawn: 3, lost: 1, points: 54 },
  { id: 26, position: 2, team: 'Ajax', league: 'Eredivisie', played: 21, won: 15, drawn: 4, lost: 2, points: 49 },
  
  // Primeira Liga
  { id: 27, position: 1, team: 'Benfica', league: 'Primeira Liga', played: 20, won: 16, drawn: 2, lost: 2, points: 50 },
  { id: 28, position: 2, team: 'Porto', league: 'Primeira Liga', played: 20, won: 15, drawn: 3, lost: 2, points: 48 },
  
  // Brasileirão
  { id: 29, position: 1, team: 'Flamengo', league: 'Brasileirão', played: 5, won: 4, drawn: 1, lost: 0, points: 13 },
  { id: 30, position: 2, team: 'Palmeiras', league: 'Brasileirão', played: 5, won: 3, drawn: 2, lost: 0, points: 11 }
];

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
