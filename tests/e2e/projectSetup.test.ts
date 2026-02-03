import { expect, Page, test } from "@playwright/test";

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

    test("Can see load error", async ({ page }) => {
        await loadFile(page, "no_example_data.csv");
        await expect(page.getByText(/File load error: No data rows in file/)).toBeVisible();
    });

    test("can set area config", async ({ page }) => {
        await loadFile(page, "multi_country_name.csv");
        // Click Next button
        const nextButton = page.getByText("Next");
        await expect(nextButton).toBeEnabled();
        await nextButton.click();
        // Can see default is single country
        await expect(page.getByLabel(/A single country/)).toBeChecked();
        const multiCountries = await page.getByLabel(/Multiple countries/);
        await expect(multiCountries).not.toBeChecked();
        // Can see country select values (and not controls for multi country)
        const countrySelect = page.getByLabel("Country", { exact: true });
        const countryOptions = countrySelect.getByRole("option");
        await expect(countryOptions.nth(0)).toHaveText("Choose option ...");
        await expect(countryOptions.nth(1)).toHaveText("Aruba");
        const countryColumnSelect = page.getByLabel(/Country column/);
        await expect(countryColumnSelect).not.toBeVisible();
        const countryIdTypeSelect = page.getByLabel(/Countries are identified by/);
        await expect(countryIdTypeSelect).not.toBeVisible();

        // Can switch to multi country and see country and column and country id type controls and options
        await multiCountries.click();
        await expect(countrySelect).not.toBeVisible();
        await expect(countryColumnSelect).toBeVisible();
        const countryColumnOptions = countryColumnSelect.getByRole("option");
        await expect(countryColumnOptions).toHaveCount(5);
        await expect(countryColumnOptions.nth(0)).toHaveText("Choose option ...");
        await expect(countryColumnOptions.nth(1)).toHaveText("Country");
        await expect(countryColumnOptions.nth(4)).toHaveText("Incidence");
        await expect(countryIdTypeSelect).toBeVisible();
        await expect(countryIdTypeSelect).toHaveValue("name");
        const countryIdTypeOptions = countryIdTypeSelect.getByRole("option");
        await expect(countryIdTypeOptions.nth(1)).toHaveText("ISO3");
        await expect(countryIdTypeOptions.nth(2)).toHaveText("Name");

        // Can see Region controls and options
        const adminLevelSelect = page.getByLabel(/Region admin level/);
        await expect(adminLevelSelect).toBeVisible();
        await expect(adminLevelSelect).toHaveValue("admin1");
        const adminLevelOptions = adminLevelSelect.getByRole("option");
        await expect(adminLevelOptions.nth(1)).toHaveText("Admin1");
        await expect(adminLevelOptions.nth(2)).toHaveText("Admin2");
        const regionColumnSelect = page.getByLabel(/Region column/);
        await expect(regionColumnSelect).toBeVisible();
        const regionColumnOptions = regionColumnSelect.getByRole("option");
        await expect(regionColumnOptions.nth(1)).toHaveText("Country");
        await expect(regionColumnOptions.nth(4)).toHaveText("Incidence");
        const regionIdTypeSelect = page.getByLabel(/Regions are identified by/);
        await expect(regionIdTypeSelect).toBeVisible();
        await expect(regionIdTypeSelect).toHaveValue("name");
        const regionIdTypeOptions = regionIdTypeSelect.getByRole("option");
        await expect(regionIdTypeOptions.nth(1)).toHaveText("GADM");
        await expect(regionIdTypeOptions.nth(2)).toHaveText("Name");
    });
});
