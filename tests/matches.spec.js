import { test, expect } from '@playwright/test';
import { 
  navigateToApp, 
  switchTab, 
  getMatchCards,
  ensureDataLoaded 
} from './helpers/testHelpers.js';

test.describe('Matches Section', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToApp(page);
    await ensureDataLoaded(page);
    await switchTab(page, 'matches');
  });

  test('should navigate to matches tab', async ({ page }) => {
    await expect(page.getByTestId('matches-container')).toBeVisible();
  });

  test('should display all match cards', async ({ page }) => {
    const matchCards = await getMatchCards(page);
    
    // Should have 5 matches
    expect(matchCards.length).toBe(5);
  });

  test('should display match information', async ({ page }) => {
    const matchCard = page.getByTestId('match-1');
    
    // Should show team names
    await expect(matchCard).toContainText('Manchester United');
    await expect(matchCard).toContainText('Liverpool');
    
    // Should show date and stadium
    await expect(matchCard).toContainText('2026-02-08');
    await expect(matchCard).toContainText('Old Trafford');
  });

  test('should display match scores', async ({ page }) => {
    const matchCard = page.getByTestId('match-2');
    const score = matchCard.locator('.score');
    
    await expect(score).toBeVisible();
    
    // Should contain score format (e.g., "3 - 1")
    const scoreText = await score.textContent();
    expect(scoreText).toMatch(/\d+\s*-\s*\d+/);
  });

  test('should show match status', async ({ page }) => {
    const matchCard = page.getByTestId('match-2');
    
    // Should have status indicator
    await expect(matchCard).toContainText('completed');
  });

  test('should display upcoming matches', async ({ page }) => {
    const upcomingMatch = page.getByTestId('match-1');
    
    await expect(upcomingMatch).toContainText('upcoming');
  });

  test('should show date and time for matches', async ({ page }) => {
    const matchCard = page.getByTestId('match-1');
    
    // Check for date format
    const text = await matchCard.textContent();
    expect(text).toMatch(/\d{4}-\d{2}-\d{2}/); // yyyy-mm-dd format
    expect(text).toMatch(/\d{2}:\d{2}/); // hh:mm format
  });

  test('should display venue information', async ({ page }) => {
    const matchCard = page.getByTestId('match-3');
    
    await expect(matchCard).toContainText('Stadium');
    await expect(matchCard).toContainText('Allianz Arena');
  });

  test('match cards should have proper layout', async ({ page }) => {
    const matchCard = page.getByTestId('match-1');
    
    // Verify team sections exist
    const teams = matchCard.locator('.team');
    await expect(teams).toHaveCount(2);
    
    // Verify score is in center
    const score = matchCard.locator('.score');
    await expect(score).toBeVisible();
  });
});
