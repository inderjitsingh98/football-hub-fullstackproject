const players = [
  // Premier League
  { id: 1, name: 'Erling Haaland', position: 'Forward', team: 'Manchester City', nationality: 'Norway', age: 25, goals: 32, assists: 6, appearances: 33, image: '/players/haaland.jpg' },
  { id: 2, name: 'Mohamed Salah', position: 'Forward', team: 'Liverpool', nationality: 'Egypt', age: 33, goals: 24, assists: 12, appearances: 31, image: '/players/salah.jpg' },
  { id: 3, name: 'Bukayo Saka', position: 'Winger', team: 'Arsenal', nationality: 'England', age: 24, goals: 18, assists: 14, appearances: 32, image: '/players/saka.jpg' },
  { id: 4, name: 'Kevin De Bruyne', position: 'Midfielder', team: 'Manchester City', nationality: 'Belgium', age: 34, goals: 8, assists: 18, appearances: 28, image: '/players/debruyne.jpg' },
  { id: 5, name: 'Cole Palmer', position: 'Midfielder', team: 'Chelsea', nationality: 'England', age: 24, goals: 20, assists: 11, appearances: 30, image: '/players/palmer.jpg' },

  // La Liga
  { id: 6, name: 'Kylian Mbappé', position: 'Forward', team: 'Real Madrid', nationality: 'France', age: 27, goals: 28, assists: 12, appearances: 35, image: '/players/mbappe.jpg' },
  { id: 7, name: 'Vinícius Júnior', position: 'Winger', team: 'Real Madrid', nationality: 'Brazil', age: 25, goals: 22, assists: 14, appearances: 34, image: '/players/vinicius.jpg' },
  { id: 8, name: 'Robert Lewandowski', position: 'Forward', team: 'Barcelona', nationality: 'Poland', age: 37, goals: 26, assists: 7, appearances: 32, image: '/players/lewandowski.jpg' },
  { id: 9, name: 'Jude Bellingham', position: 'Midfielder', team: 'Real Madrid', nationality: 'England', age: 22, goals: 19, assists: 10, appearances: 33, image: '/players/bellingham.jpg' },
  { id: 10, name: 'Antoine Griezmann', position: 'Forward', team: 'Atlético Madrid', nationality: 'France', age: 34, goals: 16, assists: 13, appearances: 30, image: '/players/griezmann.jpg' },

  // Serie A
  { id: 11, name: 'Lautaro Martínez', position: 'Forward', team: 'Inter Milan', nationality: 'Argentina', age: 28, goals: 23, assists: 8, appearances: 31, image: '/players/lautaro.jpg' },
  { id: 12, name: 'Rafael Leão', position: 'Winger', team: 'AC Milan', nationality: 'Portugal', age: 26, goals: 17, assists: 11, appearances: 29, image: '/players/leao.jpg' },
  { id: 13, name: 'Dušan Vlahović', position: 'Forward', team: 'Juventus', nationality: 'Serbia', age: 26, goals: 21, assists: 5, appearances: 32, image: '/players/vlahovic.jpg' },

  // Bundesliga
  { id: 14, name: 'Harry Kane', position: 'Forward', team: 'Bayern Munich', nationality: 'England', age: 32, goals: 35, assists: 9, appearances: 34, image: '/players/kane.jpg' },
  { id: 15, name: 'Jamal Musiala', position: 'Midfielder', team: 'Bayern Munich', nationality: 'Germany', age: 22, goals: 15, assists: 12, appearances: 30, image: '/players/musiala.jpg' },
  { id: 16, name: 'Serhou Guirassy', position: 'Forward', team: 'Borussia Dortmund', nationality: 'Guinea', age: 28, goals: 24, assists: 6, appearances: 28, image: '/players/guirassy.jpg' },

  // Ligue 1
  { id: 17, name: 'Bradley Barcola', position: 'Winger', team: 'Paris Saint-Germain', nationality: 'France', age: 22, goals: 16, assists: 9, appearances: 27, image: '/players/barcola.jpg' },
  { id: 18, name: 'Gonçalo Ramos', position: 'Forward', team: 'Paris Saint-Germain', nationality: 'Portugal', age: 24, goals: 19, assists: 7, appearances: 26, image: '/players/ramos.jpg' },

  // Saudi Pro League
  { id: 19, name: 'Cristiano Ronaldo', position: 'Forward', team: 'Al Nassr', nationality: 'Portugal', age: 40, goals: 27, assists: 9, appearances: 32, image: '/players/ronaldo.jpg' },
  { id: 20, name: 'Neymar Jr', position: 'Forward', team: 'Al Hilal', nationality: 'Brazil', age: 34, goals: 15, assists: 12, appearances: 24, image: '/players/neymar.jpg' },
  { id: 21, name: 'Karim Benzema', position: 'Forward', team: 'Al Ittihad', nationality: 'France', age: 38, goals: 22, assists: 8, appearances: 29, image: '/players/benzema.jpg' },

  // MLS
  { id: 22, name: 'Lionel Messi', position: 'Forward', team: 'Inter Miami', nationality: 'Argentina', age: 38, goals: 25, assists: 16, appearances: 30, image: '/players/messi.jpg' },
  { id: 23, name: 'Luis Suárez', position: 'Forward', team: 'Inter Miami', nationality: 'Uruguay', age: 39, goals: 18, assists: 10, appearances: 28, image: '/players/suarez.jpg' },
  { id: 24, name: 'Marco Reus', position: 'Midfielder', team: 'LA Galaxy', nationality: 'Germany', age: 36, goals: 12, assists: 14, appearances: 25, image: '/players/reus.jpg' },

  // Eredivisie
  { id: 25, name: 'Brian Brobbey', position: 'Forward', team: 'Ajax', nationality: 'Netherlands', age: 24, goals: 20, assists: 5, appearances: 27, image: '/players/brobbey.jpg' },

  // Primeira Liga
  { id: 26, name: 'Viktor Gyökeres', position: 'Forward', team: 'Sporting CP', nationality: 'Sweden', age: 27, goals: 29, assists: 7, appearances: 31, image: '/players/gyokeres.jpg' },

  // Brasileirão
  { id: 27, name: 'Pedro', position: 'Forward', team: 'Flamengo', nationality: 'Brazil', age: 27, goals: 23, assists: 6, appearances: 29, image: '/players/pedro.jpg' },
  { id: 28, name: 'Estêvão', position: 'Winger', team: 'Palmeiras', nationality: 'Brazil', age: 19, goals: 14, assists: 11, appearances: 26, image: '/players/estevao.jpg' }
];

export default players;
