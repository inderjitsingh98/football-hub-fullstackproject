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

export default matches;
