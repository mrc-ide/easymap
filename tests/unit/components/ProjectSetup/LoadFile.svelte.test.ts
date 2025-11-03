import { beforeEach, describe, expect, test, vi } from 'vitest';
import LoadFile from "../../../../src/components/ProjectSetup/LoadFile.svelte";
import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import { getTestFile } from './utils';
import type { DataFile } from '$lib/DataFile';

let { mockStore } = vi.hoisted(() => ({
	mockStore: {}
}));

describe("LoadFile", () => {
	beforeEach(() => {
		vi.mock("../../../../src/store.svelte.ts", () => {
			mockStore = {
				errors: {},
				warnings: {},
				dataFile: null
			};
			return { store: mockStore };
		});
	});

	const getInput = () => {
		return screen.getByLabelText("Select a data file (csv or single sheet Excel file).");
	}

	const uploadTestFile = (input: HTMLInputElement, testFileName: string) => {
		const file = getTestFile(testFileName);
		fireEvent.change(input, {
			target: { files: [file] },
		});
	}

	const expectExampleDataColumns = async () => {
		await waitFor(() => expect(mockStore.dataFile).toBeTruthy());
		const dataFile = mockStore.dataFile as DataFile;
		expect(dataFile.columns).toStrictEqual(["region", "value"]);
	}

	test("displays file input", () => {
		render(LoadFile);
		const input = getInput();
		expect(input).toBeEnabled();
	});

	test("uploads csv file", async () => {
		render(LoadFile);
		const input = getInput();
		uploadTestFile(input, "example_data.csv");
		await expectExampleDataColumns();
	});

	test("uploads xlsx file", async () => {
		render(LoadFile);
		const input = getInput();
		uploadTestFile(input, "example_data.xlsx");
		await expectExampleDataColumns();
	});

  test("uploads xls file", async () => {
		render(LoadFile);
		const input = getInput();
		uploadTestFile(input, "example_data.xls");
		await expectExampleDataColumns();
	});

	test("displays columns from valid data file", async () => {
		render(LoadFile);
		const input = getInput();
		uploadTestFile(input, "example_data.xls");
		await expectExampleDataColumns();
		await waitFor(() => {
			expect(screen.getByText(/Loaded file with columns: region, value/)).toBeVisible();
		});
	});

	test("displays load file warning", async () => {
		render(LoadFile);
		const input = getInput();
		uploadTestFile(input, "multiple_sheets_data.xlsx");
		await waitFor(() => {
			expect(screen.getByText(/File load warning: This file has multiple sheets/))
		});
	});

	test("displays load file error", async () => {
		render(LoadFile);
		const input = getInput();
		uploadTestFile(input, "no_example_data.csv");
		await waitFor(() => {
			expect(screen.getByText(/File load error: No data rows in file/))
		});
	});
});