import { useEffect, useState } from 'react'

export const useFootballData = () => {
  const [teams, setTeams] = useState([])
  const [players, setPlayers] = useState([])
  const [matches, setMatches] = useState([])
  const [standings, setStandings] = useState([])
  const [leagues, setLeagues] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL || '/api'

  const fetchJson = async (url) => {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Request failed: ${res.status} ${res.statusText}`)
    }
    return res.json()
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [
          teamsData,
          playersData,
          matchesData,
          standingsData,
          leaguesData
        ] = await Promise.all([
          fetchJson(`${API_URL}/teams`),
          fetchJson(`${API_URL}/players`),
          fetchJson(`${API_URL}/matches`),
          fetchJson(`${API_URL}/standings`),
          fetchJson(`${API_URL}/leagues`)
        ])

        setTeams(teamsData)
        setPlayers(playersData)
        setMatches(matchesData)
        setStandings(standingsData)
        setLeagues(leaguesData)
      } catch (err) {
        setError('Failed to fetch data. Make sure the backend is running on port 3001.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [API_URL])

  return {
    teams,
    players,
    matches,
    standings,
    leagues,
    loading,
    error
  }
}
