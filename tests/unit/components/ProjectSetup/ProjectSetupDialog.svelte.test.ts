import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/svelte";
import ProjectSetupDialog from '../../../../src/components/ProjectSetup/ProjectSetupDialog.svelte';
import { store } from '../../../../src/store.svelte';

// Workaround jsdom not fully implementing animate and dialogs
Element.prototype.animate ??= vi.fn().mockReturnValue({
	finished: Promise.resolve(),
	cancel: vi.fn(),
	startTime: null,
	currentTime: null,
});
HTMLDialogElement.prototype.show = vi.fn().mockImplementation(function (this: HTMLDialogElement) {
	this.open = true;
});
HTMLDialogElement.prototype.close = vi.fn().mockImplementation(function (this: HTMLDialogElement) {
	this.open = false;
});

const mockDataFile = {
	columns: ["mockCol"]
} as any;

describe("ProjectSetupDialog", () => {
	beforeEach(() => {
		vi.mock("../../../../src/store.svelte.ts", () => {
			return {
				store: {
					dataFile: null,
					errors: {},
					warnings: {},
					openProjectDialog: 0, //ProjectDialog.Setup - can't import type while mocking
					enabledProjectDialogs: new Set([0]),
					countrySettings: {
						countryISO: null
					},
					regionSettings: {
						adminLevel: "Admin1",
						regionIdType: "Name",
						regionIdColumn: null
					}
				}
			};
		});
	});

	const getNextButton = () => {
		return screen.getByRole("button", {name: /Next/});
	}

	test("renders as expected before data file is loaded", () => {
		render(ProjectSetupDialog);
		expect(screen.getByText(/1. Open file/)).toBeVisible();
		expect(getNextButton()).not.toBeEnabled();
		expect(screen.getByText(/2. Set areas/)).toBeVisible();
		expect(screen.getAllByRole("button").length).toBe(3); // don't expect Set areas expand button to be rendered
	});

	test("renders as expected after data file is loaded", () => {
		store.dataFile = mockDataFile;
		render(ProjectSetupDialog);
		expect(getNextButton()).toBeEnabled();
		expect(screen.getByText(/2. Set areas/)).toBeVisible();
		expect(screen.getAllByRole("button").length).toBe(4); // expect Set areas expand button to be rendered
	});

	test("click Next button in 'Open file' opens 'Set areas'", async () => {
		store.dataFile = mockDataFile;
		render(ProjectSetupDialog);
		expect(screen.queryByText(/The file contains areas for/)).toBeNull();
		const nextButton = getNextButton();
		nextButton.click();
		await waitFor(() => {
			expect(screen.getByText(/The file contains areas for/)).toBeVisible();
		});
	});
});