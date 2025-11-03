import { expect, Page, test } from '@playwright/test';

const inputFilePath = (fileName: string) => `./tests/testFiles/${fileName}`;

const loadFile = async (page: Page, fileName: string) => {
	const fileInput = page.getByLabel(/Select a data file/);
	await expect(fileInput).toBeEnabled();
	await fileInput.click();
	await fileInput.setInputFiles(inputFilePath(fileName));
};

test.describe("Project setup", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("Can toggle Project Setup dialog", async ({ page }) => {
		const dialog = page.getByRole("dialog");
		await expect(dialog).toBeVisible();
		await expect(dialog).toHaveText(/Set up your EasyMap project/);
		// Click close button
		const closeButton = dialog.getByLabel("Close");
		await expect(closeButton).toBeVisible();
		await closeButton.click();
		await expect(dialog).not.toBeVisible();
		// Click Cog button to open
		const cogButton = page.getByLabel("Set up project");
		await cogButton.click();
		await expect(dialog).toBeVisible();
		// Click Cog button again to close
		await cogButton.click();
		await expect(dialog).not.toBeVisible();
	});

	test("Download button is initially disabled", async ({ page }) => {
		const downloadButton = page.getByLabel("Download data");
		await expect(downloadButton).not.toBeEnabled();
	});

	test("Can load file", async ({ page }) => {
		await loadFile(page, "example_data.csv");
		await expect(page.getByText(/Loaded file with columns: region, value/)).toBeVisible();
	});

	test("Can see load warning", async ({ page }) => {
		await loadFile(page, "multiple_sheets_data.xlsx");
		await expect(page.getByText(/File load warning: This file has multiple sheets/)).toBeVisible();
	});

	test("Can see load error", async ({page }) => {
		await loadFile(page, "no_example_data.csv");
		await expect(page.getByText(/File load error: No data rows in file/)).toBeVisible();
	});
});