import teams from '../data/teams.js';
import players from '../data/players.js';
import matches from '../data/matches.js';
import standings from '../data/standings.js';

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  const params = url.searchParams;

  // Health check
  if (pathname === '/api/health') {
    return res.status(200).json({
      status: 'ok',
      message: 'Football API is running',
      stats: {
        teams: teams.length,
        players: players.length,
        matches: matches.length,
        leagues: [...new Set(teams.map(t => t.league))].length
      }
    });
  }

  // Teams endpoints
  if (pathname === '/api/teams') {
    let result = teams;
    const league = params.get('league');
    const country = params.get('country');
    if (league) {
      result = result.filter(t => t.league.toLowerCase() === league.toLowerCase());
    }
    if (country) {
      result = result.filter(t => t.country.toLowerCase() === country.toLowerCase());
    }
    return res.status(200).json(result);
  }

  if (pathname.match(/^\/api\/teams\/\d+$/)) {
    const id = parseInt(pathname.split('/').pop());
    const team = teams.find(t => t.id === id);
    return team ? res.status(200).json(team) : res.status(404).json({ error: 'Team not found' });
  }

  // Players endpoints
  if (pathname === '/api/players') {
    let result = players;
    const team = params.get('team');
    const position = params.get('position');
    const nationality = params.get('nationality');
    if (team) {
      result = result.filter(p => p.team.toLowerCase().includes(team.toLowerCase()));
    }
    if (position) {
      result = result.filter(p => p.position.toLowerCase() === position.toLowerCase());
    }
    if (nationality) {
      result = result.filter(p => p.nationality.toLowerCase() === nationality.toLowerCase());
    }
    return res.status(200).json(result);
  }

  if (pathname.match(/^\/api\/players\/\d+$/)) {
    const id = parseInt(pathname.split('/').pop());
    const player = players.find(p => p.id === id);
    return player ? res.status(200).json(player) : res.status(404).json({ error: 'Player not found' });
  }

  // Matches endpoints
  if (pathname === '/api/matches') {
    let result = matches;
    const league = params.get('league');
    const status = params.get('status');
    const team = params.get('team');
    if (league) {
      result = result.filter(m => m.league.toLowerCase() === league.toLowerCase());
    }
    if (status) {
      result = result.filter(m => m.status.toLowerCase() === status.toLowerCase());
    }
    if (team) {
      result = result.filter(m =>
        m.homeTeam.toLowerCase().includes(team.toLowerCase()) ||
        m.awayTeam.toLowerCase().includes(team.toLowerCase())
      );
    }
    return res.status(200).json(result);
  }

  if (pathname.match(/^\/api\/matches\/\d+$/)) {
    const id = parseInt(pathname.split('/').pop());
    const match = matches.find(m => m.id === id);
    return match ? res.status(200).json(match) : res.status(404).json({ error: 'Match not found' });
  }

  // Standings endpoints
  if (pathname === '/api/standings') {
    let result = standings;
    const league = params.get('league');
    if (league) {
      result = result.filter(s => s.league.toLowerCase() === league.toLowerCase());
    }
    return res.status(200).json(result);
  }

  if (pathname.match(/^\/api\/standings\/\d+$/)) {
    const id = parseInt(pathname.split('/').pop());
    const standing = standings.find(s => s.id === id);
    return standing ? res.status(200).json(standing) : res.status(404).json({ error: 'Standing not found' });
  }

  // Leagues endpoint
  if (pathname === '/api/leagues') {
    const leagues = [...new Set(teams.map(t => t.league))].sort();
    return res.status(200).json(leagues);
  }

  return res.status(404).json({ error: 'Not found' });
}
