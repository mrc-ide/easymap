import { expect, test, Page } from "@playwright/test";

const expectToSeeMap = async (page: Page) => {
	// Just a really basic test that Leaflet has been populated with the base layer
	const map = await page.locator("#map");
	await expect(await map.locator(".leaflet-tile-pane .leaflet-layer .leaflet-tile-container"))
		.toHaveCount(1);
};

test.describe("Playwright navigation", () => {
	test.beforeEach(async ({page}) => {
		await page.goto("/");
	});

	test("can see nav menu", async ({ page }) => {
		await expect(page.getByRole("link", {name: "EasyMap"})).toBeVisible();
		const home = page.getByRole("link", {name: "Home"});
		await expect(home).toBeVisible();
		const about = page.getByRole("link", {name: "About"});
		await expect(about).toBeVisible();
	});

	test("can see map", async ({ page }) => {
		await expectToSeeMap(page);
	});

	test("can navigate to about page and back", async ({page}) => {
		const about = page.getByRole("link", {name: "About"});
		const home = await page.getByRole("link", {name: "Home"});

		await about.click();
		await expect(await page.locator("p")).toHaveText("Placeholder About page for EasyMap");
		await home.click();
		await expectToSeeMap(page);
	});
});
