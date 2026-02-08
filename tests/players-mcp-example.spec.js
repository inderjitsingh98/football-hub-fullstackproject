import { test, expect } from '@playwright/test';
import { navigateToApp, switchTab, ensureDataLoaded } from './helpers/testHelpers.js';

test.describe('Players Section - MCP Generated Test', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app and ensure data is loaded
    await navigateToApp(page);
    await ensureDataLoaded(page);
  });

  test('should navigate to Players tab and display at least 5 player cards', async ({ page }) => {
    // Step 1: Click the Players tab
    await page.getByTestId('players-tab').click();
    
    // Wait for players container to be visible
    await expect(page.getByTestId('players-container')).toBeVisible();
    
    // Step 2: Verify at least 5 player cards are displayed
    const playerCards = page.locator('[data-testid^="player-"]');
    const count = await playerCards.count();
    
    expect(count).toBeGreaterThanOrEqual(5);
    console.log(`✅ Found ${count} player cards`);
  });

  test('should display player statistics (goals, assists, appearances)', async ({ page }) => {
    // Navigate to Players tab
    await page.getByTestId('players-tab').click();
    await expect(page.getByTestId('players-container')).toBeVisible();
    
    // Get all player cards
    const playerCards = page.locator('[data-testid^="player-"]');
    const count = await playerCards.count();
    
    // Step 3: Check each player has the required stats
    for (let i = 0; i < Math.min(count, 10); i++) { // Check first 10 players
      const card = playerCards.nth(i);
      
      // Verify the card is visible
      await expect(card).toBeVisible();
      
      // Check for goals stat (⚽ icon with number)
      const cardText = await card.textContent();
      
      // Verify stats section exists and contains numeric values
      expect(cardText).toMatch(/Goals/i);
      expect(cardText).toMatch(/Assists/i);
      expect(cardText).toMatch(/Apps/i);
      
      // Verify there are numeric values (assuming stats are always present)
      expect(cardText).toMatch(/\d+/); // At least one number
      
      console.log(`✅ Player card ${i + 1} has all required stats`);
    }
  });

  test('should display complete player information', async ({ page }) => {
    // Navigate to Players tab
    await page.getByTestId('players-tab').click();
    await expect(page.getByTestId('players-container')).toBeVisible();
    
    // Test first player card (Erling Haaland - player-1)
    const haalandCard = page.getByTestId('player-1');
    await expect(haalandCard).toBeVisible();
    
    // Verify player name
    await expect(haalandCard).toContainText('Erling Haaland');
    
    // Verify position
    await expect(haalandCard).toContainText('Forward');
    
    // Verify team
    await expect(haalandCard).toContainText('Manchester City');
    
    // Verify nationality
    await expect(haalandCard).toContainText('Norway');
    
    // Verify age
    await expect(haalandCard).toContainText('25');
    
    // Verify stats are present
    const cardText = await haalandCard.textContent();
    expect(cardText).toContain('Goals');
    expect(cardText).toContain('Assists');
    expect(cardText).toContain('Apps');
    
    console.log('✅ Player card displays complete information');
  });

  test('should display player photos and avatars', async ({ page }) => {
    // Navigate to Players tab
    await page.getByTestId('players-tab').click();
    await expect(page.getByTestId('players-container')).toBeVisible();
    
    // Check that player avatars are visible
    const firstCard = page.getByTestId('player-1');
    
    // Player avatar should be visible (either with image or initials)
    const avatar = firstCard.locator('.player-avatar');
    await expect(avatar).toBeVisible();
    
    // Optional: Check if player photo background exists
    const photoCount = await firstCard.locator('.player-photo').count();
    if (photoCount > 0) {
      console.log('✅ Player photo background is present');
    }
    
    console.log('✅ Player avatar is displayed');
  });

  test('should verify all 28 players are loaded from API', async ({ page }) => {
    // Navigate to Players tab
    await page.getByTestId('players-tab').click();
    await expect(page.getByTestId('players-container')).toBeVisible();
    
    // Wait for all player cards to load
    await page.waitForTimeout(1000); // Give time for all cards to render
    
    // Count all player cards
    const playerCards = page.locator('[data-testid^="player-"]');
    const totalPlayers = await playerCards.count();
    
    // We expect 28 players based on the current data
    expect(totalPlayers).toBe(28);
    
    console.log(`✅ All 28 players loaded successfully`);
  });

  test('should display stats with correct format', async ({ page }) => {
    // Navigate to Players tab
    await page.getByTestId('players-tab').click();
    await expect(page.getByTestId('players-container')).toBeVisible();
    
    // Get first player card
    const firstCard = page.getByTestId('player-1');
    
    // Find stats section
    const statsSection = firstCard.locator('.player-stats');
    await expect(statsSection).toBeVisible();
    
    // Verify each stat has label and value
    const stats = statsSection.locator('.stat');
    const statsCount = await stats.count();
    
    expect(statsCount).toBe(3); // Goals, Assists, Apps
    
    // Check each stat has icon, label, and value
    for (let i = 0; i < statsCount; i++) {
      const stat = stats.nth(i);
      
      // Each stat should have icon, label, and value divs
      await expect(stat.locator('.stat-icon')).toBeVisible();
      await expect(stat.locator('.stat-label')).toBeVisible();
      await expect(stat.locator('.stat-value')).toBeVisible();
    }
    
    console.log('✅ Stats are properly formatted');
  });
});
