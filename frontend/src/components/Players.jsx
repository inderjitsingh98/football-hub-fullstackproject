import FilterBar from './FilterBar'

const Players = ({
  players,
  selectedPosition,
  onPositionChange,
  searchQuery,
  onSearchChange,
  getCountryFlag
}) => {
  const filteredPlayers = players.filter(player => {
    const matchesPosition = selectedPosition === 'all' || player.position === selectedPosition
    const matchesSearch = searchQuery === '' ||
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.team.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesPosition && matchesSearch
  })

  const positions = ['all', ...new Set(players.map(p => p.position))]

  const playerStats = {
    totalPlayers: filteredPlayers.length,
    totalGoals: filteredPlayers.reduce((sum, p) => sum + p.goals, 0),
    totalAssists: filteredPlayers.reduce((sum, p) => sum + p.assists, 0),
    totalAppearances: filteredPlayers.reduce((sum, p) => sum + p.appearances, 0),
    averageAge: filteredPlayers.length > 0 
      ? (filteredPlayers.reduce((sum, p) => sum + p.age, 0) / filteredPlayers.length).toFixed(1)
      : 0
  }

  return (
    <>
      <div className="stats-tiles" data-testid="player-stats-tiles">
        <div className="stat-tile" style={{ animationDelay: '0s' }}>
          <div className="stat-tile-icon">👥</div>
          <div className="stat-tile-content">
            <div className="stat-tile-label">Total Players</div>
            <div className="stat-tile-value">{playerStats.totalPlayers}</div>
          </div>
        </div>
        <div className="stat-tile" style={{ animationDelay: '0.1s' }}>
          <div className="stat-tile-icon">⚽</div>
          <div className="stat-tile-content">
            <div className="stat-tile-label">Total Goals</div>
            <div className="stat-tile-value">{playerStats.totalGoals.toLocaleString()}</div>
          </div>
        </div>
        <div className="stat-tile" style={{ animationDelay: '0.2s' }}>
          <div className="stat-tile-icon">🎯</div>
          <div className="stat-tile-content">
            <div className="stat-tile-label">Total Assists</div>
            <div className="stat-tile-value">{playerStats.totalAssists.toLocaleString()}</div>
          </div>
        </div>
        <div className="stat-tile" style={{ animationDelay: '0.3s' }}>
          <div className="stat-tile-icon">📊</div>
          <div className="stat-tile-content">
            <div className="stat-tile-label">Total Appearances</div>
            <div className="stat-tile-value">{playerStats.totalAppearances.toLocaleString()}</div>
          </div>
        </div>
        <div className="stat-tile" style={{ animationDelay: '0.4s' }}>
          <div className="stat-tile-icon">🎂</div>
          <div className="stat-tile-content">
            <div className="stat-tile-label">Average Age</div>
            <div className="stat-tile-value">{playerStats.averageAge} yrs</div>
          </div>
        </div>
      </div>

      <FilterBar results={`${filteredPlayers.length} ${filteredPlayers.length === 1 ? 'player' : 'players'}`}>
        <div className="filter-group">
          <label className="filter-label">⚽ Position</label>
          <select 
            className="filter-select"
            value={selectedPosition}
            onChange={(e) => onPositionChange(e.target.value)}
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
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </FilterBar>

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
                <span>{getCountryFlag(player.nationality)} {player.nationality}</span>
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
}

export default Players
