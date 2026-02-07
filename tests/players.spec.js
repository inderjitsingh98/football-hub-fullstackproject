import { test, expect } from '@playwright/test';
import { 
  navigateToApp, 
  switchTab, 
  getPlayerCards,
  extractPlayerStats,
  ensureDataLoaded 
} from './helpers/testHelpers.js';

test.describe('Players Section', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToApp(page);
    await ensureDataLoaded(page);
    await switchTab(page, 'players');
  });

  test('should navigate to players tab', async ({ page }) => {
    // Verify players container is visible
    await expect(page.getByTestId('players-container')).toBeVisible();
    
    // Verify teams container is hidden
    await expect(page.getByTestId('teams-container')).not.toBeVisible();
  });

  test('should display all player cards', async ({ page }) => {
    const playerCards = await getPlayerCards(page);
    
    // Should have 6 players
    expect(playerCards.length).toBe(6);
  });

  test('should display player information', async ({ page }) => {
    const ronaldoCard = page.getByTestId('player-1');
    
    await expect(ronaldoCard).toContainText('Cristiano Ronaldo');
    await expect(ronaldoCard).toContainText('Al Nassr');
    await expect(ronaldoCard).toContainText('Forward');
    await expect(ronaldoCard).toContainText('Portugal');
  });

  test('should display player statistics', async ({ page }) => {
    const playerCard = page.getByTestId('player-1');
    
    // Verify stats section exists
    const statsSection = playerCard.locator('.player-stats');
    await expect(statsSection).toBeVisible();
    
    // Verify all three stats are present
    const statLabels = statsSection.locator('.stat-label');
    await expect(statLabels).toHaveCount(3);
    
    // Verify stat values are numbers
    const statValues = await statsSection.locator('.stat-value').allTextContents();
    statValues.forEach(value => {
      expect(parseInt(value)).toBeGreaterThanOrEqual(0);
    });
  });

  test('should extract player stats correctly', async ({ page }) => {
    const playerCards = await getPlayerCards(page);
    const firstPlayer = await extractPlayerStats(playerCards[0]);
    
    expect(firstPlayer.name).toBeTruthy();
    expect(parseInt(firstPlayer.goals)).toBeGreaterThanOrEqual(0);
    expect(parseInt(firstPlayer.assists)).toBeGreaterThanOrEqual(0);
    expect(parseInt(firstPlayer.appearances)).toBeGreaterThanOrEqual(0);
  });

  test('should show goals, assists, and appearances labels', async ({ page }) => {
    const statsSection = page.locator('.player-stats').first();
    
    await expect(statsSection.getByText('Goals', { exact: false })).toBeVisible();
    await expect(statsSection.getByText('Assists', { exact: false })).toBeVisible();
    await expect(statsSection.getByText('Apps', { exact: false })).toBeVisible();
  });

  test('should display multiple star players', async ({ page }) => {
    // Check for famous players
    await expect(page.getByText('Lionel Messi')).toBeVisible();
    await expect(page.getByText('Kylian Mbappé')).toBeVisible();
    await expect(page.getByText('Erling Haaland')).toBeVisible();
  });

  test('stats should have hover effects', async ({ page }) => {
    const stat = page.locator('.stat').first();
    
    await stat.hover();
    await page.waitForTimeout(300); // Wait for animation
    
    // Verify stat is still visible after hover
    await expect(stat).toBeVisible();
  });
});
