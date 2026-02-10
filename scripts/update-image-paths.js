import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Image mapping
const imageMapping = {
  1: '/players/haaland.jpg',
  2: '/players/salah.jpg',
  3: '/players/saka.jpg',
  4: '/players/debruyne.jpg',
  5: '/players/palmer.jpg',
  6: '/players/mbappe.jpg',
  7: '/players/vinicius.jpg',
  8: '/players/lewandowski.jpg',
  9: '/players/bellingham.jpg',
  10: '/players/griezmann.jpg',
  11: '/players/lautaro.jpg',
  12: '/players/leao.jpg',
  13: '/players/vlahovic.jpg',
  14: '/players/kane.jpg',
  15: '/players/musiala.jpg',
  16: '/players/guirassy.jpg',
  17: '/players/barcola.jpg',
  18: '/players/ramos.jpg',
  19: '/players/ronaldo.jpg',
  20: '/players/neymar.jpg',
  21: '/players/benzema.jpg',
  22: '/players/messi.jpg',
  23: '/players/suarez.jpg',
  24: '/players/reus.jpg',
  25: '/players/brobbey.jpg',
  26: '/players/gyokeres.jpg',
  27: '/players/pedro.jpg',
  28: '/players/estevao.jpg'
};

// Update backend/server.js
function updateBackendFile() {
  const backendFile = path.join(__dirname, '../backend/server.js');
  let content = fs.readFileSync(backendFile, 'utf8');
  
  // Replace image URLs with local paths
  Object.entries(imageMapping).forEach(([id, imagePath]) => {
    // Match pattern: image: 'https://images.unsplash.com/...'
    const regex = new RegExp(
      `(id: ${id},.*?image:\\s*)'https://images\\.unsplash\\.com/[^']*'`,
      'gs'
    );
    content = content.replace(regex, `$1'${imagePath}'`);
  });
  
  fs.writeFileSync(backendFile, content, 'utf8');
  console.log('✅ Updated backend/server.js');
}

// Update api/index.js
function updateApiFile() {
  const apiFile = path.join(__dirname, '../api/index.js');
  let content = fs.readFileSync(apiFile, 'utf8');
  
  // Replace image URLs with local paths
  Object.entries(imageMapping).forEach(([id, imagePath]) => {
    const regex = new RegExp(
      `(id: ${id},.*?image:\\s*)"https://images\\.unsplash\\.com/[^"]*"`,
      'gs'
    );
    content = content.replace(regex, `$1"${imagePath}"`);
  });
  
  fs.writeFileSync(apiFile, content, 'utf8');
  console.log('✅ Updated api/index.js');
}

console.log('📝 Updating image paths to use local files...\n');

try {
  updateBackendFile();
  updateApiFile();
  console.log('\n✨ Done! Image paths updated successfully.');
  console.log('\n📝 Next step: Restart your backend server to see the changes.');
} catch (error) {
  console.error('❌ Error:', error.message);
}
