/**
 * Test Helpers for Football Hub
 * Reusable functions and utilities for Playwright tests
 */

/**
 * Navigate to the app and wait for it to load
 * @param {import('@playwright/test').Page} page
 */
export async function navigateToApp(page) {
  await page.goto('/');
  // Wait for the main content to load
  await page.waitForSelector('[data-testid="teams-tab"]', { state: 'visible' });
}

/**
 * Switch to a specific tab in the navigation
 * @param {import('@playwright/test').Page} page
 * @param {string} tabName - 'teams' | 'players' | 'matches' | 'standings'
 */
export async function switchTab(page, tabName) {
  await page.getByTestId(`${tabName}-tab`).click();
  await page.waitForTimeout(300); // Wait for animation
  await page.getByTestId(`${tabName}-container`).waitFor({ state: 'visible' });
}

/**
 * Verify a tab is active
 * @param {import('@playwright/test').Page} page
 * @param {string} tabName
 */
export async function verifyActiveTab(page, tabName) {
  const tab = page.getByTestId(`${tabName}-tab`);
  await tab.waitFor({ state: 'visible' });
  const isActive = await tab.evaluate(el => el.classList.contains('active'));
  return isActive;
}

/**
 * Get all team cards
 * @param {import('@playwright/test').Page} page
 */
export async function getTeamCards(page) {
  return await page.locator('[data-testid^="team-"]').all();
}

/**
 * Get all player cards
 * @param {import('@playwright/test').Page} page
 */
export async function getPlayerCards(page) {
  return await page.locator('[data-testid^="player-"]').all();
}

/**
 * Get all match cards
 * @param {import('@playwright/test').Page} page
 */
export async function getMatchCards(page) {
  return await page.locator('[data-testid^="match-"]').all();
}

/**
 * Extract team data from a card
 * @param {import('@playwright/test').Locator} card
 */
export async function extractTeamData(card) {
  const name = await card.locator('h3').textContent();
  const text = await card.textContent();
  return {
    name: name?.trim(),
    fullText: text
  };
}

/**
 * Extract player stats from a card
 * @param {import('@playwright/test').Locator} card
 */
export async function extractPlayerStats(card) {
  const name = await card.locator('h3').textContent();
  const stats = await card.locator('.stat-value').allTextContents();
  
  return {
    name: name?.trim(),
    goals: stats[0] || '0',
    assists: stats[1] || '0',
    appearances: stats[2] || '0'
  };
}

/**
 * Check if sidebar is visible
 * @param {import('@playwright/test').Page} page
 */
export async function isSidebarVisible(page) {
  const sidebar = page.locator('.sidebar');
  return await sidebar.isVisible();
}

/**
 * Verify API is responding
 * @param {import('@playwright/test').Page} page
 */
export async function verifyAPIHealth(page) {
  const response = await page.request.get('http://localhost:3001/api/health');
  return response.ok();
}

/**
 * Verify all data is loaded (no loading state)
 * @param {import('@playwright/test').Page} page
 */
export async function ensureDataLoaded(page) {
  // Wait for loading to disappear
  const loading = page.locator('.loading');
  await loading.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
  
  // Verify content is present
  await page.getByTestId('teams-container').waitFor({ state: 'visible' });
}

/**
 * Take a screenshot with a descriptive name
 * @param {import('@playwright/test').Page} page
 * @param {string} name
 */
export async function takeScreenshot(page, name) {
  await page.screenshot({ 
    path: `test-results/screenshots/${name}.png`,
    fullPage: true 
  });
}

/**
 * Simulate slow network to test loading states
 * @param {import('@playwright/test').Page} page
 */
export async function simulateSlowNetwork(page) {
  await page.route('http://localhost:3001/api/**', route => {
    setTimeout(() => route.continue(), 2000);
  });
}

/**
 * Get standings table data
 * @param {import('@playwright/test').Page} page
 */
export async function getStandingsData(page) {
  const rows = await page.locator('.standings-table tbody tr').all();
  const data = [];
  
  for (const row of rows) {
    const cells = await row.locator('td').allTextContents();
    data.push({
      position: cells[0],
      team: cells[1],
      played: cells[2],
      won: cells[3],
      drawn: cells[4],
      lost: cells[5],
      points: cells[6]
    });
  }
  
  return data;
}

/**
 * Verify responsive layout (resize viewport)
 * @param {import('@playwright/test').Page} page
 * @param {number} width
 * @param {number} height
 */
export async function setViewport(page, width, height) {
  await page.setViewportSize({ width, height });
  await page.waitForTimeout(300); // Wait for layout shift
}
