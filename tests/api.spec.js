import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {
  const API_URL = 'http://localhost:3001/api';

  test('should have backend server running', async ({ request }) => {
    const response = await request.get(`${API_URL}/health`);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  test('GET /api/teams should return teams data', async ({ request }) => {
    const response = await request.get(`${API_URL}/teams`);
    expect(response.ok()).toBeTruthy();
    
    const teams = await response.json();
    expect(Array.isArray(teams)).toBeTruthy();
    expect(teams.length).toBeGreaterThan(0);
    
    // Verify structure of first team
    const firstTeam = teams[0];
    expect(firstTeam).toHaveProperty('id');
    expect(firstTeam).toHaveProperty('name');
    expect(firstTeam).toHaveProperty('stadium');
    expect(firstTeam).toHaveProperty('founded');
    expect(firstTeam).toHaveProperty('league');
    expect(firstTeam).toHaveProperty('country');
  });

  test('GET /api/players should return players data', async ({ request }) => {
    const response = await request.get(`${API_URL}/players`);
    expect(response.ok()).toBeTruthy();
    
    const players = await response.json();
    expect(Array.isArray(players)).toBeTruthy();
    expect(players.length).toBeGreaterThan(0);
    
    // Verify structure
    const firstPlayer = players[0];
    expect(firstPlayer).toHaveProperty('id');
    expect(firstPlayer).toHaveProperty('name');
    expect(firstPlayer).toHaveProperty('position');
    expect(firstPlayer).toHaveProperty('team');
    expect(firstPlayer).toHaveProperty('nationality');
    expect(firstPlayer).toHaveProperty('goals');
    expect(firstPlayer).toHaveProperty('assists');
    expect(firstPlayer).toHaveProperty('appearances');
  });

  test('GET /api/matches should return matches data', async ({ request }) => {
    const response = await request.get(`${API_URL}/matches`);
    expect(response.ok()).toBeTruthy();
    
    const matches = await response.json();
    expect(Array.isArray(matches)).toBeTruthy();
    expect(matches.length).toBeGreaterThan(0);
    
    // Verify structure
    const firstMatch = matches[0];
    expect(firstMatch).toHaveProperty('id');
    expect(firstMatch).toHaveProperty('homeTeam');
    expect(firstMatch).toHaveProperty('awayTeam');
    expect(firstMatch).toHaveProperty('homeScore');
    expect(firstMatch).toHaveProperty('awayScore');
    expect(firstMatch).toHaveProperty('date');
    expect(firstMatch).toHaveProperty('stadium');
    expect(firstMatch).toHaveProperty('status');
  });

  test('GET /api/standings should return standings data', async ({ request }) => {
    const response = await request.get(`${API_URL}/standings`);
    expect(response.ok()).toBeTruthy();
    
    const standings = await response.json();
    expect(Array.isArray(standings)).toBeTruthy();
    expect(standings.length).toBeGreaterThan(0);
    
    // Verify structure
    const firstStanding = standings[0];
    expect(firstStanding).toHaveProperty('position');
    expect(firstStanding).toHaveProperty('team');
    expect(firstStanding).toHaveProperty('played');
    expect(firstStanding).toHaveProperty('won');
    expect(firstStanding).toHaveProperty('drawn');
    expect(firstStanding).toHaveProperty('lost');
    expect(firstStanding).toHaveProperty('points');
  });

  test('GET /api/teams/:id should return a specific team', async ({ request }) => {
    const response = await request.get(`${API_URL}/teams/1`);
    expect(response.ok()).toBeTruthy();
    
    const team = await response.json();
    expect(team.id).toBe(1);
    expect(team.name).toBe('Manchester United');
  });

  test('GET /api/players/:id should return a specific player', async ({ request }) => {
    const response = await request.get(`${API_URL}/players/1`);
    expect(response.ok()).toBeTruthy();
    
    const player = await response.json();
    expect(player.id).toBe(1);
    expect(player).toHaveProperty('name');
  });

  test('GET /api/matches/:id should return a specific match', async ({ request }) => {
    const response = await request.get(`${API_URL}/matches/1`);
    expect(response.ok()).toBeTruthy();
    
    const match = await response.json();
    expect(match.id).toBe(1);
  });

  test('should return 404 for non-existent team', async ({ request }) => {
    const response = await request.get(`${API_URL}/teams/999`);
    expect(response.status()).toBe(404);
  });

  test('should have CORS enabled', async ({ request }) => {
    const response = await request.get(`${API_URL}/health`);
    const headers = response.headers();
    
    // CORS header should be present
    expect(headers['access-control-allow-origin']).toBeDefined();
  });

  test('all endpoints should respond quickly', async ({ request }) => {
    const startTime = Date.now();
    
    await Promise.all([
      request.get(`${API_URL}/teams`),
      request.get(`${API_URL}/players`),
      request.get(`${API_URL}/matches`),
      request.get(`${API_URL}/standings`)
    ]);
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    // All requests should complete in less than 2 seconds
    expect(duration).toBeLessThan(2000);
  });

  test('health endpoint should return correct status', async ({ request }) => {
    const response = await request.get(`${API_URL}/health`);
    const data = await response.json();
    
    expect(data.status).toBe('ok');
    expect(data.message).toContain('Football API is running');
  });
});
