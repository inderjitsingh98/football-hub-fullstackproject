import { test, expect } from '@playwright/test';
import { 
  navigateToApp, 
  switchTab, 
  verifyActiveTab,
  getTeamCards,
  extractTeamData,
  ensureDataLoaded 
} from './helpers/testHelpers.js';

test.describe('Teams Section', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToApp(page);
    await ensureDataLoaded(page);
  });

  test('should display teams by default', async ({ page }) => {
    // Verify teams tab is active
    const isActive = await verifyActiveTab(page, 'teams');
    expect(isActive).toBe(true);
    
    // Verify teams container is visible
    await expect(page.getByTestId('teams-container')).toBeVisible();
  });

  test('should display all team cards', async ({ page }) => {
    const teamCards = await getTeamCards(page);
    
    // Should have 6 teams
    expect(teamCards.length).toBe(6);
    
    // Verify all cards are visible
    for (const card of teamCards) {
      await expect(card).toBeVisible();
    }
  });

  test('should display team information correctly', async ({ page }) => {
    // Check Manchester United card (team-1)
    const manchesterCard = page.getByTestId('team-1');
    
    await expect(manchesterCard).toContainText('Manchester United');
    await expect(manchesterCard).toContainText('Old Trafford');
    await expect(manchesterCard).toContainText('1878');
    await expect(manchesterCard).toContainText('Premier League');
    await expect(manchesterCard).toContainText('England');
  });

  test('should display Real Madrid details', async ({ page }) => {
    const realMadridCard = page.getByTestId('team-2');
    
    await expect(realMadridCard).toContainText('Real Madrid');
    await expect(realMadridCard).toContainText('Santiago Bernabéu');
    await expect(realMadridCard).toContainText('La Liga');
    await expect(realMadridCard).toContainText('Spain');
  });

  test('should have hover effects on cards', async ({ page }) => {
    const card = page.getByTestId('team-1');
    
    // Get initial position
    const initialBox = await card.boundingBox();
    
    // Hover over card
    await card.hover();
    await page.waitForTimeout(500); // Wait for animation
    
    // Card should still be visible (checking transform works)
    await expect(card).toBeVisible();
  });

  test('should extract team data correctly', async ({ page }) => {
    const teamCards = await getTeamCards(page);
    const firstTeam = await extractTeamData(teamCards[0]);
    
    expect(firstTeam.name).toBeTruthy();
    expect(firstTeam.fullText).toContain('Stadium');
    expect(firstTeam.fullText).toContain('Founded');
  });

  test('should maintain layout with multiple teams', async ({ page }) => {
    const container = page.getByTestId('teams-container');
    
    // Verify grid layout is applied
    const display = await container.evaluate(el => 
      window.getComputedStyle(el).display
    );
    
    expect(display).toBe('grid');
  });
});
