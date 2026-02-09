// spec: specs/teams-filter-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('League Filter Functionality', () => {
  test('Verify league dropdown contains all options', async ({ page }) => {
    // 1. Navigate to http://localhost:5174
    await page.goto('http://localhost:5174');
    await page.getByText("34 teams").first().waitFor({ state: 'visible' });
    await expect(page.getByRole('button', { name: '🏆 Teams' })).toBeVisible();

    // 2. Click on the league dropdown
    await page.getByRole('combobox').click();

    // Verify 13 options are available (All Leagues + 12 leagues)
    const options = page.getByRole('option');
    await expect(options).toHaveCount(13);
    
    // Verify all league names are present as options
    await expect(page.getByRole('option', { name: 'All Leagues' })).toBeAttached();
    await expect(page.getByRole('option', { name: 'Brasileirão' })).toBeAttached();
    await expect(page.getByRole('option', { name: 'Bundesliga' })).toBeAttached();
    await expect(page.getByRole('option', { name: 'Eredivisie' })).toBeAttached();
    await expect(page.getByRole('option', { name: 'La Liga' })).toBeAttached();
    await expect(page.getByRole('option', { name: 'Liga MX' })).toBeAttached();
    await expect(page.getByRole('option', { name: 'Ligue 1' })).toBeAttached();
    await expect(page.getByRole('option', { name: 'MLS' })).toBeAttached();
    await expect(page.getByRole('option', { name: 'Premier League' })).toBeAttached();
    await expect(page.getByRole('option', { name: 'Primeira Liga' })).toBeAttached();
    await expect(page.getByRole('option', { name: 'Primera División' })).toBeAttached();
    await expect(page.getByRole('option', { name: 'Saudi Pro League' })).toBeAttached();
    await expect(page.getByRole('option', { name: 'Serie A' })).toBeAttached();
  });
});
