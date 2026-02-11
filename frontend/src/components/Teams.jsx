import FilterBar from './FilterBar'

const Teams = ({
  teams,
  leagues,
  selectedLeague,
  onLeagueChange,
  searchQuery,
  onSearchChange,
  getTeamBadge
}) => {
  const filteredTeams = teams.filter(team => {
    const matchesLeague = selectedLeague === 'all' || team.league === selectedLeague
    const matchesSearch = searchQuery === '' || 
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.country.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesLeague && matchesSearch
  })

  return (
    <>
      <FilterBar results={`${filteredTeams.length} ${filteredTeams.length === 1 ? 'team' : 'teams'}`}>
        <div className="filter-group">
          <label className="filter-label">🌍 League</label>
          <select 
            className="filter-select"
            value={selectedLeague}
            onChange={(e) => onLeagueChange(e.target.value)}
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
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </FilterBar>

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
}

export default Teams
