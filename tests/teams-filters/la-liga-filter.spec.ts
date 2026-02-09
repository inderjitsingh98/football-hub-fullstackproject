// spec: specs/teams-filter-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('League Filter Functionality', () => {
  test('Filter by La Liga', async ({ page }) => {
    // 1. Navigate to http://localhost:5174
    await page.goto('http://localhost:5174');
    await page.getByText("34 teams").first().waitFor({ state: 'visible' });

    // 2. Select 'La Liga' from league dropdown
    await page.getByRole('combobox').selectOption(['La Liga']);
    await expect(page.getByText('3 teams')).toBeVisible();

    // Verify all 3 La Liga teams are displayed
    await expect(page.getByText('Real Madrid')).toBeVisible();
    await expect(page.getByText('Barcelona')).toBeVisible();
    await expect(page.getByText('Atlético Madrid')).toBeVisible();
  });
});
