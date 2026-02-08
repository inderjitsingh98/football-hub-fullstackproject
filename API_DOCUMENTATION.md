# Football Hub API Documentation

## 🌍 Global Coverage

The Football Hub API now covers **12 major football leagues** from around the world:

### Leagues Included

1. **Premier League** (England) - The world's most-watched league
2. **La Liga** (Spain) - Home of Real Madrid & Barcelona
3. **Serie A** (Italy) - Italian football excellence
4. **Bundesliga** (Germany) - German football powerhouse
5. **Ligue 1** (France) - PSG's domain
6. **Eredivisie** (Netherlands) - Ajax & PSV
7. **Primeira Liga** (Portugal) - Benfica & Porto
8. **Brasileirão** (Brazil) - South American passion
9. **Liga MX** (Mexico) - Mexican football giants
10. **Primera División** (Argentina) - Boca & River rivalry
11. **Saudi Pro League** (Saudi Arabia) - Home of Cristiano Ronaldo's Al Nassr
12. **MLS** (United States) - Featuring Messi at Inter Miami

---

## 📊 Data Coverage

### Teams
- **34 teams** across 12 leagues
- Coverage includes stadium names, founding years, league, and country
- Major clubs from each league represented

### Players
- **28 world-class players** from all leagues
- Includes current superstars:
  - Cristiano Ronaldo (Al Nassr)
  - Lionel Messi (Inter Miami)
  - Kylian Mbappé (Real Madrid)
  - Erling Haaland (Manchester City)
  - Harry Kane (Bayern Munich)
  - And many more...

### Matches
- **20 matches** across multiple leagues
- Both completed and upcoming fixtures
- Includes date, time, stadium, scores, and league information

### Standings
- **30 standing entries** covering all major leagues
- Real-time league positions
- Complete statistics (played, won, drawn, lost, points)

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:3001/api
```

### 1. Teams

#### Get All Teams
```http
GET /api/teams
```

**Query Parameters:**
- `league` - Filter by league name (e.g., "Premier League", "La Liga")
- `country` - Filter by country (e.g., "England", "Spain")

**Examples:**
```bash
# Get all teams
GET /api/teams

# Get Premier League teams only
GET /api/teams?league=Premier%20League

# Get all Spanish teams
GET /api/teams?country=Spain
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Manchester City",
    "stadium": "Etihad Stadium",
    "founded": 1880,
    "league": "Premier League",
    "country": "England"
  }
]
```

#### Get Team by ID
```http
GET /api/teams/:id
```

---

### 2. Players

#### Get All Players
```http
GET /api/players
```

**Query Parameters:**
- `team` - Filter by team name (partial match)
- `position` - Filter by position (Forward, Midfielder, etc.)
- `nationality` - Filter by nationality

**Examples:**
```bash
# Get all players
GET /api/players

# Get Real Madrid players
GET /api/players?team=Real%20Madrid

# Get all forwards
GET /api/players?position=Forward

# Get Portuguese players
GET /api/players?nationality=Portugal
```

**Response:**
```json
[
  {
    "id": 19,
    "name": "Cristiano Ronaldo",
    "position": "Forward",
    "team": "Al Nassr",
    "nationality": "Portugal",
    "age": 40,
    "goals": 27,
    "assists": 9,
    "appearances": 32
  }
]
```

#### Get Player by ID
```http
GET /api/players/:id
```

---

### 3. Matches

#### Get All Matches
```http
GET /api/matches
```

**Query Parameters:**
- `league` - Filter by league name
- `status` - Filter by status ("completed" or "upcoming")
- `team` - Filter by team name (matches where team plays)

**Examples:**
```bash
# Get all matches
GET /api/matches

# Get Premier League matches only
GET /api/matches?league=Premier%20League

# Get upcoming matches
GET /api/matches?status=upcoming

# Get Manchester City matches
GET /api/matches?team=Manchester%20City

# Get completed La Liga matches
GET /api/matches?league=La%20Liga&status=completed
```

**Response:**
```json
[
  {
    "id": 13,
    "homeTeam": "Al Nassr",
    "awayTeam": "Al Hilal",
    "homeScore": 3,
    "awayScore": 2,
    "date": "2026-02-07",
    "time": "19:00",
    "stadium": "Mrsool Park",
    "league": "Saudi Pro League",
    "status": "completed"
  }
]
```

#### Get Match by ID
```http
GET /api/matches/:id
```

---

### 4. Standings

#### Get All Standings
```http
GET /api/standings
```

**Query Parameters:**
- `league` - Filter by league name

**Examples:**
```bash
# Get all standings
GET /api/standings

# Get Premier League standings only
GET /api/standings?league=Premier%20League

# Get Saudi Pro League standings
GET /api/standings?league=Saudi%20Pro%20League

# Get MLS standings
GET /api/standings?league=MLS
```

**Response:**
```json
[
  {
    "id": 18,
    "position": 1,
    "team": "Al Hilal",
    "league": "Saudi Pro League",
    "played": 20,
    "won": 16,
    "drawn": 3,
    "lost": 1,
    "points": 51
  }
]
```

---

### 5. Leagues

#### Get All Available Leagues
```http
GET /api/leagues
```

**Response:**
```json
[
  "Brasileirão",
  "Bundesliga",
  "Eredivisie",
  "La Liga",
  "Liga MX",
  "Ligue 1",
  "MLS",
  "Premier League",
  "Primera División",
  "Primeira Liga",
  "Saudi Pro League",
  "Serie A"
]
```

---

### 6. Health Check

#### Check API Status
```http
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "message": "Football API is running",
  "stats": {
    "teams": 34,
    "players": 28,
    "matches": 20,
    "leagues": 12
  }
}
```

---

## 🎯 Featured Content

### Al Nassr & Cristiano Ronaldo
The API includes comprehensive data for Al Nassr (Saudi Pro League), featuring:
- Cristiano Ronaldo's current stats (40 years old, 27 goals, 9 assists)
- Al Nassr team information (Mrsool Park stadium, founded 1955)
- Al Nassr vs Al Hilal rivalry matches
- Saudi Pro League standings with Al Nassr at 2nd position

### Inter Miami & Lionel Messi
Complete MLS coverage featuring:
- Lionel Messi at Inter Miami (38 years old, 25 goals, 16 assists)
- Luis Suárez partnership (18 goals, 10 assists)
- Inter Miami leading MLS standings
- Inter Miami matches and results

### Top European Clubs
All major European teams included:
- Manchester City, Liverpool, Arsenal (Premier League)
- Real Madrid, Barcelona, Atlético Madrid (La Liga)
- Inter Milan, AC Milan, Juventus (Serie A)
- Bayern Munich, Borussia Dortmund (Bundesliga)
- Paris Saint-Germain (Ligue 1)

---

## 🚀 Usage Examples

### JavaScript/Fetch
```javascript
// Get all Premier League teams
const teams = await fetch('http://localhost:3001/api/teams?league=Premier%20League')
  .then(res => res.json());

// Get Cristiano Ronaldo's stats
const ronaldo = await fetch('http://localhost:3001/api/players/19')
  .then(res => res.json());

// Get upcoming Saudi Pro League matches
const matches = await fetch('http://localhost:3001/api/matches?league=Saudi%20Pro%20League&status=upcoming')
  .then(res => res.json());
```

### React Example
```jsx
const [teams, setTeams] = useState([]);

useEffect(() => {
  // Fetch all teams
  fetch('http://localhost:3001/api/teams')
    .then(res => res.json())
    .then(data => setTeams(data));
}, []);
```

---

## 📈 Statistics

- **12 Leagues** from 11 countries
- **34 Teams** with full details
- **28 Star Players** with complete stats
- **20 Matches** across all leagues
- **30 League Standing Entries**

---

## 🔄 Updates

All data is current as of **February 2026** with:
- Updated player ages
- Current team affiliations
- Recent match results
- Live league standings

---

## 💡 Tips

1. **Use Query Parameters** to filter data efficiently
2. **Combine Filters** for precise queries (e.g., `?league=MLS&status=upcoming`)
3. **Check `/api/health`** to verify API status
4. **Use `/api/leagues`** to get available league names for filtering

---

## 🌟 Highlights

- **World's Best Players**: Ronaldo, Messi, Mbappé, Haaland, and more
- **Top Leagues**: From Premier League to MLS
- **Real-time Data**: Current 2025/26 season information
- **Global Coverage**: Europe, Americas, Middle East
- **Flexible Filtering**: Query by league, team, status, and more

---

**API Version**: 2.0  
**Last Updated**: February 7, 2026  
**Server**: http://localhost:3001
