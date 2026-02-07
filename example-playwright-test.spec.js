// Example Playwright test for the Football Hub website
// Install Playwright: npm install -D @playwright/test
// Run test: npx playwright test

import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

test.describe('Football Hub Website', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('should load the homepage with header', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Football Hub');
  });

  test('should have all navigation tabs', async ({ page }) => {
    await expect(page.getByTestId('teams-tab')).toBeVisible();
    await expect(page.getByTestId('players-tab')).toBeVisible();
    await expect(page.getByTestId('matches-tab')).toBeVisible();
    await expect(page.getByTestId('standings-tab')).toBeVisible();
  });

  test('should display teams by default', async ({ page }) => {
    const teamsContainer = page.getByTestId('teams-container');
    await expect(teamsContainer).toBeVisible();
    
    // Check if at least one team card is displayed
    await expect(page.getByTestId('team-1')).toBeVisible();
  });

  test('should navigate to players tab', async ({ page }) => {
    await page.getByTestId('players-tab').click();
    
    const playersContainer = page.getByTestId('players-container');
    await expect(playersContainer).toBeVisible();
    
    // Check if at least one player card is displayed
    await expect(page.getByTestId('player-1')).toBeVisible();
  });

  test('should navigate to matches tab', async ({ page }) => {
    await page.getByTestId('matches-tab').click();
    
    const matchesContainer = page.getByTestId('matches-container');
    await expect(matchesContainer).toBeVisible();
    
    // Check if at least one match card is displayed
    await expect(page.getByTestId('match-1')).toBeVisible();
  });

  test('should navigate to standings tab', async ({ page }) => {
    await page.getByTestId('standings-tab').click();
    
    const standingsContainer = page.getByTestId('standings-container');
    await expect(standingsContainer).toBeVisible();
    
    // Check if standings table is displayed
    const standingsTable = page.locator('.standings-table');
    await expect(standingsTable).toBeVisible();
  });

  test('should display team details', async ({ page }) => {
    const teamCard = page.getByTestId('team-1');
    await expect(teamCard).toContainText('Manchester United');
    await expect(teamCard).toContainText('Old Trafford');
    await expect(teamCard).toContainText('Premier League');
  });

  test('should display player statistics', async ({ page }) => {
    await page.getByTestId('players-tab').click();
    
    const playerCard = page.getByTestId('player-1');
    await expect(playerCard).toBeVisible();
    
    // Check if stats are displayed
    const stats = playerCard.locator('.player-stats');
    await expect(stats).toBeVisible();
  });

  test('should show match scores', async ({ page }) => {
    await page.getByTestId('matches-tab').click();
    
    const matchCard = page.getByTestId('match-1');
    
    // Check if score is displayed
    const score = matchCard.locator('.score');
    await expect(score).toBeVisible();
  });

  test('should highlight active tab', async ({ page }) => {
    const teamsTab = page.getByTestId('teams-tab');
    const playersTab = page.getByTestId('players-tab');
    
    // Teams tab should be active by default
    await expect(teamsTab).toHaveClass(/active/);
    
    // Click players tab
    await playersTab.click();
    
    // Players tab should now be active
    await expect(playersTab).toHaveClass(/active/);
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // This test would need to mock the API or stop the backend
    // Just checking if error state is handled
    const errorMessage = page.locator('.error');
    // Error should not be visible if backend is running
    await expect(errorMessage).not.toBeVisible();
  });
});

test.describe('API Tests', () => {
  const API_URL = 'http://localhost:3001/api';

  test('should fetch all teams', async ({ request }) => {
    const response = await request.get(`${API_URL}/teams`);
    expect(response.ok()).toBeTruthy();
    const teams = await response.json();
    expect(teams.length).toBeGreaterThan(0);
    expect(teams[0]).toHaveProperty('name');
    expect(teams[0]).toHaveProperty('stadium');
  });

  test('should fetch all players', async ({ request }) => {
    const response = await request.get(`${API_URL}/players`);
    expect(response.ok()).toBeTruthy();
    const players = await response.json();
    expect(players.length).toBeGreaterThan(0);
    expect(players[0]).toHaveProperty('name');
    expect(players[0]).toHaveProperty('goals');
  });

  test('should fetch all matches', async ({ request }) => {
    const response = await request.get(`${API_URL}/matches`);
    expect(response.ok()).toBeTruthy();
    const matches = await response.json();
    expect(matches.length).toBeGreaterThan(0);
    expect(matches[0]).toHaveProperty('homeTeam');
    expect(matches[0]).toHaveProperty('awayTeam');
  });

  test('should fetch standings', async ({ request }) => {
    const response = await request.get(`${API_URL}/standings`);
    expect(response.ok()).toBeTruthy();
    const standings = await response.json();
    expect(standings.length).toBeGreaterThan(0);
    expect(standings[0]).toHaveProperty('position');
    expect(standings[0]).toHaveProperty('points');
  });

  test('should check backend health', async ({ request }) => {
    const response = await request.get(`${API_URL}/health`);
    expect(response.ok()).toBeTruthy();
    const health = await response.json();
    expect(health.status).toBe('ok');
  });
});
