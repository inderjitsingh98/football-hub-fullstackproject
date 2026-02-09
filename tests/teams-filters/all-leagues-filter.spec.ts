// spec: specs/teams-filter-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('League Filter Functionality', () => {
  test('Filter by each league and validate team count', async ({ page }) => {
    // 1. Navigate to http://localhost:5174
    await page.goto('http://localhost:5174');
    await page.getByText("34 teams").first().waitFor({ state: 'visible' });

    // 2. Iterate through each of the 12 leagues
    const leagues = [
      { name: 'Brasileirão', teams: 2 },
      { name: 'Bundesliga', teams: 3 },
      { name: 'Eredivisie', teams: 2 },
      { name: 'La Liga', teams: 3 },
      { name: 'Liga MX', teams: 2 },
      { name: 'Ligue 1', teams: 3 },
      { name: 'MLS', teams: 4 },
      { name: 'Premier League', teams: 5 },
      { name: 'Primeira Liga', teams: 2 },
      { name: 'Primera División', teams: 2 },
      { name: 'Saudi Pro League', teams: 3 },
      { name: 'Serie A', teams: 3 }
    ];

    const combobox = page.getByRole('combobox');

    for (const league of leagues) {
      await combobox.selectOption([league.name]);
      
      // Verify the results count shows correct number of teams
      await expect(page.getByText(`${league.teams} team${league.teams > 1 ? 's' : ''}`)).toBeVisible();
      
      // Verify the correct number of team headings are displayed
      const teamHeadings = page.locator('main').getByRole('heading', { level: 3 });
      await expect(teamHeadings).toHaveCount(league.teams);
    }

    // 3. Select 'All Leagues' option
    await combobox.selectOption(['All Leagues']);
    await expect(page.getByText('34 teams')).toBeVisible();
  });
});
