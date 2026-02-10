import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Teams data
const teams = [
  { id: 1, name: "Manchester United", league: "Premier League", country: "England", stadium: "Old Trafford", founded: 1878, image: "/teams/man-united.svg" },
  { id: 2, name: "Real Madrid", league: "La Liga", country: "Spain", stadium: "Santiago Bernabéu", founded: 1902, image: "/teams/real-madrid.svg" },
  { id: 3, name: "Bayern Munich", league: "Bundesliga", country: "Germany", stadium: "Allianz Arena", founded: 1900, image: "/teams/bayern.svg" },
  { id: 4, name: "Inter Miami", league: "MLS", country: "United States", stadium: "DRV PNK Stadium", founded: 2018, image: "/teams/inter-miami.svg" },
  { id: 5, name: "Al Nassr", league: "Saudi Pro League", country: "Saudi Arabia", stadium: "Mrsool Park", founded: 1955, image: "/teams/al-nassr.svg" },
  { id: 6, name: "Paris Saint-Germain", league: "Ligue 1", country: "France", stadium: "Parc des Princes", founded: 1970, image: "/teams/psg.svg" },
  { id: 7, name: "Liverpool", league: "Premier League", country: "England", stadium: "Anfield", founded: 1892, image: "/teams/liverpool.svg" },
  { id: 8, name: "Barcelona", league: "La Liga", country: "Spain", stadium: "Camp Nou", founded: 1899, image: "/teams/barcelona.svg" },
  { id: 9, name: "Juventus", league: "Serie A", country: "Italy", stadium: "Allianz Stadium", founded: 1897, image: "/teams/juventus.svg" },
  { id: 10, name: "Manchester City", league: "Premier League", country: "England", stadium: "Etihad Stadium", founded: 1880, image: "/teams/man-city.svg" },
  { id: 11, name: "Atlético Madrid", league: "La Liga", country: "Spain", stadium: "Cívitas Metropolitano", founded: 1903, image: "/teams/atletico.svg" },
  { id: 12, name: "Borussia Dortmund", league: "Bundesliga", country: "Germany", stadium: "Signal Iduna Park", founded: 1909, image: "/teams/dortmund.svg" },
  { id: 13, name: "AC Milan", league: "Serie A", country: "Italy", stadium: "San Siro", founded: 1899, image: "/teams/ac-milan.svg" },
  { id: 14, name: "Chelsea", league: "Premier League", country: "England", stadium: "Stamford Bridge", founded: 1905, image: "/teams/chelsea.svg" },
  { id: 15, name: "Arsenal", league: "Premier League", country: "England", stadium: "Emirates Stadium", founded: 1886, image: "/teams/arsenal.svg" },
  { id: 16, name: "Tottenham Hotspur", league: "Premier League", country: "England", stadium: "Tottenham Hotspur Stadium", founded: 1882, image: "/teams/tottenham.svg" },
  { id: 17, name: "Inter Milan", league: "Serie A", country: "Italy", stadium: "San Siro", founded: 1908, image: "/teams/inter-milan.svg" },
  { id: 18, name: "Napoli", league: "Serie A", country: "Italy", stadium: "Diego Armando Maradona Stadium", founded: 1926, image: "/teams/napoli.svg" },
  { id: 19, name: "Ajax", league: "Eredivisie", country: "Netherlands", stadium: "Johan Cruyff Arena", founded: 1900, image: "/teams/ajax.svg" },
  { id: 20, name: "Benfica", league: "Primeira Liga", country: "Portugal", stadium: "Estádio da Luz", founded: 1904, image: "/teams/benfica.svg" },
  { id: 21, name: "Porto", league: "Primeira Liga", country: "Portugal", stadium: "Estádio do Dragão", founded: 1893, image: "/teams/porto.svg" },
  { id: 22, name: "Sporting CP", league: "Primeira Liga", country: "Portugal", stadium: "Estádio José Alvalade", founded: 1906, image: "/teams/sporting.svg" },
  { id: 23, name: "Olympique Marseille", league: "Ligue 1", country: "France", stadium: "Stade Vélodrome", founded: 1899, image: "/teams/marseille.svg" },
  { id: 24, name: "Olympique Lyonnais", league: "Ligue 1", country: "France", stadium: "Groupama Stadium", founded: 1950, image: "/teams/lyon.svg" },
  { id: 25, name: "AS Monaco", league: "Ligue 1", country: "France", stadium: "Stade Louis II", founded: 1924, image: "/teams/monaco.svg" },
  { id: 26, name: "Flamengo", league: "Brasileirão", country: "Brazil", stadium: "Maracanã", founded: 1895, image: "/teams/flamengo.svg" },
  { id: 27, name: "Palmeiras", league: "Brasileirão", country: "Brazil", stadium: "Allianz Parque", founded: 1914, image: "/teams/palmeiras.svg" },
  { id: 28, name: "Club América", league: "Liga MX", country: "Mexico", stadium: "Estadio Azteca", founded: 1916, image: "/teams/america.svg" },
  { id: 29, name: "Chivas Guadalajara", league: "Liga MX", country: "Mexico", stadium: "Estadio Akron", founded: 1906, image: "/teams/chivas.svg" },
  { id: 30, name: "Boca Juniors", league: "Primera División", country: "Argentina", stadium: "La Bombonera", founded: 1905, image: "/teams/boca.svg" },
  { id: 31, name: "River Plate", league: "Primera División", country: "Argentina", stadium: "Estadio Monumental", founded: 1901, image: "/teams/river.svg" },
  { id: 32, name: "LA Galaxy", league: "MLS", country: "United States", stadium: "Dignity Health Sports Park", founded: 1994, image: "/teams/la-galaxy.svg" },
  { id: 33, name: "Seattle Sounders", league: "MLS", country: "United States", stadium: "Lumen Field", founded: 2007, image: "/teams/sounders.svg" },
  { id: 34, name: "Al Hilal", league: "Saudi Pro League", country: "Saudi Arabia", stadium: "King Fahd Stadium", founded: 1957, image: "/teams/al-hilal.svg" }
];

// Players data
const players = [
  { id: 1, name: "Erling Haaland", team: "Manchester City", position: "Forward", nationality: "Norway", age: 25, goals: 32, assists: 6, appearances: 33, image: "/players/haaland.jpg" },
  { id: 2, name: "Mohamed Salah", team: "Liverpool", position: "Forward", nationality: "Egypt", age: 33, goals: 24, assists: 12, appearances: 31, image: "/players/salah.jpg" },
  { id: 3, name: "Bukayo Saka", team: "Arsenal", position: "Winger", nationality: "England", age: 24, goals: 18, assists: 14, appearances: 32, image: "/players/saka.jpg" },
  { id: 4, name: "Kevin De Bruyne", team: "Manchester City", position: "Midfielder", nationality: "Belgium", age: 34, goals: 8, assists: 18, appearances: 28, image: "/players/debruyne.jpg" },
  { id: 5, name: "Cole Palmer", team: "Chelsea", position: "Midfielder", nationality: "England", age: 24, goals: 20, assists: 11, appearances: 30, image: "/players/palmer.jpg" },
  { id: 6, name: "Kylian Mbappé", team: "Real Madrid", position: "Forward", nationality: "France", age: 27, goals: 28, assists: 12, appearances: 35, image: "/players/mbappe.jpg" },
  { id: 7, name: "Vinícius Júnior", team: "Real Madrid", position: "Winger", nationality: "Brazil", age: 25, goals: 22, assists: 14, appearances: 34, image: "/players/vinicius.jpg" },
  { id: 8, name: "Robert Lewandowski", team: "Barcelona", position: "Forward", nationality: "Poland", age: 37, goals: 26, assists: 7, appearances: 32, image: "/players/lewandowski.jpg" },
  { id: 9, name: "Jude Bellingham", team: "Real Madrid", position: "Midfielder", nationality: "England", age: 22, goals: 19, assists: 10, appearances: 33, image: "/players/bellingham.jpg" },
  { id: 10, name: "Antoine Griezmann", team: "Atlético Madrid", position: "Forward", nationality: "France", age: 34, goals: 16, assists: 13, appearances: 30, image: "/players/griezmann.jpg" },
  { id: 11, name: "Lautaro Martínez", team: "Inter Milan", position: "Forward", nationality: "Argentina", age: 28, goals: 23, assists: 8, appearances: 31, image: "/players/lautaro.jpg" },
  { id: 12, name: "Rafael Leão", team: "AC Milan", position: "Winger", nationality: "Portugal", age: 26, goals: 17, assists: 11, appearances: 29, image: "/players/leao.jpg" },
  { id: 13, name: "Dušan Vlahović", team: "Juventus", position: "Forward", nationality: "Serbia", age: 26, goals: 21, assists: 5, appearances: 32, image: "/players/vlahovic.jpg" },
  { id: 14, name: "Harry Kane", team: "Bayern Munich", position: "Forward", nationality: "England", age: 32, goals: 35, assists: 9, appearances: 34, image: "/players/kane.jpg" },
  { id: 15, name: "Jamal Musiala", team: "Bayern Munich", position: "Midfielder", nationality: "Germany", age: 22, goals: 15, assists: 12, appearances: 30, image: "/players/musiala.jpg" },
  { id: 16, name: "Serhou Guirassy", team: "Borussia Dortmund", position: "Forward", nationality: "Guinea", age: 28, goals: 24, assists: 6, appearances: 28, image: "/players/guirassy.jpg" },
  { id: 17, name: "Bradley Barcola", team: "Paris Saint-Germain", position: "Winger", nationality: "France", age: 22, goals: 16, assists: 9, appearances: 27, image: "/players/barcola.jpg" },
  { id: 18, name: "Gonçalo Ramos", team: "Paris Saint-Germain", position: "Forward", nationality: "Portugal", age: 24, goals: 19, assists: 7, appearances: 26, image: "/players/ramos.jpg" },
  { id: 19, name: "Cristiano Ronaldo", team: "Al Nassr", position: "Forward", nationality: "Portugal", age: 40, goals: 27, assists: 9, appearances: 32, image: "/players/ronaldo.jpg" },
  { id: 20, name: "Neymar Jr", team: "Al Hilal", position: "Forward", nationality: "Brazil", age: 34, goals: 15, assists: 12, appearances: 24, image: "/players/neymar.jpg" },
  { id: 21, name: "Karim Benzema", team: "Al Ittihad", position: "Forward", nationality: "France", age: 38, goals: 22, assists: 8, appearances: 29, image: "/players/benzema.jpg" },
  { id: 22, name: "Lionel Messi", team: "Inter Miami", position: "Forward", nationality: "Argentina", age: 38, goals: 25, assists: 16, appearances: 30, image: "/players/messi.jpg" },
  { id: 23, name: "Luis Suárez", team: "Inter Miami", position: "Forward", nationality: "Uruguay", age: 39, goals: 18, assists: 10, appearances: 28, image: "/players/suarez.jpg" },
  { id: 24, name: "Marco Reus", team: "LA Galaxy", position: "Midfielder", nationality: "Germany", age: 36, goals: 12, assists: 14, appearances: 25, image: "/players/reus.jpg" },
  { id: 25, name: "Brian Brobbey", team: "Ajax", position: "Forward", nationality: "Netherlands", age: 24, goals: 20, assists: 5, appearances: 27, image: "/players/brobbey.jpg" },
  { id: 26, name: "Viktor Gyökeres", team: "Sporting CP", position: "Forward", nationality: "Sweden", age: 27, goals: 29, assists: 7, appearances: 31, image: "/players/gyokeres.jpg" },
  { id: 27, name: "Pedro", team: "Flamengo", position: "Forward", nationality: "Brazil", age: 27, goals: 23, assists: 6, appearances: 29, image: "/players/pedro.jpg" },
  { id: 28, name: "Estêvão", team: "Palmeiras", position: "Winger", nationality: "Brazil", age: 19, goals: 14, assists: 11, appearances: 26, image: "/players/estevao.jpg" }
];

// Matches data
const matches = [
  { id: 1, homeTeam: "Manchester United", awayTeam: "Liverpool", homeScore: 2, awayScore: 2, date: "2026-02-15", time: "15:00", status: "Upcoming", league: "Premier League", stadium: "Old Trafford" },
  { id: 2, homeTeam: "Real Madrid", awayTeam: "Barcelona", homeScore: 3, awayScore: 1, date: "2026-02-14", time: "21:00", status: "Completed", league: "La Liga", stadium: "Santiago Bernabéu" },
  { id: 3, homeTeam: "Bayern Munich", awayTeam: "Borussia Dortmund", homeScore: null, awayScore: null, date: "2026-02-16", time: "18:30", status: "Upcoming", league: "Bundesliga", stadium: "Allianz Arena" },
  { id: 4, homeTeam: "Inter Miami", awayTeam: "LA Galaxy", homeScore: 2, awayScore: 1, date: "2026-02-13", time: "20:00", status: "Completed", league: "MLS", stadium: "DRV PNK Stadium" },
  { id: 5, homeTeam: "Al Nassr", awayTeam: "Al Hilal", homeScore: 1, awayScore: 1, date: "2026-02-14", time: "19:00", status: "Live", league: "Saudi Pro League", stadium: "Mrsool Park" },
  { id: 6, homeTeam: "Paris Saint-Germain", awayTeam: "Olympique Marseille", homeScore: 4, awayScore: 0, date: "2026-02-12", time: "21:00", status: "Completed", league: "Ligue 1", stadium: "Parc des Princes" },
  { id: 7, homeTeam: "Manchester City", awayTeam: "Arsenal", homeScore: null, awayScore: null, date: "2026-02-17", time: "16:30", status: "Upcoming", league: "Premier League", stadium: "Etihad Stadium" },
  { id: 8, homeTeam: "Atlético Madrid", awayTeam: "Real Madrid", homeScore: 0, awayScore: 2, date: "2026-02-11", time: "21:00", status: "Completed", league: "La Liga", stadium: "Cívitas Metropolitano" },
  { id: 9, homeTeam: "AC Milan", awayTeam: "Inter Milan", homeScore: null, awayScore: null, date: "2026-02-18", time: "20:45", status: "Upcoming", league: "Serie A", stadium: "San Siro" },
  { id: 10, homeTeam: "Juventus", awayTeam: "Napoli", homeScore: 1, awayScore: 1, date: "2026-02-14", time: "19:45", status: "Live", league: "Serie A", stadium: "Allianz Stadium" },
  { id: 11, homeTeam: "Chelsea", awayTeam: "Tottenham Hotspur", homeScore: 2, awayScore: 0, date: "2026-02-13", time: "17:30", status: "Completed", league: "Premier League", stadium: "Stamford Bridge" },
  { id: 12, homeTeam: "Barcelona", awayTeam: "Atlético Madrid", homeScore: null, awayScore: null, date: "2026-02-19", time: "21:00", status: "Upcoming", league: "La Liga", stadium: "Camp Nou" },
  { id: 13, homeTeam: "Ajax", awayTeam: "PSV Eindhoven", homeScore: 3, awayScore: 2, date: "2026-02-12", time: "14:30", status: "Completed", league: "Eredivisie", stadium: "Johan Cruyff Arena" },
  { id: 14, homeTeam: "Benfica", awayTeam: "Porto", homeScore: 2, awayScore: 2, date: "2026-02-14", time: "20:00", status: "Live", league: "Primeira Liga", stadium: "Estádio da Luz" },
  { id: 15, homeTeam: "Sporting CP", awayTeam: "Benfica", homeScore: null, awayScore: null, date: "2026-02-20", time: "19:15", status: "Upcoming", league: "Primeira Liga", stadium: "Estádio José Alvalade" },
  { id: 16, homeTeam: "Flamengo", awayTeam: "Palmeiras", homeScore: 1, awayScore: 0, date: "2026-02-13", time: "22:00", status: "Completed", league: "Brasileirão", stadium: "Maracanã" },
  { id: 17, homeTeam: "Club América", awayTeam: "Chivas Guadalajara", homeScore: null, awayScore: null, date: "2026-02-21", time: "21:00", status: "Upcoming", league: "Liga MX", stadium: "Estadio Azteca" },
  { id: 18, homeTeam: "Boca Juniors", awayTeam: "River Plate", homeScore: 2, awayScore: 1, date: "2026-02-13", time: "21:30", status: "Completed", league: "Primera División", stadium: "La Bombonera" },
  { id: 19, homeTeam: "Olympique Lyonnais", awayTeam: "AS Monaco", homeScore: null, awayScore: null, date: "2026-02-22", time: "17:00", status: "Upcoming", league: "Ligue 1", stadium: "Groupama Stadium" },
  { id: 20, homeTeam: "Seattle Sounders", awayTeam: "Inter Miami", homeScore: 0, awayScore: 3, date: "2026-02-12", time: "19:00", status: "Completed", league: "MLS", stadium: "Lumen Field" }
];

// Standings data
const standings = [
  { position: 1, team: "Liverpool", league: "Premier League", played: 25, won: 18, drawn: 5, lost: 2, goalsFor: 58, goalsAgainst: 22, goalDifference: 36, points: 59 },
  { position: 2, team: "Manchester City", league: "Premier League", played: 25, won: 17, drawn: 6, lost: 2, goalsFor: 62, goalsAgainst: 25, goalDifference: 37, points: 57 },
  { position: 3, team: "Arsenal", league: "Premier League", played: 25, won: 16, drawn: 7, lost: 2, goalsFor: 54, goalsAgainst: 23, goalDifference: 31, points: 55 },
  { position: 4, team: "Chelsea", league: "Premier League", played: 25, won: 14, drawn: 6, lost: 5, goalsFor: 48, goalsAgainst: 30, goalDifference: 18, points: 48 },
  { position: 5, team: "Manchester United", league: "Premier League", played: 25, won: 13, drawn: 5, lost: 7, goalsFor: 42, goalsAgainst: 35, goalDifference: 7, points: 44 },
  { position: 6, team: "Tottenham Hotspur", league: "Premier League", played: 25, won: 12, drawn: 6, lost: 7, goalsFor: 45, goalsAgainst: 38, goalDifference: 7, points: 42 },
  { position: 1, team: "Real Madrid", league: "La Liga", played: 24, won: 19, drawn: 3, lost: 2, goalsFor: 61, goalsAgainst: 18, goalDifference: 43, points: 60 },
  { position: 2, team: "Barcelona", league: "La Liga", played: 24, won: 17, drawn: 5, lost: 2, goalsFor: 56, goalsAgainst: 22, goalDifference: 34, points: 56 },
  { position: 3, team: "Atlético Madrid", league: "La Liga", played: 24, won: 15, drawn: 6, lost: 3, goalsFor: 48, goalsAgainst: 24, goalDifference: 24, points: 51 },
  { position: 1, team: "Bayern Munich", league: "Bundesliga", played: 21, won: 16, drawn: 3, lost: 2, goalsFor: 65, goalsAgainst: 22, goalDifference: 43, points: 51 },
  { position: 2, team: "Borussia Dortmund", league: "Bundesliga", played: 21, won: 14, drawn: 4, lost: 3, goalsFor: 52, goalsAgainst: 28, goalDifference: 24, points: 46 },
  { position: 1, team: "Inter Milan", league: "Serie A", played: 24, won: 18, drawn: 4, lost: 2, goalsFor: 55, goalsAgainst: 20, goalDifference: 35, points: 58 },
  { position: 2, team: "Napoli", league: "Serie A", played: 24, won: 16, drawn: 5, lost: 3, goalsFor: 51, goalsAgainst: 25, goalDifference: 26, points: 53 },
  { position: 3, team: "Juventus", league: "Serie A", played: 24, won: 15, drawn: 6, lost: 3, goalsFor: 45, goalsAgainst: 22, goalDifference: 23, points: 51 },
  { position: 4, team: "AC Milan", league: "Serie A", played: 24, won: 14, drawn: 5, lost: 5, goalsFor: 46, goalsAgainst: 28, goalDifference: 18, points: 47 },
  { position: 1, team: "Paris Saint-Germain", league: "Ligue 1", played: 23, won: 18, drawn: 3, lost: 2, goalsFor: 58, goalsAgainst: 18, goalDifference: 40, points: 57 },
  { position: 2, team: "Olympique Marseille", league: "Ligue 1", played: 23, won: 14, drawn: 6, lost: 3, goalsFor: 45, goalsAgainst: 24, goalDifference: 21, points: 48 },
  { position: 3, team: "AS Monaco", league: "Ligue 1", played: 23, won: 13, drawn: 7, lost: 3, goalsFor: 42, goalsAgainst: 25, goalDifference: 17, points: 46 },
  { position: 4, team: "Olympique Lyonnais", league: "Ligue 1", played: 23, won: 12, drawn: 6, lost: 5, goalsFor: 38, goalsAgainst: 28, goalDifference: 10, points: 42 },
  { position: 1, team: "Ajax", league: "Eredivisie", played: 22, won: 17, drawn: 3, lost: 2, goalsFor: 62, goalsAgainst: 18, goalDifference: 44, points: 54 },
  { position: 1, team: "Benfica", league: "Primeira Liga", played: 22, won: 18, drawn: 2, lost: 2, goalsFor: 58, goalsAgainst: 16, goalDifference: 42, points: 56 },
  { position: 2, team: "Porto", league: "Primeira Liga", played: 22, won: 17, drawn: 3, lost: 2, goalsFor: 54, goalsAgainst: 18, goalDifference: 36, points: 54 },
  { position: 3, team: "Sporting CP", league: "Primeira Liga", played: 22, won: 15, drawn: 4, lost: 3, goalsFor: 48, goalsAgainst: 22, goalDifference: 26, points: 49 },
  { position: 1, team: "Flamengo", league: "Brasileirão", played: 20, won: 14, drawn: 4, lost: 2, goalsFor: 45, goalsAgainst: 18, goalDifference: 27, points: 46 },
  { position: 2, team: "Palmeiras", league: "Brasileirão", played: 20, won: 13, drawn: 5, lost: 2, goalsFor: 42, goalsAgainst: 16, goalDifference: 26, points: 44 },
  { position: 1, team: "Club América", league: "Liga MX", played: 18, won: 12, drawn: 4, lost: 2, goalsFor: 38, goalsAgainst: 14, goalDifference: 24, points: 40 },
  { position: 2, team: "Chivas Guadalajara", league: "Liga MX", played: 18, won: 11, drawn: 5, lost: 2, goalsFor: 35, goalsAgainst: 16, goalDifference: 19, points: 38 },
  { position: 1, team: "Boca Juniors", league: "Primera División", played: 19, won: 13, drawn: 4, lost: 2, goalsFor: 40, goalsAgainst: 15, goalDifference: 25, points: 43 },
  { position: 2, team: "River Plate", league: "Primera División", played: 19, won: 12, drawn: 5, lost: 2, goalsFor: 38, goalsAgainst: 16, goalDifference: 22, points: 41 },
  { position: 1, team: "Inter Miami", league: "MLS", played: 20, won: 15, drawn: 3, lost: 2, goalsFor: 52, goalsAgainst: 18, goalDifference: 34, points: 48 },
  { position: 2, team: "LA Galaxy", league: "MLS", played: 20, won: 13, drawn: 5, lost: 2, goalsFor: 45, goalsAgainst: 20, goalDifference: 25, points: 44 },
  { position: 3, team: "Seattle Sounders", league: "MLS", played: 20, won: 12, drawn: 4, lost: 4, goalsFor: 38, goalsAgainst: 22, goalDifference: 16, points: 40 },
  { position: 1, team: "Al Hilal", league: "Saudi Pro League", played: 22, won: 18, drawn: 3, lost: 1, goalsFor: 62, goalsAgainst: 15, goalDifference: 47, points: 57 },
  { position: 2, team: "Al Nassr", league: "Saudi Pro League", played: 22, won: 16, drawn: 4, lost: 2, goalsFor: 55, goalsAgainst: 18, goalDifference: 37, points: 52 }
];

// Export as serverless function handler
export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  
  // Health check
  if (pathname === '/api/health') {
    return res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
  }
  
  // Teams endpoints
  if (pathname === '/api/teams') {
    return res.status(200).json(teams);
  }
  
  if (pathname.match(/^\/api\/teams\/\d+$/)) {
    const id = parseInt(pathname.split('/').pop());
    const team = teams.find(t => t.id === id);
    return team ? res.status(200).json(team) : res.status(404).json({ error: 'Team not found' });
  }
  
  // Players endpoints
  if (pathname === '/api/players') {
    return res.status(200).json(players);
  }
  
  if (pathname.match(/^\/api\/players\/\d+$/)) {
    const id = parseInt(pathname.split('/').pop());
    const player = players.find(p => p.id === id);
    return player ? res.status(200).json(player) : res.status(404).json({ error: 'Player not found' });
  }
  
  // Matches endpoints
  if (pathname === '/api/matches') {
    return res.status(200).json(matches);
  }
  
  if (pathname.match(/^\/api\/matches\/\d+$/)) {
    const id = parseInt(pathname.split('/').pop());
    const match = matches.find(m => m.id === id);
    return match ? res.status(200).json(match) : res.status(404).json({ error: 'Match not found' });
  }
  
  // Standings endpoint
  if (pathname === '/api/standings') {
    return res.status(200).json(standings);
  }
  
  // Leagues endpoint
  if (pathname === '/api/leagues') {
    const leagues = [...new Set(teams.map(t => t.league))].sort();
    return res.status(200).json(leagues);
  }
  
  return res.status(404).json({ error: 'Not found' });
}
