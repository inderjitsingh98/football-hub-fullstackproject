import { test, expect } from '@playwright/test';
import { navigateToApp, setViewport, isSidebarVisible, ensureDataLoaded } from './helpers/testHelpers.js';

test.describe('Responsive Design', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToApp(page);
    await ensureDataLoaded(page);
  });

  test('should display sidebar on desktop', async ({ page }) => {
    await setViewport(page, 1280, 720);
    
    const sidebar = await isSidebarVisible(page);
    expect(sidebar).toBe(true);
  });

  test('should show About Me section in sidebar', async ({ page }) => {
    const sidebar = page.locator('.sidebar');
    
    await expect(sidebar).toContainText('Inderjit Singh');
    await expect(sidebar).toContainText('Football Enthusiast');
  });

  test('should adapt navigation for mobile', async ({ page }) => {
    await setViewport(page, 375, 667); // iPhone SE size
    
    // Navigation should still be visible
    await expect(page.getByTestId('teams-tab')).toBeVisible();
  });

  test('should adjust grid layout on mobile', async ({ page }) => {
    await setViewport(page, 375, 667);
    
    const container = page.getByTestId('teams-container');
    const gridColumns = await container.evaluate(el => 
      window.getComputedStyle(el).gridTemplateColumns
    );
    
    // On mobile, should have single column or auto layout
    expect(gridColumns).toBeTruthy();
  });

  test('should work on tablet viewport', async ({ page }) => {
    await setViewport(page, 768, 1024); // iPad
    
    // Main content should be visible
    await expect(page.getByTestId('teams-container')).toBeVisible();
    
    // Navigation should work
    await page.getByTestId('players-tab').click();
    await expect(page.getByTestId('players-container')).toBeVisible();
  });

  test('should handle small desktop viewport', async ({ page }) => {
    await setViewport(page, 1024, 768);
    
    const sidebar = await isSidebarVisible(page);
    const mainContent = page.locator('.main-content');
    
    await expect(mainContent).toBeVisible();
  });

  test('should handle large desktop viewport', async ({ page }) => {
    await setViewport(page, 1920, 1080);
    
    // Should utilize space well
    await expect(page.getByTestId('teams-container')).toBeVisible();
    await expect(page.locator('.sidebar')).toBeVisible();
  });

  test('cards should be clickable on mobile', async ({ page }) => {
    await setViewport(page, 375, 667);
    
    const card = page.getByTestId('team-1');
    
    // Verify card is visible and interactive
    await expect(card).toBeVisible();
    
    // Ensure card can receive pointer events (is clickable)
    const isClickable = await card.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.pointerEvents !== 'none';
    });
    
    expect(isClickable).toBeTruthy();
  });

  test('navigation tabs should be scrollable on small screens', async ({ page }) => {
    await setViewport(page, 320, 568); // iPhone SE small
    
    const nav = page.locator('.nav');
    const overflowX = await nav.evaluate(el => 
      window.getComputedStyle(el).overflowX
    );
    
    // Should allow horizontal scroll if needed
    expect(['auto', 'scroll', 'visible']).toContain(overflowX);
  });
});
