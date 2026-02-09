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
    
    // Should have 20 matches
    expect(matchCards.length).toBe(20);
  });

  test('should display match information', async ({ page }) => {
    const matchCard = page.getByTestId('match-2');
    
    // Should show team names
    await expect(matchCard).toContainText('Manchester United');
    await expect(matchCard).toContainText('Liverpool');
    
    // Should show date and stadium
    await expect(matchCard).toContainText('2026-02-05');
    await expect(matchCard).toContainText('Anfield');
  });

  test('should display match scores', async ({ page }) => {
    const matchCard = page.getByTestId('match-2');
    const scores = matchCard.locator('.team-score');
    
    await expect(scores.first()).toBeVisible();
    
    // Should have both team scores visible
    await expect(scores).toHaveCount(2);
    const scoreTexts = await scores.allTextContents();
    expect(scoreTexts[0]).toMatch(/\d+/);
    expect(scoreTexts[1]).toMatch(/\d+/);
  });
});