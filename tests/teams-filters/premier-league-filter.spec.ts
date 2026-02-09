// spec: specs/teams-filter-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('League Filter Functionality', () => {
  test('Filter by Premier League', async ({ page }) => {
    // 1. Navigate to http://localhost:5174
    await page.goto('http://localhost:5174');
    await page.getByText("34 teams").first().waitFor({ state: 'visible' });

    // 2. Select 'Premier League' from league dropdown
    await page.getByRole('combobox').selectOption(['Premier League']);
    await expect(page.getByText('5 teams')).toBeVisible();

    // Verify all 5 Premier League teams are displayed
    await expect(page.getByText('Manchester City')).toBeVisible();
    await expect(page.getByText('Liverpool')).toBeVisible();
    await expect(page.getByText('Arsenal')).toBeVisible();
    await expect(page.getByText('Manchester United')).toBeVisible();
    await expect(page.getByText('Chelsea')).toBeVisible();
  });
});
