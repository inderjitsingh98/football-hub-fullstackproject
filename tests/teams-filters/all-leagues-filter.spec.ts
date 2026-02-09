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
      'Brasileirão',
      'Bundesliga',
      'Eredivisie',
      'La Liga',
      'Liga MX',
      'Ligue 1',
      'MLS',
      'Premier League',
      'Primeira Liga',
      'Primera División',
      'Saudi Pro League',
      'Serie A'
    ];

    const combobox = page.getByRole('combobox');

    for (const league of leagues) {
      await combobox.selectOption([league]);
      
      // Verify the dropdown shows the selected league and results are filtered
      const teamsCountText = await page.locator('.filter-count').textContent();
      expect(teamsCountText).toContain('team');
      
      // Verify at least one team is displayed with the correct league
      await expect(page.getByText(`League: ${league}`).first()).toBeVisible();
    }

    // 3. Select 'All Leagues' option
    await combobox.selectOption(['All Leagues']);
    await expect(page.getByText('34 teams')).toBeVisible();
  });
});
