# Player Images Guide

## Current Setup
Player images are currently using placeholder images from Unsplash with sports/athlete themes. These provide realistic-looking photos but are not actual player photos.

## How to Add Real Player Photos

### Option 1: Manual Download (Recommended)
1. Download player photos from official sources:
   - Team official websites
   - FIFA/UEFA official sites
   - Getty Images (with proper licensing)
   - Wikimedia Commons (Creative Commons licensed)

2. Save images to `/frontend/public/players/` folder with this naming:
   - `haaland.jpg`
   - `messi.jpg`
   - `ronaldo.jpg`
   - etc.

3. Update the backend/api player data to use: `image: "/players/haaland.jpg"`

### Option 2: Use External URLs
Update player data in both:
- `/backend/server.js` (for local development)
- `/api/index.js` (for Vercel deployment)

Replace image URLs with direct links to player photos:
```javascript
{
  id: 1,
  name: "Erling Haaland",
  image: "https://example.com/path-to-real-image.jpg"
}
```

### Option 3: Use Sports API
Integrate a sports data API that includes player photos:
- **API-Football** (football-data.org)
- **TheSportsDB** (free tier available)
- **SportRadar** (commercial)

### Image Specifications
- **Format**: JPG or PNG
- **Size**: 200x200px to 400x400px (square works best)
- **File size**: Keep under 100KB for performance
- **Naming**: Use lowercase, no spaces (e.g., `erling-haaland.jpg`)

### Copyright Notice
⚠️ **Important**: Ensure you have proper rights/licenses for any player images you use. Player photos are typically copyrighted by:
- The photographer
- The player's club
- Professional sports leagues

For personal/educational projects, consider:
- Creative Commons licensed images
- Official team press photos (with attribution)
- Fair use guidelines for educational purposes

## Current Placeholder Images
The app currently uses Unsplash's random image API with sports filters. These are real photos but not of the actual players listed.

To test with real images, follow Option 1 above!
