// spec: specs/teams-filter-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('League Filter Functionality', () => {
  test('Verify league dropdown contains all options', async ({ page }) => {
    // 1. Navigate to http://localhost:5174
    await page.goto('http://localhost:5174');
    await page.getByText("teams").first().waitFor({ state: 'visible' });
    await expect(page.getByRole('button', { name: '🏆 Teams' })).toBeVisible();

    // 2. Click on the league dropdown
    await page.getByRole('combobox').click();

    // Verify 13 options are visible
    await expect(page.getByText('Brasileirão')).toBeVisible();
    await expect(page.getByText('Bundesliga')).toBeVisible();
    await expect(page.getByText('Eredivisie')).toBeVisible();
    await expect(page.getByText('La Liga')).toBeVisible();
    await expect(page.getByText('Liga MX')).toBeVisible();
    await expect(page.getByText('Ligue 1')).toBeVisible();
    await expect(page.getByText('MLS')).toBeVisible();
    await expect(page.getByText('Premier League')).toBeVisible();
    await expect(page.getByText('Primeira Liga')).toBeVisible();
    await expect(page.getByText('Primera División')).toBeVisible();
    await expect(page.getByText('Saudi Pro League')).toBeVisible();
    await expect(page.getByText('Serie A')).toBeVisible();
  });
});
