export const getTeamBadge = (teamName) => {
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

export const getCountryFlag = (nationality) => {
  const flags = {
    'Norway': '🇳🇴',
    'Egypt': '🇪🇬',
    'England': '🏴',
    'Belgium': '🇧🇪',
    'France': '🇫🇷',
    'Brazil': '🇧🇷',
    'Poland': '🇵🇱',
    'Argentina': '🇦🇷',
    'Portugal': '🇵🇹',
    'Serbia': '🇷🇸',
    'Germany': '🇩🇪',
    'Guinea': '🇬🇳',
    'Uruguay': '🇺🇾',
    'Sweden': '🇸🇪',
    'Spain': '🇪🇸',
    'Croatia': '🇭🇷',
    'South Korea': '🇰🇷',
    'Netherlands': '🇳🇱',
    'Canada': '🇨🇦',
    'Nigeria': '🇳🇬',
    'Georgia': '🇬🇪',
    'Italy': '🇮🇹',
    'Morocco': '🇲🇦',
    'Senegal': '🇸🇳',
    'Cameroon': '🇨🇲',
    'Ghana': '🇬🇭',
    'Ivory Coast': '🇨🇮',
    'Colombia': '🇨🇴',
    'Chile': '🇨🇱',
    'Japan': '🇯🇵',
    'Mexico': '🇲🇽',
    'United States': '🇺🇸',
    'Saudi Arabia': '🇸🇦'
  }
  return flags[nationality] || '🏴'
}
