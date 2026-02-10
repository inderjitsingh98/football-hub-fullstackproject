import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Player data with search names for TheSportsDB API
const players = [
  { id: 1, name: 'Erling Haaland', searchName: 'Erling Haaland', filename: 'haaland.jpg' },
  { id: 2, name: 'Mohamed Salah', searchName: 'Mohamed Salah', filename: 'salah.jpg' },
  { id: 3, name: 'Bukayo Saka', searchName: 'Bukayo Saka', filename: 'saka.jpg' },
  { id: 4, name: 'Kevin De Bruyne', searchName: 'Kevin De Bruyne', filename: 'debruyne.jpg' },
  { id: 5, name: 'Cole Palmer', searchName: 'Cole Palmer', filename: 'palmer.jpg' },
  { id: 6, name: 'Kylian Mbappé', searchName: 'Kylian Mbappe', filename: 'mbappe.jpg' },
  { id: 7, name: 'Vinícius Júnior', searchName: 'Vinicius Junior', filename: 'vinicius.jpg' },
  { id: 8, name: 'Robert Lewandowski', searchName: 'Robert Lewandowski', filename: 'lewandowski.jpg' },
  { id: 9, name: 'Jude Bellingham', searchName: 'Jude Bellingham', filename: 'bellingham.jpg' },
  { id: 10, name: 'Antoine Griezmann', searchName: 'Antoine Griezmann', filename: 'griezmann.jpg' },
  { id: 11, name: 'Lautaro Martínez', searchName: 'Lautaro Martinez', filename: 'lautaro.jpg' },
  { id: 12, name: 'Rafael Leão', searchName: 'Rafael Leao', filename: 'leao.jpg' },
  { id: 13, name: 'Dušan Vlahović', searchName: 'Dusan Vlahovic', filename: 'vlahovic.jpg' },
  { id: 14, name: 'Harry Kane', searchName: 'Harry Kane', filename: 'kane.jpg' },
  { id: 15, name: 'Jamal Musiala', searchName: 'Jamal Musiala', filename: 'musiala.jpg' },
  { id: 16, name: 'Serhou Guirassy', searchName: 'Serhou Guirassy', filename: 'guirassy.jpg' },
  { id: 17, name: 'Bradley Barcola', searchName: 'Bradley Barcola', filename: 'barcola.jpg' },
  { id: 18, name: 'Gonçalo Ramos', searchName: 'Goncalo Ramos', filename: 'ramos.jpg' },
  { id: 19, name: 'Cristiano Ronaldo', searchName: 'Cristiano Ronaldo', filename: 'ronaldo.jpg' },
  { id: 20, name: 'Neymar Jr', searchName: 'Neymar', filename: 'neymar.jpg' },
  { id: 21, name: 'Karim Benzema', searchName: 'Karim Benzema', filename: 'benzema.jpg' },
  { id: 22, name: 'Lionel Messi', searchName: 'Lionel Messi', filename: 'messi.jpg' },
  { id: 23, name: 'Luis Suárez', searchName: 'Luis Suarez', filename: 'suarez.jpg' },
  { id: 24, name: 'Marco Reus', searchName: 'Marco Reus', filename: 'reus.jpg' },
  { id: 25, name: 'Brian Brobbey', searchName: 'Brian Brobbey', filename: 'brobbey.jpg' },
  { id: 26, name: 'Viktor Gyökeres', searchName: 'Viktor Gyokeres', filename: 'gyokeres.jpg' },
  { id: 27, name: 'Pedro', searchName: 'Pedro Flamengo', filename: 'pedro.jpg' },
  { id: 28, name: 'Estêvão', searchName: 'Estevao Willian', filename: 'estevao.jpg' }
];

const outputDir = path.join(__dirname, '../frontend/public/players');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to download image from URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(filepath);
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// Function to search for player and get image from TheSportsDB
async function getPlayerImage(playerName) {
  return new Promise((resolve, reject) => {
    const searchUrl = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(playerName)}`;
    
    https.get(searchUrl, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.player && result.player.length > 0) {
            const player = result.player[0];
            // Use thumb image or cutout image
            const imageUrl = player.strThumb || player.strCutout || player.strThumb;
            resolve(imageUrl);
          } else {
            resolve(null);
          }
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

// Main function to download all player images
async function downloadAllImages() {
  console.log('🎯 Starting player image download...\n');
  
  let successCount = 0;
  let failCount = 0;
  
  for (const player of players) {
    try {
      console.log(`📥 Fetching ${player.name}...`);
      
      const imageUrl = await getPlayerImage(player.searchName);
      
      if (imageUrl) {
        const filepath = path.join(outputDir, player.filename);
        await downloadImage(imageUrl, filepath);
        console.log(`   ✅ Downloaded: ${player.filename}`);
        successCount++;
        
        // Add small delay to be respectful to the API
        await new Promise(resolve => setTimeout(resolve, 500));
      } else {
        console.log(`   ⚠️  No image found for ${player.name}`);
        failCount++;
      }
    } catch (error) {
      console.log(`   ❌ Error downloading ${player.name}: ${error.message}`);
      failCount++;
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Successfully downloaded: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`\n✨ Images saved to: ${outputDir}`);
  console.log('\n📝 Next steps:');
  console.log('   1. Run: node scripts/update-image-paths.js');
  console.log('   2. This will update backend and API to use local images');
}

// Run the script
downloadAllImages().catch(console.error);
