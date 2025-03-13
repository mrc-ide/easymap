import { expect, test, describe } from '@playwright/test';

test.describe("Playwright navigation", () => {
	test.beforeEach(async ({page}) => {
		await page.goto('/');
	});

	test('can see nav menu', async ({ page }) => {
		await expect(page.locator('h1')).toBeVisible();
	});

	test("can navigate to about page and back", () => {

	});
});
