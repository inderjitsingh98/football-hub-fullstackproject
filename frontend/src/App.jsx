import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('teams')
  const [teams, setTeams] = useState([])
  const [players, setPlayers] = useState([])
  const [matches, setMatches] = useState([])
  const [standings, setStandings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const contentRef = useRef(null)
  
  // Filter states
  const [selectedLeague, setSelectedLeague] = useState('all')
  const [selectedPosition, setSelectedPosition] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  // Available leagues
  const [leagues, setLeagues] = useState([])

  const API_URL = import.meta.env.VITE_API_URL || '/api'

  useEffect(() => {
    fetchData()
    
    // Handle scroll for glassmorphism effect
    const handleScroll = () => {
      if (contentRef.current) {
        setScrolled(contentRef.current.scrollTop > 50)
      }
    }

    const content = contentRef.current
    if (content) {
      content.addEventListener('scroll', handleScroll)
      return () => content.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [teamsRes, playersRes, matchesRes, standingsRes, leaguesRes] = await Promise.all([
        fetch(`${API_URL}/teams`),
        fetch(`${API_URL}/players`),
        fetch(`${API_URL}/matches`),
        fetch(`${API_URL}/standings`),
        fetch(`${API_URL}/leagues`)
      ])

      const teamsData = await teamsRes.json()
      const playersData = await playersRes.json()
      const matchesData = await matchesRes.json()
      const standingsData = await standingsRes.json()
      const leaguesData = await leaguesRes.json()

      setTeams(teamsData)
      setPlayers(playersData)
      setMatches(matchesData)
      setStandings(standingsData)
      setLeagues(leaguesData)
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch data. Make sure the backend is running on port 3001.')
      setLoading(false)
    }
  }

  // Get team badge emoji
  const getTeamBadge = (teamName) => {
    const badges = {
      'Manchester City': '🔵',
      'Liverpool': '🔴',
      'Arsenal': '🔴',
      'Manchester United': '🔴',
      'Chelsea': '🔵',
      'Real Madrid': '⚪',
      'Barcelona': '🔵',
      'Bayern Munich': '🔴',
      'Inter Milan': '🔵',
      'AC Milan': '🔴',
      'Juventus': '⚫',
      'Paris Saint-Germain': '🔵',
      'Al Nassr': '🟡',
      'Al Hilal': '🔵',
      'Inter Miami': '🩷',
      'LA Galaxy': '💫',
    }
    return badges[teamName] || '⚽'
  }

  // Filter teams
  const filteredTeams = teams.filter(team => {
    const matchesLeague = selectedLeague === 'all' || team.league === selectedLeague
    const matchesSearch = searchQuery === '' || 
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.country.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesLeague && matchesSearch
  })

  const renderTeams = () => (
    <>
      <div className="filters-bar">
        <div className="filter-group">
          <label className="filter-label">🌍 League</label>
          <select 
            className="filter-select"
            value={selectedLeague}
            onChange={(e) => setSelectedLeague(e.target.value)}
          >
            <option value="all">All Leagues</option>
            {leagues.map(league => (
              <option key={league} value={league}>{league}</option>
            ))}
          </select>
        </div>
        <div className="filter-group search-group">
          <label className="filter-label">🔍 Search</label>
          <input
            type="text"
            className="filter-input"
            placeholder="Search teams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="results-count">
          {filteredTeams.length} {filteredTeams.length === 1 ? 'team' : 'teams'}
        </div>
      </div>
      <div className="container" data-testid="teams-container">
        {filteredTeams.map((team, index) => (
        <div 
          key={team.id} 
          className="card" 
          data-testid={`team-${team.id}`}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="card-shimmer"></div>
          <div className="card-badge">{getTeamBadge(team.name)}</div>
          <div className="card-content">
            <h3>{team.name}</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-icon">🏟️</span>
                <div>
                  <label>Stadium</label>
                  <p>{team.stadium}</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">📅</span>
                <div>
                  <label>Founded</label>
                  <p>{team.founded}</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">🏆</span>
                <div>
                  <label>League</label>
                  <p>{team.league}</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">🌍</span>
                <div>
                  <label>Country</label>
                  <p>{team.country}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  )

  // Filter players
  const filteredPlayers = players.filter(player => {
    const matchesPosition = selectedPosition === 'all' || player.position === selectedPosition
    const matchesSearch = searchQuery === '' ||
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.team.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesPosition && matchesSearch
  })

  const positions = ['all', ...new Set(players.map(p => p.position))]

  const renderPlayers = () => (
    <>
      <div className="filters-bar">
        <div className="filter-group">
          <label className="filter-label">⚽ Position</label>
          <select 
            className="filter-select"
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
          >
            <option value="all">All Positions</option>
            {positions.filter(p => p !== 'all').map(position => (
              <option key={position} value={position}>{position}</option>
            ))}
          </select>
        </div>
        <div className="filter-group search-group">
          <label className="filter-label">🔍 Search</label>
          <input
            type="text"
            className="filter-input"
            placeholder="Search players..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="results-count">
          {filteredPlayers.length} {filteredPlayers.length === 1 ? 'player' : 'players'}
        </div>
      </div>
      <div className="container" data-testid="players-container">
        {filteredPlayers.map((player, index) => (
        <div 
          key={player.id} 
          className="card player-card" 
          data-testid={`player-${player.id}`}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="card-shimmer"></div>
          {player.image && (
            <div className="player-photo" style={{ backgroundImage: `url(${player.image})` }}></div>
          )}
          <div className="card-content">
            <div className="player-header">
              <div className="player-avatar" style={{ backgroundImage: player.image ? `url(${player.image})` : 'none' }}>
                {!player.image && player.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3>{player.name}</h3>
                <span className="player-position">{player.position}</span>
              </div>
            </div>
            <div className="player-meta">
              <span>⚽ {player.team}</span>
              <span>🏴 {player.nationality}</span>
              <span>🎂 {player.age} years</span>
            </div>
            <div className="player-stats">
              <div className="stat">
                <div className="stat-icon">⚽</div>
                <div className="stat-label">Goals</div>
                <div className="stat-value">{player.goals}</div>
              </div>
              <div className="stat">
                <div className="stat-icon">🎯</div>
                <div className="stat-label">Assists</div>
                <div className="stat-value">{player.assists}</div>
              </div>
              <div className="stat">
                <div className="stat-icon">📊</div>
                <div className="stat-label">Apps</div>
                <div className="stat-value">{player.appearances}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  )

  // Filter matches
  const filteredMatches = matches.filter(match => {
    const matchesLeague = selectedLeague === 'all' || match.league === selectedLeague
    const matchesStatus = selectedStatus === 'all' || match.status === selectedStatus
    return matchesLeague && matchesStatus
  })

  const renderMatches = () => (
    <>
      <div className="filters-bar">
        <div className="filter-group">
          <label className="filter-label">🌍 League</label>
          <select 
            className="filter-select"
            value={selectedLeague}
            onChange={(e) => setSelectedLeague(e.target.value)}
          >
            <option value="all">All Leagues</option>
            {leagues.map(league => (
              <option key={league} value={league}>{league}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label className="filter-label">📊 Status</label>
          <select 
            className="filter-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Matches</option>
            <option value="upcoming">⏰ Upcoming</option>
            <option value="completed">✓ Completed</option>
          </select>
        </div>
        <div className="results-count">
          {filteredMatches.length} {filteredMatches.length === 1 ? 'match' : 'matches'}
        </div>
      </div>
      <div className="container match-container" data-testid="matches-container">
        {filteredMatches.map((match, index) => (
        <div 
          key={match.id} 
          className="card match-card" 
          data-testid={`match-${match.id}`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="card-shimmer"></div>
          <div className="match-status-badge" data-status={match.status}>
            {match.status === 'completed' ? '✓ Completed' : '⏰ Upcoming'}
          </div>
          <div className="match-teams">
            <div className="team home-team">
              <div className="team-name">{match.homeTeam}</div>
              <div className="team-score">{match.homeScore}</div>
            </div>
            <div className="match-vs">VS</div>
            <div className="team away-team">
              <div className="team-name">{match.awayTeam}</div>
              <div className="team-score">{match.awayScore}</div>
            </div>
          </div>
          <div className="match-details">
            <div className="match-info">
              <span className="info-icon">🏆</span>
              <span>{match.league}</span>
            </div>
            <div className="match-info">
              <span className="info-icon">📅</span>
              <span>{match.date} • {match.time}</span>
            </div>
            <div className="match-info">
              <span className="info-icon">🏟️</span>
              <span>{match.stadium}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  )

  const renderStandings = () => {
    // Group standings by league
    const standingsByLeague = standings.reduce((acc, standing) => {
      if (!acc[standing.league]) {
        acc[standing.league] = [];
      }
      acc[standing.league].push(standing);
      return acc;
    }, {});

    // Filter standings by selected league
    const filteredStandingsByLeague = selectedLeague === 'all' 
      ? standingsByLeague
      : { [selectedLeague]: standingsByLeague[selectedLeague] || [] }

    return (
      <>
        <div className="filters-bar">
          <div className="filter-group">
            <label className="filter-label">🌍 League</label>
            <select 
              className="filter-select"
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
            >
              <option value="all">All Leagues</option>
              {leagues.map(league => (
                <option key={league} value={league}>{league}</option>
              ))}
            </select>
          </div>
          <div className="results-count">
            {Object.keys(filteredStandingsByLeague).length} {Object.keys(filteredStandingsByLeague).length === 1 ? 'league' : 'leagues'}
          </div>
        </div>
        <div className="standings-wrapper" data-testid="standings-container">
          {Object.entries(filteredStandingsByLeague).map(([league, leagueStandings]) => (
          <div key={league} className="standings-container" style={{ animationDelay: `${Object.keys(standingsByLeague).indexOf(league) * 0.1}s` }}>
            <h2 className="league-title">🏆 {league}</h2>
            <table className="standings-table">
              <thead>
                <tr>
                  <th>Pos</th>
                  <th>Team</th>
                  <th>Played</th>
                  <th>Won</th>
                  <th>Drawn</th>
                  <th>Lost</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {leagueStandings.map(standing => (
                  <tr key={standing.id} data-testid={`standing-${standing.id}`}>
                    <td>{standing.position}</td>
                    <td>{standing.team}</td>
                    <td>{standing.played}</td>
                    <td>{standing.won}</td>
                    <td>{standing.drawn}</td>
                    <td>{standing.lost}</td>
                    <td><strong>{standing.points}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          ))}
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <div className="main-layout">
        <div className="loading">Loading football data</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="main-layout">
        <div className="main-content">
          <div className="header">
            <h1>Football Hub</h1>
          </div>
          <div className="error">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="main-layout">
      {/* Sidebar - About Me */}
      <aside className="sidebar">
        <div className="sidebar-content">
          <div className="profile-section">
            <div className="profile-image">IS</div>
            <h2>Inderjit Singh</h2>
            <p className="subtitle">Full-Stack Developer & Football Fanatic</p>
          </div>

          <div className="about-text">
            <p>
              <strong>Where Two Passions Collide.</strong> This project is the intersection of my two greatest interests: the beautiful game of football and the art of software development.
            </p>
          </div>

          <div className="mission-statement">
            <h3>🎯 The Project</h3>
            <p>
              Built as a full-stack application combining React, Node.js, and Express, this platform showcases global football data across 12 major leagues—from the Premier League to MLS, Saudi Pro League to Serie A.
            </p>
          </div>

          <div className="about-text">
            <p>
              <strong>🧪 Testing Innovation</strong><br />
              The real magic? I'm using <strong>Playwright MCP</strong> (Model Context Protocol) to build intelligent, automated testing. This cutting-edge approach allows me to create comprehensive test suites that ensure every feature works flawlessly.
            </p>
          </div>

          <div className="about-text">
            <p>
              <strong>💡 Why This Matters</strong><br />
              Football generates massive amounts of data—teams, players, matches, standings. Managing and presenting this information requires robust engineering. This project demonstrates modern web development practices while celebrating the sport I love.
            </p>
          </div>

          <div className="about-text">
            <p>
              From glassmorphism UI design to intelligent filtering systems, from RESTful APIs to responsive layouts—every line of code represents the marriage of technical excellence and football passion.
            </p>
          </div>

          <div className="about-text" style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #d2d2d7' }}>
            <p style={{ fontSize: '13px', color: '#86868b' }}>
              © 2026 Inderjit Singh<br />
              React • Node.js • Express • Playwright MCP<br />
              <span style={{ fontSize: '11px' }}>Built with ⚽ and ☕</span>
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content" ref={contentRef}>
        <div className="floating-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
          <div className="orb orb-4"></div>
          <div className="orb orb-5"></div>
        </div>
        <div className={`header ${scrolled ? 'scrolled' : ''}`}>
          <div className="header-background"></div>
          <div className="header-content">
            <div className="header-badge">⚽ LIVE DATA</div>
            <h1 className="gradient-text">
              <span className="header-emoji">⚽</span>
              WORLDWIDE<br />FOOTBALL UNIVERSE
            </h1>
            <p className="header-subtitle">
              <span className="subtitle-item">🌍 12 Global Leagues</span>
              <span className="subtitle-separator">•</span>
              <span className="subtitle-item">📊 Real-Time Stats</span>
              <span className="subtitle-separator">•</span>
              <span className="subtitle-item">⚡ Lightning Fast</span>
            </p>
          </div>
        </div>

        <nav className={`nav ${scrolled ? 'floating' : ''}`}>
          <div className="nav-background"></div>
          <button
            className={activeTab === 'teams' ? 'active' : ''}
            onClick={() => {
              setActiveTab('teams')
              setSelectedLeague('all')
              setSearchQuery('')
            }}
            data-testid="teams-tab"
          >
            <span className="nav-icon">🏆</span>
            <span>Teams</span>
          </button>
          <button
            className={activeTab === 'players' ? 'active' : ''}
            onClick={() => {
              setActiveTab('players')
              setSelectedPosition('all')
              setSearchQuery('')
            }}
            data-testid="players-tab"
          >
            <span className="nav-icon">⭐</span>
            <span>Players</span>
          </button>
          <button
            className={activeTab === 'matches' ? 'active' : ''}
            onClick={() => {
              setActiveTab('matches')
              setSelectedLeague('all')
              setSelectedStatus('all')
            }}
            data-testid="matches-tab"
          >
            <span className="nav-icon">⚽</span>
            <span>Matches</span>
          </button>
          <button
            className={activeTab === 'standings' ? 'active' : ''}
            onClick={() => {
              setActiveTab('standings')
              setSelectedLeague('all')
            }}
            data-testid="standings-tab"
          >
            <span className="nav-icon">📊</span>
            <span>Standings</span>
          </button>
        </nav>

        <div className="content" key={activeTab}>
          {activeTab === 'teams' && renderTeams()}
          {activeTab === 'players' && renderPlayers()}
          {activeTab === 'matches' && renderMatches()}
          {activeTab === 'standings' && renderStandings()}
        </div>
      </main>
    </div>
  )
}

export default App
