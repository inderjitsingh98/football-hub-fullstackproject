import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('teams')
  const [teams, setTeams] = useState([])
  const [players, setPlayers] = useState([])
  const [matches, setMatches] = useState([])
  const [standings, setStandings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_URL = 'http://localhost:3001/api'

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [teamsRes, playersRes, matchesRes, standingsRes] = await Promise.all([
        fetch(`${API_URL}/teams`),
        fetch(`${API_URL}/players`),
        fetch(`${API_URL}/matches`),
        fetch(`${API_URL}/standings`)
      ])

      const teamsData = await teamsRes.json()
      const playersData = await playersRes.json()
      const matchesData = await matchesRes.json()
      const standingsData = await standingsRes.json()

      setTeams(teamsData)
      setPlayers(playersData)
      setMatches(matchesData)
      setStandings(standingsData)
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch data. Make sure the backend is running on port 3001.')
      setLoading(false)
    }
  }

  const renderTeams = () => (
    <div className="container" data-testid="teams-container">
      {teams.map(team => (
        <div key={team.id} className="card" data-testid={`team-${team.id}`}>
          <h3>{team.name}</h3>
          <p><strong>Stadium:</strong> {team.stadium}</p>
          <p><strong>Founded:</strong> {team.founded}</p>
          <p><strong>League:</strong> {team.league}</p>
          <p><strong>Country:</strong> {team.country}</p>
        </div>
      ))}
    </div>
  )

  const renderPlayers = () => (
    <div className="container" data-testid="players-container">
      {players.map(player => (
        <div key={player.id} className="card" data-testid={`player-${player.id}`}>
          <h3>{player.name}</h3>
          <p><strong>Team:</strong> {player.team}</p>
          <p><strong>Position:</strong> {player.position}</p>
          <p><strong>Nationality:</strong> {player.nationality}</p>
          <p><strong>Age:</strong> {player.age}</p>
          <div className="player-stats">
            <div className="stat">
              <div className="stat-label">Goals</div>
              <div className="stat-value">{player.goals}</div>
            </div>
            <div className="stat">
              <div className="stat-label">Assists</div>
              <div className="stat-value">{player.assists}</div>
            </div>
            <div className="stat">
              <div className="stat-label">Apps</div>
              <div className="stat-value">{player.appearances}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderMatches = () => (
    <div className="container" data-testid="matches-container">
      {matches.map(match => (
        <div key={match.id} className="card match-card" data-testid={`match-${match.id}`}>
          <div className="team">
            <h3>{match.homeTeam}</h3>
          </div>
          <div className="score">
            {match.homeScore} - {match.awayScore}
          </div>
          <div className="team">
            <h3>{match.awayTeam}</h3>
          </div>
          <div style={{width: '100%', marginTop: '1rem', textAlign: 'center'}}>
            <p><strong>Date:</strong> {match.date} at {match.time}</p>
            <p><strong>Stadium:</strong> {match.stadium}</p>
            <p><strong>Status:</strong> <span style={{
              color: match.status === 'completed' ? 'green' : 'orange',
              fontWeight: 'bold'
            }}>{match.status}</span></p>
          </div>
        </div>
      ))}
    </div>
  )

  const renderStandings = () => (
    <div className="standings-container" data-testid="standings-container">
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
          {standings.map(standing => (
            <tr key={standing.position} data-testid={`standing-${standing.position}`}>
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
  )

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
            <p className="subtitle">Football Enthusiast & Developer</p>
          </div>

          <div className="about-text">
            <p>
              <strong>Welcome to my Football Hub!</strong> I'm Inderjit, a passionate football fanatic who lives and breathes the beautiful game.
            </p>
          </div>

          <div className="about-text">
            <p>
              Football isn't just a sport for me—it's a way of life. From the tactical nuances of formations to the electric atmosphere of match day, I'm captivated by every aspect of the game.
            </p>
          </div>

          <div className="mission-statement">
            <h3>My Vision</h3>
            <p>
              This platform represents my ambition to bridge technology and football. I'm building a comprehensive hub where fans can explore teams, track players, follow matches, and dive deep into the statistics that make football fascinating.
            </p>
          </div>

          <div className="about-text" style={{ marginTop: '24px' }}>
            <p>
              Whether you're analyzing league standings, discovering new players, or keeping up with fixtures, this is your one-stop destination for everything football. Built with passion, powered by data, designed for fans.
            </p>
          </div>

          <div className="about-text" style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #d2d2d7' }}>
            <p style={{ fontSize: '13px', color: '#86868b' }}>
              © 2026 Inderjit Singh<br />
              Built with React & Node.js
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="header">
          <h1>Football Hub</h1>
          <p>Your complete source for football teams, players, and matches</p>
        </div>

        <nav className="nav">
          <button
            className={activeTab === 'teams' ? 'active' : ''}
            onClick={() => setActiveTab('teams')}
            data-testid="teams-tab"
          >
            Teams
          </button>
          <button
            className={activeTab === 'players' ? 'active' : ''}
            onClick={() => setActiveTab('players')}
            data-testid="players-tab"
          >
            Players
          </button>
          <button
            className={activeTab === 'matches' ? 'active' : ''}
            onClick={() => setActiveTab('matches')}
            data-testid="matches-tab"
          >
            Matches
          </button>
          <button
            className={activeTab === 'standings' ? 'active' : ''}
            onClick={() => setActiveTab('standings')}
            data-testid="standings-tab"
          >
            Standings
          </button>
        </nav>

        <div className="content">
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
