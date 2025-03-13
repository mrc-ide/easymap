import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'tests/e2e',
	outputDir: "test-results",
	fullyParallel: true,
	timeout: process.env.CI ? 30 * 1000 : 15 * 1000,
	/* Maximum time one test can run for. */
	expect: {
		/**
		 * Maximum time expect() should wait for the condition to be met.
		 * For example in `await expect(locator).toHaveText();`
		 */
		timeout: 10000
	},
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Allow parallel tests */
	workers: undefined,
	reporter: "html",
	use: {
		/* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
		actionTimeout: 0,

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on-first-retry",

		headless: true,
		screenshot: "only-on-failure"
	},
	projects: process.env.CI
		? [
			{
				name: "chromium",
				use: {
					...devices["Desktop Chrome"]
				}
			},
			{
				name: "webkit",
				use: {
					...devices["Desktop Safari"]
				}
			}
		]
		: /* Just test on Chrome when running on local dev */
		[
			{
				name: "chromium",
				use: {
					...devices["Desktop Chrome"]
				}
			}
		]
});
