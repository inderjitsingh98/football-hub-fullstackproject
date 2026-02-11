import { useState, useEffect, useRef } from 'react'
import './App.css'
import { useFootballData } from './hooks/useFootballData'
import { getTeamBadge, getCountryFlag } from './utils/badges'
import Sidebar from './components/Sidebar'
import Teams from './components/Teams'
import Players from './components/Players'
import Matches from './components/Matches'
import Standings from './components/Standings'

function App() {
  const [activeTab, setActiveTab] = useState('teams')
  const [scrolled, setScrolled] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })
  const contentRef = useRef(null)

  const { teams, players, matches, standings, leagues, loading, error } = useFootballData()

  // Scoped filter state per tab
  const [teamsFilters, setTeamsFilters] = useState({ league: 'all', search: '' })
  const [playersFilters, setPlayersFilters] = useState({ position: 'all', search: '' })
  const [matchesFilters, setMatchesFilters] = useState({ league: 'all', status: 'all' })
  const [standingsFilters, setStandingsFilters] = useState({ league: 'all' })

  useEffect(() => {
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

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
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
            <button 
              className="theme-toggle" 
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
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
              setTeamsFilters({ league: 'all', search: '' })
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
              setPlayersFilters({ position: 'all', search: '' })
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
              setMatchesFilters({ league: 'all', status: 'all' })
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
              setStandingsFilters({ league: 'all' })
            }}
            data-testid="standings-tab"
          >
            <span className="nav-icon">📊</span>
            <span>Standings</span>
          </button>
        </nav>

        <div className="content" key={activeTab}>
          {activeTab === 'teams' && (
            <Teams
              teams={teams}
              leagues={leagues}
              selectedLeague={teamsFilters.league}
              onLeagueChange={(league) => setTeamsFilters(prev => ({ ...prev, league }))}
              searchQuery={teamsFilters.search}
              onSearchChange={(search) => setTeamsFilters(prev => ({ ...prev, search }))}
              getTeamBadge={getTeamBadge}
            />
          )}

          {activeTab === 'players' && (
            <Players
              players={players}
              selectedPosition={playersFilters.position}
              onPositionChange={(position) => setPlayersFilters(prev => ({ ...prev, position }))}
              searchQuery={playersFilters.search}
              onSearchChange={(search) => setPlayersFilters(prev => ({ ...prev, search }))}
              getCountryFlag={getCountryFlag}
            />
          )}

          {activeTab === 'matches' && (
            <Matches
              matches={matches}
              leagues={leagues}
              selectedLeague={matchesFilters.league}
              selectedStatus={matchesFilters.status}
              onLeagueChange={(league) => setMatchesFilters(prev => ({ ...prev, league }))}
              onStatusChange={(status) => setMatchesFilters(prev => ({ ...prev, status }))}
            />
          )}

          {activeTab === 'standings' && (
            <Standings
              standings={standings}
              leagues={leagues}
              selectedLeague={standingsFilters.league}
              onLeagueChange={(league) => setStandingsFilters({ league })}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default App
