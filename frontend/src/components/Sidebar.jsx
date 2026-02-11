const Sidebar = ({ darkMode, onToggleDarkMode }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="profile-section">
          <div className="profile-image">IS</div>
          <h2>Inderjit Singh</h2>
          <p className="subtitle">Full-Stack Developer & Football Fanatic</p>
          <button 
            className="theme-toggle" 
            onClick={onToggleDarkMode}
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
  )
}

export default Sidebar
