import FilterBar from './FilterBar'

const Matches = ({
  matches,
  leagues,
  selectedLeague,
  selectedStatus,
  onLeagueChange,
  onStatusChange
}) => {
  const filteredMatches = matches.filter(match => {
    const matchesLeague = selectedLeague === 'all' || match.league === selectedLeague
    const matchesStatus = selectedStatus === 'all' || match.status === selectedStatus
    return matchesLeague && matchesStatus
  })

  return (
    <>
      <FilterBar results={`${filteredMatches.length} ${filteredMatches.length === 1 ? 'match' : 'matches'}`}>
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
        <div className="filter-group">
          <label className="filter-label">📊 Status</label>
          <select 
            className="filter-select"
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="all">All Matches</option>
            <option value="upcoming">⏰ Upcoming</option>
            <option value="completed">✓ Completed</option>
          </select>
        </div>
      </FilterBar>

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
}

export default Matches
