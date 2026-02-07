import { test, expect } from '@playwright/test';
import { navigateToApp, switchTab, verifyActiveTab, ensureDataLoaded } from './helpers/testHelpers.js';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToApp(page);
    await ensureDataLoaded(page);
  });

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveURL('/');
    await expect(page).toHaveTitle(/Football Hub/i);
  });

  test('should display all navigation tabs', async ({ page }) => {
    await expect(page.getByTestId('teams-tab')).toBeVisible();
    await expect(page.getByTestId('players-tab')).toBeVisible();
    await expect(page.getByTestId('matches-tab')).toBeVisible();
    await expect(page.getByTestId('standings-tab')).toBeVisible();
  });

  test('should start with teams tab active', async ({ page }) => {
    const isActive = await verifyActiveTab(page, 'teams');
    expect(isActive).toBe(true);
  });

  test('should switch between tabs', async ({ page }) => {
    // Switch to players
    await switchTab(page, 'players');
    expect(await verifyActiveTab(page, 'players')).toBe(true);
    
    // Switch to matches
    await switchTab(page, 'matches');
    expect(await verifyActiveTab(page, 'matches')).toBe(true);
    
    // Switch to standings
    await switchTab(page, 'standings');
    expect(await verifyActiveTab(page, 'standings')).toBe(true);
    
    // Switch back to teams
    await switchTab(page, 'teams');
    expect(await verifyActiveTab(page, 'teams')).toBe(true);
  });

  test('should show correct content when switching tabs', async ({ page }) => {
    // Start with teams
    await expect(page.getByTestId('teams-container')).toBeVisible();
    
    // Switch to players
    await page.getByTestId('players-tab').click();
    await expect(page.getByTestId('players-container')).toBeVisible();
    await expect(page.getByTestId('teams-container')).not.toBeVisible();
    
    // Switch to matches
    await page.getByTestId('matches-tab').click();
    await expect(page.getByTestId('matches-container')).toBeVisible();
    await expect(page.getByTestId('players-container')).not.toBeVisible();
    
    // Switch to standings
    await page.getByTestId('standings-tab').click();
    await expect(page.getByTestId('standings-container')).toBeVisible();
    await expect(page.getByTestId('matches-container')).not.toBeVisible();
  });

  test('should display header with title', async ({ page }) => {
    const header = page.locator('.header');
    await expect(header).toBeVisible();
    await expect(header.locator('h1')).toContainText('Football Hub');
  });

  test('should display subtitle', async ({ page }) => {
    await expect(page.getByText('Your complete source for football')).toBeVisible();
  });

  test('navigation tabs should be keyboard accessible', async ({ page }) => {
    const teamsTab = page.getByTestId('teams-tab');
    const playersTab = page.getByTestId('players-tab');
    
    // Focus on teams tab
    await teamsTab.focus();
    await expect(teamsTab).toBeFocused();
    
    // Tab to next element
    await page.keyboard.press('Tab');
    await expect(playersTab).toBeFocused();
    
    // Activate with Enter key
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('players-container')).toBeVisible();
  });

  test('should maintain state when navigating quickly', async ({ page }) => {
    // Rapid tab switching
    await page.getByTestId('players-tab').click();
    await page.getByTestId('matches-tab').click();
    await page.getByTestId('standings-tab').click();
    await page.getByTestId('teams-tab').click();
    
    // Should end up on teams
    await page.waitForTimeout(500);
    expect(await verifyActiveTab(page, 'teams')).toBe(true);
    await expect(page.getByTestId('teams-container')).toBeVisible();
  });
});
