import FilterBar from './FilterBar'

const Standings = ({
  standings,
  leagues,
  selectedLeague,
  onLeagueChange
}) => {
  const standingsByLeague = standings.reduce((acc, standing) => {
    if (!acc[standing.league]) {
      acc[standing.league] = []
    }
    acc[standing.league].push(standing)
    return acc
  }, {})

  const filteredStandingsByLeague = selectedLeague === 'all' 
    ? standingsByLeague
    : { [selectedLeague]: standingsByLeague[selectedLeague] || [] }

  const leagueCount = Object.keys(filteredStandingsByLeague).length

  return (
    <>
      <FilterBar results={`${leagueCount} ${leagueCount === 1 ? 'league' : 'leagues'}`}>
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
      </FilterBar>

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
  )
}

export default Standings
