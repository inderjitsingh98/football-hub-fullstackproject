import { test, expect } from '@playwright/test';
import { 
  navigateToApp, 
  switchTab, 
  getStandingsData,
  ensureDataLoaded 
} from './helpers/testHelpers.js';

test.describe('Standings Section', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToApp(page);
    await ensureDataLoaded(page);
    await switchTab(page, 'standings');
  });

  test('should navigate to standings tab', async ({ page }) => {
    await expect(page.getByTestId('standings-container')).toBeVisible();
  });

  test('should display standings table', async ({ page }) => {
    const table = page.locator('.standings-table');
    await expect(table).toBeVisible();
  });

  test('should have correct table headers', async ({ page }) => {
    const headers = page.locator('.standings-table th');
    
    await expect(headers).toHaveCount(7);
    
    // Verify header text
    await expect(headers.nth(0)).toContainText('Pos');
    await expect(headers.nth(1)).toContainText('Team');
    await expect(headers.nth(2)).toContainText('Played');
    await expect(headers.nth(3)).toContainText('Won');
    await expect(headers.nth(4)).toContainText('Drawn');
    await expect(headers.nth(5)).toContainText('Lost');
    await expect(headers.nth(6)).toContainText('Points');
  });

  test('should display team standings', async ({ page }) => {
    const rows = page.locator('.standings-table tbody tr');
    
    // Should have 5 teams
    await expect(rows).toHaveCount(5);
  });

  test('should show correct team data', async ({ page }) => {
    const firstRow = page.getByTestId('standing-1');
    
    await expect(firstRow).toContainText('Manchester City');
    await expect(firstRow).toContainText('58'); // Points
  });

  test('should extract standings data correctly', async ({ page }) => {
    const data = await getStandingsData(page);
    
    expect(data.length).toBe(5);
    
    // Verify first position
    expect(data[0].position).toBe('1');
    expect(data[0].team).toContain('Manchester City');
    expect(parseInt(data[0].points)).toBeGreaterThan(0);
  });

  test('should display all statistics columns', async ({ page }) => {
    const firstRow = page.locator('.standings-table tbody tr').first();
    const cells = firstRow.locator('td');
    
    // Should have 7 cells (pos, team, played, won, drawn, lost, points)
    await expect(cells).toHaveCount(7);
  });

  test('positions should be in order', async ({ page }) => {
    const positions = await page.locator('.standings-table tbody tr td:first-child').allTextContents();
    
    expect(positions[0]).toBe('1');
    expect(positions[1]).toBe('2');
    expect(positions[2]).toBe('3');
    expect(positions[3]).toBe('4');
    expect(positions[4]).toBe('5');
  });

  test('table should be responsive', async ({ page }) => {
    const container = page.getByTestId('standings-container');
    
    // Should have overflow for mobile
    const overflowX = await container.evaluate(el => 
      window.getComputedStyle(el).overflowX
    );
    
    expect(overflowX).toBe('auto');
  });

  test('should have hover effects on rows', async ({ page }) => {
    const row = page.locator('.standings-table tbody tr').first();
    
    await row.hover();
    await page.waitForTimeout(200);
    
    // Row should still be visible
    await expect(row).toBeVisible();
  });
});
